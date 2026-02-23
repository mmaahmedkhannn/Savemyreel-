const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const watchDir = path.resolve(__dirname, '..');
let debounceTimer;
const DEBOUNCE_DELAY = 5000; // 5 seconds wait after last save

console.log('==============================================');
console.log('🔄 GitHub Auto-Sync is ACTIVE');
console.log('Any changes you save will be pushed automatically.');
console.log('==============================================\n');

fs.watch(watchDir, { recursive: true }, (eventType, filename) => {
    if (
        !filename ||
        filename.includes('.git') ||
        filename.includes('node_modules') ||
        filename.includes('.next') ||
        filename.includes('push_error.log')
    ) {
        return;
    }

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        try {
            const status = execSync('git status --porcelain', { encoding: 'utf-8' });
            if (!status.trim()) return;

            console.log(`[${new Date().toLocaleTimeString()}] Syncing: ${filename}...`);
            execSync('git add .');
            execSync('git commit -m "Auto-update from local IDE"');
            execSync('git push');
            console.log('✅ Push successful!\n');
        } catch (error) {
            if (error.stdout && !error.stdout.toString().includes('nothing to commit')) {
                console.log('⚠️ Error during sync:', error.stdout.toString());
            }
        }
    }, DEBOUNCE_DELAY);
});
