export const trimmedString = (str) => {
    if (str.length > 80) {
        const arrayOfWords = str.split(' ');
        let newStr = '';
        for (let word of arrayOfWords) {
            if (newStr.length < 80) {
                newStr += ' ' + word;
            } else {
                return newStr + '...';
            }
        }
    }

    return str;
};
