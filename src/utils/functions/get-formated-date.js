import { format, parseISO } from 'date-fns';

export const getFormatedDate = (dateISO) => {
    if(dateISO) {
        const dateJSON = parseISO(dateISO);
        return format(dateJSON, 'MM.dd.yyyy');
    }
};
