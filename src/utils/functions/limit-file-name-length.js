export function limitFileNameLength(str) {
    if (str.length > 15) {
        const firstStrPart = str.slice(0, 5);
        const lastStrPart = str.slice(-7);
        return firstStrPart + '....' + lastStrPart;
    } else {
        return str;
    }
}
