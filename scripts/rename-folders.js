#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const FolderRenameExecutor = require('./folder-rename-executor');

/**
 * CLI script for executing folder rename operations
 * Usage: node scripts/rename-folders.js [options]
 */

function printUsage() {
  console.log(`
Usage: node scripts/rename-folders.js [options]

Options:
  --dry-run          Show what would be renamed without making changes
  --verbose          Show detailed logging
  --batch-size=N     Process N operations per batch (default: 5)
  --category=NAME    Only process specific category
  --assets-only      Only process assets/svg directory
  --src-only         Only process src/icons directory
  --help             Show this help message

Examples:
  node scripts/rename-folders.js --dry-run
  node scripts/rename-folders.js --category="Buildings" --verbose
  node scripts/rename-folders.js --assets-only --batch-size=10
  `);
}

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    dryRun: false,
    verbose: false,
    batchSize: 5,
    category: null,
    assetsOnly: false,
    srcOnly: false,
    help: false,
  };

  for (const arg of args) {
    if (arg === '--dry-run') {
      options.dryRun = true;
    } else if (arg === '--verbose') {
      options.verbose = true;
    } else if (arg.startsWith('--batch-size=')) {
      options.batchSize = parseInt(arg.split('=')[1]) || 5;
    } else if (arg.startsWith('--category=')) {
      options.category = arg.split('=')[1];
    } else if (arg === '--assets-only') {
      options.assetsOnly = true;
    } else if (arg === '--src-only') {
      options.srcOnly = true;
    } else if (arg === '--help') {
      options.help = true;
    } else {
      console.error(`Unknown option: ${arg}`);
      process.exit(1);
    }
  }

  return options;
}

/**
 * Scan directory for categories that need renaming
 */
function scanForInconsistentCategories(baseDir) {
  const categoriesPath = path.resolve(baseDir);

  if (!fs.existsSync(categoriesPath)) {
    console.error(`Directory does not exist: ${categoriesPath}`);
    return [];
  }

  const inconsistentCategories = [];

  try {
    const entries = fs.readdirSync(categoriesPath, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory() && !entry.name.startsWith('.')) {
        const categoryPath = path.join(categoriesPath, entry.name);

        // Check if this category has numbered style folders
        try {
          const styleEntries = fs.readdirSync(categoryPath, {
            withFileTypes: true,
          });
          const hasNumberedFolders = styleEntries.some(
            styleEntry =>
              styleEntry.isDirectory() && /^\d+-/.test(styleEntry.name)
          );

          if (hasNumberedFolders) {
            inconsistentCategories.push(entry.name);
          }
        } catch (err) {
          console.warn(`Could not read category directory: ${categoryPath}`);
        }
      }
    }
  } catch (error) {
    console.error(
      `Error scanning directory ${categoriesPath}: ${error.message}`
    );
  }

  return inconsistentCategories;
}

/**
 * Main execution function
 */
async function main() {
  const options = parseArgs();

  if (options.help) {
    printUsage();
    return;
  }

  console.log('🔄 Folder Rename Executor');
  console.log('========================');

  if (options.dryRun) {
    console.log('🔍 DRY RUN MODE - No actual changes will be made');
  }

  // Create executor instance
  const executor = new FolderRenameExecutor({
    dryRun: options.dryRun,
    verbose: options.verbose,
    batchSize: options.batchSize,
    progressCallback: progress => {
      if (!options.verbose) {
        process.stdout.write(
          `\r⏳ ${progress.percentage}% (${progress.current}/${progress.total})`
        );
      }
    },
  });

  // Determine which directories to process
  const directoriesToProcess = [];

  if (!options.srcOnly) {
    directoriesToProcess.push('assets/svg');
  }

  if (!options.assetsOnly) {
    directoriesToProcess.push('src/icons');
  }

  let totalOperationsAdded = 0;

  // Process each directory
  for (const baseDir of directoriesToProcess) {
    console.log(`\n📁 Scanning ${baseDir} directory...`);

    let categoriesToProcess;

    if (options.category) {
      // Process specific category
      categoriesToProcess = [options.category];
      console.log(`   Targeting specific category: ${options.category}`);
    } else {
      // Scan for all inconsistent categories
      categoriesToProcess = scanForInconsistentCategories(baseDir);
      console.log(
        `   Found ${categoriesToProcess.length} categories with numbered folders`
      );
    }

    // Generate rename operations for each category
    for (const category of categoriesToProcess) {
      const operations = executor.generateCategoryRenameOperations(
        category,
        baseDir
      );
      totalOperationsAdded += operations.length;

      if (options.verbose) {
        console.log(`   ${category}: ${operations.length} operations`);
      }
    }
  }

  console.log(`\n📊 Total operations queued: ${totalOperationsAdded}`);

  if (totalOperationsAdded === 0) {
    console.log(
      '✅ No folders need renaming - all folders already have clean names!'
    );
    return;
  }

  // Show summary before execution
  const stats = executor.getStats();
  console.log(`\n🎯 Execution Plan:`);
  console.log(`   Operations: ${stats.queued}`);
  console.log(`   Batch size: ${options.batchSize}`);
  console.log(`   Mode: ${options.dryRun ? 'DRY RUN' : 'LIVE'}`);

  // Execute all operations
  console.log('\n🚀 Starting execution...');
  const result = await executor.executeAllOperations();

  // Print final results
  console.log('\n📋 Execution Results:');
  console.log(`   ✅ Completed: ${result.completed}`);
  console.log(`   ❌ Failed: ${result.failed}`);
  console.log(
    `   📊 Success rate: ${Math.round((result.completed / result.totalOperations) * 100)}%`
  );

  if (result.failed > 0) {
    console.log('\n❌ Failed Operations:');
    result.failedOperations.forEach(op => {
      console.log(`   - ${op.description}: ${op.result.error}`);
    });
    process.exit(1);
  } else {
    console.log('\n🎉 All operations completed successfully!');

    if (!options.dryRun) {
      console.log('\n💡 Next steps:');
      console.log('   1. Run the build process to verify everything works');
      console.log('   2. Run tests to ensure no functionality is broken');
      console.log('   3. Commit the changes to version control');
    }
  }
}

// Handle errors gracefully
process.on('uncaughtException', error => {
  console.error('\n💥 Uncaught Exception:', error.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('\n💥 Unhandled Rejection:', reason);
  process.exit(1);
});

// Run the main function
if (require.main === module) {
  main().catch(error => {
    console.error('\n💥 Error:', error.message);
    process.exit(1);
  });
}

module.exports = { main, scanForInconsistentCategories };
