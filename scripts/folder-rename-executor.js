const fs = require('fs');
const path = require('path');

/**
 * Folder Rename Executor
 * Handles atomic folder rename operations with error handling, batch processing, and progress tracking
 */
class FolderRenameExecutor {
  constructor(options = {}) {
    this.dryRun = options.dryRun || false;
    this.verbose = options.verbose || false;
    this.batchSize = options.batchSize || 5;
    this.operations = [];
    this.completedOperations = [];
    this.failedOperations = [];
    this.progressCallback = options.progressCallback || null;
  }

  /**
   * Style mappings for consistent naming
   */
  static STYLE_MAPPINGS = {
    '1-Light': 'Light',
    '2-Regular': 'Regular',
    '3-Filled': 'Filled',
    '4-Duotone': 'Duotone',
    '5-Duotone Line': 'Duotone Line',
  };

  /**
   * Log messages with optional verbose mode
   */
  log(message, level = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

    if (level === 'error' || this.verbose) {
      console.log(`${prefix} ${message}`);
    }
  }

  /**
   * Report progress to callback if provided
   */
  reportProgress(current, total, operation = null) {
    const progress = {
      current,
      total,
      percentage: Math.round((current / total) * 100),
      operation,
      completed: this.completedOperations.length,
      failed: this.failedOperations.length,
    };

    this.log(
      `Progress: ${progress.percentage}% (${current}/${total}) - ${operation?.description || 'Processing'}`,
      'info'
    );

    if (this.progressCallback) {
      this.progressCallback(progress);
    }
  }

