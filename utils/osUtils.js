import { platform } from 'os';

/**
 * Detects the current operating system
 * @returns {string} The detected operating system ('windows', 'macos', or 'linux')
 */
export function detectOS() {
    const os = platform().toLowerCase();
    
    if (os.includes('win')) {
        return 'windows';
    } else if (os.includes('darwin')) {
        return 'macos';
    } else if (os.includes('linux')) {
        return 'linux';
    } else {
        throw new Error('Unsupported operating system');
    }
}
