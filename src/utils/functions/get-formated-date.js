import { format, formatISO, parseISO } from 'date-fns';

export const getFormatedDate = (dateISO) => {
    if(dateISO) {
        const dateJSON = parseISO(dateISO);
        return format(dateJSON, 'MM.dd.yyyy');
    }
};

export const getDateFormatISO = (date = new Date()) => {
    return formatISO(date, { representation: 'date' });
}
