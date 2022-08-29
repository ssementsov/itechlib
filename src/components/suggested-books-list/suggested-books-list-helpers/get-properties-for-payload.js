import { category } from '../../../common/constants/category-constants';

export const getSuggestedBokkCategoryId = (newBook) => {
    switch (newBook.category) {
        case category.professional.name:
            return category.professional.id;
        case category.fiction.name:
            return category.fiction.id;
        default:
            return '';
    }
}