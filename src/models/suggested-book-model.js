export class SuggestedBook {
    constructor(
        id = 0,
        title = '',
        author = '',
        categoryId = '',
        categoryName = '',
        languageId = '',
        languageName = '',
        link = '',
        comment = ''
    ) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.category = {
            id: categoryId,
            name: categoryName,
        };
        this.language = {
            id: languageId,
            name: languageName,
        };
        this.link = link;
        this.comment = comment;
    }
}
