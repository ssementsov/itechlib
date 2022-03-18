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
        this.link = link;
        this.comment = comment;
    }

    create() {
        if (this.category.name === '' && this.language.name !== '') {
            return {
                id: this.id,
                title: this.title,
                author: this.author,
                status: {
                    id: this.status.id,
                    name: this.status.name,
                },
                language: {
                    id: this.language.id,
                    name: this.language.name,
                },
                link: this.link,
                comment: this.comment,
            };
        } else if (this.category.name !== '' && this.language.name === '') {
            return {
                id: this.id,
                title: this.title,
                author: this.author,
                status: {
                    id: this.status.id,
                    name: this.status.name,
                },
                category: {
                    id: this.category.id,
                    name: this.category.name,
                },
                link: this.link,
                comment: this.comment,
            };
        } else if (this.category.name === '' && this.language.name === '') {
            return {
                id: this.id,
                title: this.title,
                author: this.author,
                status: {
                    id: this.status.id,
                    name: this.status.name,
                },
                link: this.link,
                comment: this.comment,
            };
        } else {
            return {
                id: this.id,
                title: this.title,
                author: this.author,
                status: {
                    id: this.status.id,
                    name: this.status.name,
                },
                category: {
                    id: this.category.id,
                    name: this.category.name,
                },
                language: {
                    id: this.language.id,
                    name: this.language.name,
                },
                link: this.link,
                comment: this.comment,
            };
        }
    }
}
