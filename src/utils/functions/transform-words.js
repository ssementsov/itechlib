export function toLowerCaseExceptFirstLetter(string) {
    if (string) {
        return string[0] + string.slice(1).toLowerCase();
    } else {
        return '';
    }
}
