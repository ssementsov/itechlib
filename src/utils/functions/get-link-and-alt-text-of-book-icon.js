import {
    fictionImageLink,
    professionalImageLink,
    bookImageLink,
} from '../../assets/images';
import { category } from '../../common/constants/category-constants';

export function getLinkAndAltTextofBookIcon(book) {
    let bookIconLink;
    let altText;
    switch (book.category.name) {
        case category.fiction.name:
            bookIconLink = fictionImageLink;
            altText = 'fiction';
            break;
        case category.professional.name:
            bookIconLink = professionalImageLink;
            altText = 'professional';
            break;
        default:
            bookIconLink = bookImageLink;
            altText = 'some book';
    }
    return { bookIconLink, altText };
}
