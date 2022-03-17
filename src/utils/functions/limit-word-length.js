export function limitWordLength(str) {
            const arrOFWords = str.split(' ');
            let result = arrOFWords.find(word => word.length > 50);
            return result;
        }