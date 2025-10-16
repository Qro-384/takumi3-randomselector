export function formatLevel(level) {
    if (typeof level == 'string' && level.includes('Chart Lab')) {
        const charCount_cl = 10
        return 'CL ' + level.substring(charCount_cl, level.length).trim();
    } else if (typeof level == 'number') {
        if (level >= 13) {
            return level.toFixed(1);
        } else {
            return level.toFixed(0);
        }
    } else {
        return "Error";
    }
}