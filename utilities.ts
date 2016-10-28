function negatePaths(path: string): string[];
function negatePaths(path: string[]): string[];
function negatePaths(paths) {
    if (typeof paths != 'string' && !(paths instanceof Array) && paths.filter(path => typeof path != 'string').length > 0) {
        throw new Error('negatePaths requires a string or string array passed into it, got type ' + typeof paths 
            + '. If you did pass in an array, not all elements are of the expected type.');
    }
    
    if (typeof paths == 'string') {
        paths = [paths];
    }
    
    if (paths instanceof Array) {
        return paths.map(path => '!' + path);
    }
}

export { negatePaths };