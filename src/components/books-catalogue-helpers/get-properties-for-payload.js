import { bookStatus, category, language } from '../../common/constants';

export const getBookCategoryId = (book) => {
    switch (book.category) {
        case category.professional.name:
            return category.professional.id;
        case category.fiction.name:
            return category.fiction.id;
        default:
            return 0;
    }
}
export const getBookLanguageId = (book) => {
    switch (book.language) {
        case language.english.name:
            return language.english.id;
        case language.russian.name:
            return language.russian.id;
        default:
            return 0;
    }
}

export const getBookStatusId = (book) => {
    switch (book.status) {
        case bookStatus.notAvailable.name:
            return bookStatus.notAvailable.id;
        case bookStatus.inUse.name:
            return bookStatus.inUse.id;
        default:
            return bookStatus.available.id;
    }
}