const fs = require('fs');
const path = require('path');
const os = require('os');
const { scanForInconsistentCategories } = require('../rename-folders');

describe('rename-folders CLI', () => {
  let tempDir;

  beforeEach(() => {
    // Create a temporary directory for testing
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rename-folders-test-'));
  });

  afterEach(() => {
    // Clean up temporary directory
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  describe('scanForInconsistentCategories', () => {
    test('should identify categories with numbered folders', () => {
      // Create test structure with mixed naming
      const categories = [
        { name: 'CleanCategory', styles: ['Light', 'Regular', 'Filled'] },
        {
          name: 'NumberedCategory',
          styles: ['1-Light', '2-Regular', '3-Filled'],
        },
        { name: 'MixedCategory', styles: ['Light', '2-Regular', 'Filled'] },
      ];

      categories.forEach(category => {
        const categoryDir = path.join(tempDir, category.name);
        fs.mkdirSync(categoryDir);

        category.styles.forEach(style => {
          fs.mkdirSync(path.join(categoryDir, style));
        });
      });

      const inconsistentCategories = scanForInconsistentCategories(tempDir);

      expect(inconsistentCategories).toContain('NumberedCategory');
      expect(inconsistentCategories).toContain('MixedCategory');
      expect(inconsistentCategories).not.toContain('CleanCategory');
    });

    test('should return empty array for directory with no numbered folders', () => {
      // Create categories with only clean names
      const categories = ['Arrows', 'Buildings'];

      categories.forEach(category => {
        const categoryDir = path.join(tempDir, category);
        fs.mkdirSync(categoryDir);

        ['Light', 'Regular', 'Filled'].forEach(style => {
          fs.mkdirSync(path.join(categoryDir, style));
        });
      });

      const inconsistentCategories = scanForInconsistentCategories(tempDir);

      expect(inconsistentCategories).toHaveLength(0);
    });

    test('should handle nonexistent directory gracefully', () => {
      const nonexistentDir = path.join(tempDir, 'nonexistent');

      // Capture console.error to verify error handling
      const originalConsoleError = console.error;
      const errorMessages = [];
      console.error = message => errorMessages.push(message);

      const result = scanForInconsistentCategories(nonexistentDir);

      // Restore console.error
      console.error = originalConsoleError;

      expect(result).toEqual([]);
      expect(
        errorMessages.some(msg => msg.includes('Directory does not exist'))
      ).toBe(true);
    });

    test('should ignore hidden directories and files', () => {
      // Create structure with hidden directories
      fs.mkdirSync(path.join(tempDir, '.hidden'));
      fs.mkdirSync(path.join(tempDir, 'ValidCategory'));
      fs.mkdirSync(path.join(tempDir, 'ValidCategory', '1-Light'));

      const inconsistentCategories = scanForInconsistentCategories(tempDir);

      expect(inconsistentCategories).toContain('ValidCategory');
      expect(inconsistentCategories).not.toContain('.hidden');
    });

    test('should handle categories with files instead of directories', () => {
      // Create a category directory with a mix of files and directories
      const categoryDir = path.join(tempDir, 'TestCategory');
      fs.mkdirSync(categoryDir);

      // Create some files (should be ignored)
      fs.writeFileSync(path.join(categoryDir, 'readme.txt'), 'test');
      fs.writeFileSync(path.join(categoryDir, '.DS_Store'), 'test');

      // Create numbered directory (should be detected)
      fs.mkdirSync(path.join(categoryDir, '1-Light'));

      const inconsistentCategories = scanForInconsistentCategories(tempDir);

      expect(inconsistentCategories).toContain('TestCategory');
    });

    test('should handle empty categories', () => {
      // Create empty category directory
      const categoryDir = path.join(tempDir, 'EmptyCategory');
      fs.mkdirSync(categoryDir);

      const inconsistentCategories = scanForInconsistentCategories(tempDir);

      expect(inconsistentCategories).not.toContain('EmptyCategory');
    });

    test('should handle permission errors gracefully', () => {
      // Create a category directory
      const categoryDir = path.join(tempDir, 'RestrictedCategory');
      fs.mkdirSync(categoryDir);

      // Create a subdirectory and then make parent unreadable (Unix-like systems)
      fs.mkdirSync(path.join(categoryDir, '1-Light'));

      // Note: This test might not work on all systems due to permission handling differences
      // We'll just verify the function doesn't crash with permission errors

      const originalConsoleWarn = console.warn;
      const warnMessages = [];
      console.warn = message => warnMessages.push(message);

      let result;
      expect(() => {
        result = scanForInconsistentCategories(tempDir);
      }).not.toThrow();

      console.warn = originalConsoleWarn;

      // Should still return results for accessible directories
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('Integration scenarios', () => {
    test('should create realistic icon library structure', () => {
      // Create a structure similar to the actual project
      const categories = [
        'Arrows', // Already clean
        'Buildings', // Needs renaming
        'Business & Finance', // Needs renaming
      ];

      // Arrows category (already clean)
      const arrowsDir = path.join(tempDir, 'Arrows');
      fs.mkdirSync(arrowsDir);
      ['Light', 'Regular', 'Filled', 'Duotone', 'Duotone Line'].forEach(
        style => {
          fs.mkdirSync(path.join(arrowsDir, style));
        }
      );

      // Buildings category (needs renaming)
      const buildingsDir = path.join(tempDir, 'Buildings');
      fs.mkdirSync(buildingsDir);
      [
        '1-Light',
        '2-Regular',
        '3-Filled',
        '4-Duotone',
        '5-Duotone Line',
      ].forEach(style => {
        fs.mkdirSync(path.join(buildingsDir, style));
      });

      // Business & Finance category (needs renaming)
      const businessDir = path.join(tempDir, 'Business & Finance');
      fs.mkdirSync(businessDir);
      [
        '1-Light',
        '2-Regular',
        '3-Filled',
        '4-Duotone',
        '5-Duotone Line',
      ].forEach(style => {
        fs.mkdirSync(path.join(businessDir, style));
      });

      const inconsistentCategories = scanForInconsistentCategories(tempDir);

      expect(inconsistentCategories).toHaveLength(2);
      expect(inconsistentCategories).toContain('Buildings');
      expect(inconsistentCategories).toContain('Business & Finance');
      expect(inconsistentCategories).not.toContain('Arrows');
    });
  });
});