  /**
   * Validate that a rename operation can be performed safely
   */
  validateRenameOperation(operation) {
    const errors = [];

    // Check if source exists
    if (!fs.existsSync(operation.sourcePath)) {
      errors.push(`Source path does not exist: ${operation.sourcePath}`);
    }

    // Check if target already exists
    if (fs.existsSync(operation.targetPath)) {
      errors.push(`Target path already exists: ${operation.targetPath}`);
    }

    // Check if source is a directory
    if (fs.existsSync(operation.sourcePath)) {
      const stats = fs.statSync(operation.sourcePath);
      if (!stats.isDirectory()) {
        errors.push(`Source is not a directory: ${operation.sourcePath}`);
      }
    }

    // Check write permissions on parent directory
    const parentDir = path.dirname(operation.targetPath);
    try {
      fs.accessSync(parentDir, fs.constants.W_OK);
    } catch (err) {
      errors.push(`No write permission for parent directory: ${parentDir}`);
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Execute a single atomic rename operation
   */
  async executeAtomicRename(operation) {
    this.log(
      `Executing rename: ${operation.sourcePath} -> ${operation.targetPath}`,
      'info'
    );

    if (this.dryRun) {
      this.log(
        `[DRY RUN] Would rename: ${operation.sourcePath} -> ${operation.targetPath}`,
        'info'
      );
      return { success: true, dryRun: true };
    }

    try {
      // Validate before executing
      const validation = this.validateRenameOperation(operation);
      if (!validation.valid) {
        throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
      }

      // Perform atomic rename
      fs.renameSync(operation.sourcePath, operation.targetPath);

      // Verify the operation succeeded
      if (!fs.existsSync(operation.targetPath)) {
        throw new Error(
          'Rename operation completed but target path does not exist'
        );
      }

      this.log(
        `Successfully renamed: ${operation.sourcePath} -> ${operation.targetPath}`,
        'info'
      );
      return { success: true };
    } catch (error) {
      this.log(
        `Failed to rename ${operation.sourcePath}: ${error.message}`,
        'error'
      );
      return {
        success: false,
        error: error.message,
        operation,
      };
    }
  }

  /**
   * Add a rename operation to the queue
   */
  addRenameOperation(sourcePath, targetPath, metadata = {}) {
    const operation = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      sourcePath: path.resolve(sourcePath),
      targetPath: path.resolve(targetPath),
      description: `Rename ${path.basename(sourcePath)} to ${path.basename(targetPath)}`,
      metadata,
      timestamp: new Date().toISOString(),
    };

    this.operations.push(operation);
    this.log(`Added rename operation: ${operation.description}`, 'info');
    return operation.id;
  }

  /**
   * Process operations in batches with error handling
   */
  async processBatch(batch) {
    const batchResults = [];

    this.log(`Processing batch of ${batch.length} operations`, 'info');

    for (const operation of batch) {
      try {
        const result = await this.executeAtomicRename(operation);

        if (result.success) {
          this.completedOperations.push({
            ...operation,
            result,
            completedAt: new Date().toISOString(),
          });
        } else {
          this.failedOperations.push({
            ...operation,
            result,
            failedAt: new Date().toISOString(),
          });
        }

        batchResults.push({ operation, result });
      } catch (error) {
        const result = {
          success: false,
          error: error.message,
        };

        this.failedOperations.push({
          ...operation,
          result,
          failedAt: new Date().toISOString(),
        });

        batchResults.push({ operation, result });
        this.log(
          `Unexpected error processing operation ${operation.id}: ${error.message}`,
          'error'
        );
      }
    }

    return batchResults;
  }

  /**
   * Execute all queued rename operations in batches
   */
  async executeAllOperations() {
    if (this.operations.length === 0) {
      this.log('No operations to execute', 'info');
      return {
        success: true,
        totalOperations: 0,
        completed: 0,
        failed: 0,
      };
    }

    this.log(
      `Starting execution of ${this.operations.length} rename operations`,
      'info'
    );
    this.log(`Batch size: ${this.batchSize}, Dry run: ${this.dryRun}`, 'info');

    const totalOperations = this.operations.length;
    let processedCount = 0;

    // Process operations in batches
    for (let i = 0; i < this.operations.length; i += this.batchSize) {
      const batch = this.operations.slice(i, i + this.batchSize);

      this.reportProgress(processedCount, totalOperations, {
        description: `Processing batch ${Math.floor(i / this.batchSize) + 1}`,
      });

      await this.processBatch(batch);
      processedCount += batch.length;

      // Small delay between batches to prevent overwhelming the filesystem
      if (i + this.batchSize < this.operations.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    this.reportProgress(totalOperations, totalOperations, {
      description: 'All operations completed',
    });

    const summary = {
      success: this.failedOperations.length === 0,
      totalOperations,
      completed: this.completedOperations.length,
      failed: this.failedOperations.length,
      completedOperations: this.completedOperations,
      failedOperations: this.failedOperations,
    };

    this.log(
      `Execution summary: ${summary.completed} completed, ${summary.failed} failed`,
      'info'
    );

    if (summary.failed > 0) {
      this.log('Failed operations:', 'error');
      this.failedOperations.forEach(op => {
        this.log(`  - ${op.description}: ${op.result.error}`, 'error');
      });
    }

    return summary;
  }

  /**
   * Generate rename operations for a category directory
   */
  generateCategoryRenameOperations(categoryPath, baseDir = 'assets/svg') {
    const fullCategoryPath = path.resolve(baseDir, categoryPath);

    if (!fs.existsSync(fullCategoryPath)) {
      this.log(`Category path does not exist: ${fullCategoryPath}`, 'error');
      return [];
    }

    const operations = [];

    try {
      const entries = fs.readdirSync(fullCategoryPath, { withFileTypes: true });

      for (const entry of entries) {
        if (entry.isDirectory()) {
          const currentName = entry.name;
          const targetName = FolderRenameExecutor.STYLE_MAPPINGS[currentName];

          if (targetName && targetName !== currentName) {
            const sourcePath = path.join(fullCategoryPath, currentName);
            const targetPath = path.join(fullCategoryPath, targetName);

            const operationId = this.addRenameOperation(
              sourcePath,
              targetPath,
              {
                category: categoryPath,
                styleType: targetName,
                baseDir,
              }
            );

            operations.push(operationId);
          }
        }
      }
    } catch (error) {
      this.log(
        `Error reading category directory ${fullCategoryPath}: ${error.message}`,
        'error'
      );
    }

    return operations;
  }

  /**
   * Clear all operations and reset state
   */
  reset() {
    this.operations = [];
    this.completedOperations = [];
    this.failedOperations = [];
    this.log('Reset executor state', 'info');
  }

  /**
   * Get current execution statistics
   */
  getStats() {
    return {
      queued: this.operations.length,
      completed: this.completedOperations.length,
      failed: this.failedOperations.length,
      total:
        this.operations.length +
        this.completedOperations.length +
        this.failedOperations.length,
    };
  }
}

module.exports = FolderRenameExecutor;
