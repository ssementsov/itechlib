export class SuggestedBook {
    constructor(
        id = 0,
        title = '',
        author = '',
        categoryId = '',
        categoryName = '',
        languageId = '',
        languageName = '',
        statusId = '',
        statusName = '',
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
        this.status = {
            id: statusId,
            name: statusName,
        };
        this.link = link || null;
        this.comment = comment || null;
    }
}
