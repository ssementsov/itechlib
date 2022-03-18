import { fictionImageLink, professionalImageLink } from '../../assets/images';
import { category } from '../../common/constants/category-constants';

export function getLinkAndAltTextofBookIcon(book) {
    let bookIconLink;
    let altText;
    switch (book.category?.name) {
        case category.fiction.name:
            bookIconLink = fictionImageLink;
            altText = 'fiction';
            break;
        default:
            bookIconLink = professionalImageLink;
            altText = 'professional';
    }
    return { bookIconLink, altText };
}
