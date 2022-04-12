export const getDate = (dateArray) => {
    let year = '';
    let month = '';
    let day = '';
    if (dateArray) {
        dateArray.forEach((item, index) => {
            const correctNumber = item.toString().length > 1 ? `${item}.` : `0${item}.`;
            if (index === 0) {
                year += item;
            }
            if (index === 1) {
                month += correctNumber;
            }
            if (index === 2) {
                day += correctNumber;
            }
        });
    }
    return month + day + year;
};
