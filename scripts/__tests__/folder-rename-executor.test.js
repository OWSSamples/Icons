const fs = require('fs');
const path = require('path');
const os = require('os');
const FolderRenameExecutor = require('../folder-rename-executor');

describe('FolderRenameExecutor', () => {
  let tempDir;
  let executor;

  beforeEach(() => {
    // Create a temporary directory for testing
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'folder-rename-test-'));
    executor = new FolderRenameExecutor({ verbose: false });
  });

  afterEach(() => {
    // Clean up temporary directory
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  describe('Constructor and Configuration', () => {
    test('should initialize with default options', () => {
      const defaultExecutor = new FolderRenameExecutor();
      expect(defaultExecutor.dryRun).toBe(false);
      expect(defaultExecutor.verbose).toBe(false);
      expect(defaultExecutor.batchSize).toBe(5);
    });

    test('should initialize with custom options', () => {
      const customExecutor = new FolderRenameExecutor({
        dryRun: true,
        verbose: true,
        batchSize: 10,
      });
      expect(customExecutor.dryRun).toBe(true);
      expect(customExecutor.verbose).toBe(true);
      expect(customExecutor.batchSize).toBe(10);
    });

    test('should have correct style mappings', () => {
      expect(FolderRenameExecutor.STYLE_MAPPINGS).toEqual({
        '1-Light': 'Light',
        '2-Regular': 'Regular',
        '3-Filled': 'Filled',
        '4-Duotone': 'Duotone',
        '5-Duotone Line': 'Duotone Line',
      });
    });
  });

  describe('Operation Management', () => {
    test('should add rename operations correctly', () => {
      const sourcePath = path.join(tempDir, 'source');
      const targetPath = path.join(tempDir, 'target');

      const operationId = executor.addRenameOperation(sourcePath, targetPath, {
        test: true,
      });

      expect(operationId).toBeDefined();
      expect(executor.operations).toHaveLength(1);
      expect(executor.operations[0].sourcePath).toBe(path.resolve(sourcePath));
      expect(executor.operations[0].targetPath).toBe(path.resolve(targetPath));
      expect(executor.operations[0].metadata.test).toBe(true);
    });

    test('should reset state correctly', () => {
      executor.addRenameOperation('source', 'target');
      executor.completedOperations.push({ test: true });
      executor.failedOperations.push({ test: true });

      executor.reset();

      expect(executor.operations).toHaveLength(0);
      expect(executor.completedOperations).toHaveLength(0);
      expect(executor.failedOperations).toHaveLength(0);
    });

    test('should provide correct statistics', () => {
      executor.addRenameOperation('source1', 'target1');
      executor.addRenameOperation('source2', 'target2');
      executor.completedOperations.push({ test: true });
      executor.failedOperations.push({ test: true });

      const stats = executor.getStats();

      expect(stats.queued).toBe(2);
      expect(stats.completed).toBe(1);
      expect(stats.failed).toBe(1);
      expect(stats.total).toBe(4);
    });
  });

  describe('Validation', () => {
    test('should validate successful rename operation', () => {
      // Create source directory
      const sourceDir = path.join(tempDir, 'source');
      fs.mkdirSync(sourceDir);

      const operation = {
        sourcePath: sourceDir,
        targetPath: path.join(tempDir, 'target'),
      };

      const validation = executor.validateRenameOperation(operation);

      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    test('should detect missing source directory', () => {
      const operation = {
        sourcePath: path.join(tempDir, 'nonexistent'),
        targetPath: path.join(tempDir, 'target'),
      };

      const validation = executor.validateRenameOperation(operation);

      expect(validation.valid).toBe(false);
      expect(validation.errors).toContain(
        'Source path does not exist: ' + operation.sourcePath
      );
    });

    test('should detect existing target directory', () => {
      // Create both source and target directories
      const sourceDir = path.join(tempDir, 'source');
      const targetDir = path.join(tempDir, 'target');
      fs.mkdirSync(sourceDir);
      fs.mkdirSync(targetDir);

      const operation = {
        sourcePath: sourceDir,
        targetPath: targetDir,
      };

      const validation = executor.validateRenameOperation(operation);

      expect(validation.valid).toBe(false);
      expect(validation.errors).toContain(
        'Target path already exists: ' + operation.targetPath
      );
    });

    test('should detect non-directory source', () => {
      // Create a file instead of directory
      const sourceFile = path.join(tempDir, 'source.txt');
      fs.writeFileSync(sourceFile, 'test');

      const operation = {
        sourcePath: sourceFile,
        targetPath: path.join(tempDir, 'target'),
      };

      const validation = executor.validateRenameOperation(operation);

      expect(validation.valid).toBe(false);
      expect(validation.errors).toContain(
        'Source is not a directory: ' + operation.sourcePath
      );
    });
  });

  describe('Atomic Rename Operations', () => {
    test('should execute successful rename in live mode', async () => {
      // Create source directory with a test file
      const sourceDir = path.join(tempDir, '1-Light');
      const targetDir = path.join(tempDir, 'Light');
      fs.mkdirSync(sourceDir);
      fs.writeFileSync(path.join(sourceDir, 'test.txt'), 'test content');

      const operation = {
        sourcePath: sourceDir,
        targetPath: targetDir,
        description: 'Test rename',
      };

      const result = await executor.executeAtomicRename(operation);

      expect(result.success).toBe(true);
      expect(fs.existsSync(targetDir)).toBe(true);
      expect(fs.existsSync(sourceDir)).toBe(false);
      expect(fs.readFileSync(path.join(targetDir, 'test.txt'), 'utf8')).toBe(
        'test content'
      );
    });

    test('should simulate rename in dry run mode', async () => {
      const dryRunExecutor = new FolderRenameExecutor({ dryRun: true });

      // Create source directory
      const sourceDir = path.join(tempDir, '1-Light');
      fs.mkdirSync(sourceDir);

      const operation = {
        sourcePath: sourceDir,
        targetPath: path.join(tempDir, 'Light'),
        description: 'Test dry run',
      };

      const result = await dryRunExecutor.executeAtomicRename(operation);

      expect(result.success).toBe(true);
      expect(result.dryRun).toBe(true);
      expect(fs.existsSync(sourceDir)).toBe(true); // Source should still exist
    });

    test('should handle rename failure gracefully', async () => {
      const operation = {
        sourcePath: path.join(tempDir, 'nonexistent'),
        targetPath: path.join(tempDir, 'target'),
        description: 'Test failure',
      };

      const result = await executor.executeAtomicRename(operation);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Validation failed');
    });
  });

  describe('Category Operations', () => {
    test('should generate rename operations for category with numbered folders', () => {
      // Create a mock category structure
      const categoryDir = path.join(tempDir, 'TestCategory');
      fs.mkdirSync(categoryDir);

      // Create numbered style folders
      const styleFolders = ['1-Light', '2-Regular', '3-Filled'];
      styleFolders.forEach(folder => {
        fs.mkdirSync(path.join(categoryDir, folder));
      });

      // Also create a clean folder that shouldn't be renamed
      fs.mkdirSync(path.join(categoryDir, 'Duotone'));

      const operations = executor.generateCategoryRenameOperations(
        'TestCategory',
        tempDir
      );

      expect(operations).toHaveLength(3); // Only numbered folders should be queued
      expect(executor.operations).toHaveLength(3);

      // Check that operations target correct mappings
      const operationTargets = executor.operations.map(op =>
        path.basename(op.targetPath)
      );
      expect(operationTargets).toContain('Light');
      expect(operationTargets).toContain('Regular');
      expect(operationTargets).toContain('Filled');
      expect(operationTargets).not.toContain('Duotone'); // Already clean
    });

    test('should handle category with no numbered folders', () => {
      // Create a category with only clean folder names
      const categoryDir = path.join(tempDir, 'CleanCategory');
      fs.mkdirSync(categoryDir);

      const cleanFolders = ['Light', 'Regular', 'Filled', 'Duotone'];
      cleanFolders.forEach(folder => {
        fs.mkdirSync(path.join(categoryDir, folder));
      });

      const operations = executor.generateCategoryRenameOperations(
        'CleanCategory',
        tempDir
      );

      expect(operations).toHaveLength(0);
      expect(executor.operations).toHaveLength(0);
    });

    test('should handle nonexistent category gracefully', () => {
      const operations = executor.generateCategoryRenameOperations(
        'NonexistentCategory',
        tempDir
      );

      expect(operations).toHaveLength(0);
      expect(executor.operations).toHaveLength(0);
    });
  });

  describe('Batch Processing', () => {
    test('should process operations in batches', async () => {
      // Create multiple source directories
      const operations = [];
      for (let i = 1; i <= 3; i++) {
        const sourceDir = path.join(tempDir, `${i}-Test`);
        fs.mkdirSync(sourceDir);

        executor.addRenameOperation(sourceDir, path.join(tempDir, `Test${i}`));
      }

      const result = await executor.executeAllOperations();

      expect(result.success).toBe(true);
      expect(result.completed).toBe(3);
      expect(result.failed).toBe(0);
      expect(executor.completedOperations).toHaveLength(3);
    });

    test('should handle mixed success and failure in batch', async () => {
      // Create one valid operation
      const validSource = path.join(tempDir, '1-Valid');
      fs.mkdirSync(validSource);
      executor.addRenameOperation(validSource, path.join(tempDir, 'Valid'));

      // Create one invalid operation (source doesn't exist)
      executor.addRenameOperation(
        path.join(tempDir, 'nonexistent'),
        path.join(tempDir, 'target')
      );

      const result = await executor.executeAllOperations();

      expect(result.success).toBe(false);
      expect(result.completed).toBe(1);
      expect(result.failed).toBe(1);
      expect(executor.completedOperations).toHaveLength(1);
      expect(executor.failedOperations).toHaveLength(1);
    });
  });

  describe('Progress Tracking', () => {
    test('should call progress callback during execution', async () => {
      const progressUpdates = [];
      const progressExecutor = new FolderRenameExecutor({
        progressCallback: progress => progressUpdates.push(progress),
      });

      // Create test operations
      for (let i = 1; i <= 2; i++) {
        const sourceDir = path.join(tempDir, `${i}-Test`);
        fs.mkdirSync(sourceDir);
        progressExecutor.addRenameOperation(
          sourceDir,
          path.join(tempDir, `Test${i}`)
        );
      }

      await progressExecutor.executeAllOperations();

      expect(progressUpdates.length).toBeGreaterThan(0);
      expect(progressUpdates[progressUpdates.length - 1].percentage).toBe(100);
    });
  });
});
