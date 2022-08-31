import { getDateFormatISO, getFormatedDate } from '../../utils/functions/get-formated-date';
import { add } from 'date-fns';

export const ONLY_ONE_WHITESPACE_ALLOWED_REGEX = /\s{2,}/;

export const YOU_CAN_UPLOAD_IMAGE = `You can upload an image in JPG, GIF or PNG format. Maximum size 5MB.`;
export const ONLY_ONE_WHITESPACE_ALLOWED_MESSAGE = 'Only one whitespace allowed';
export const INVALID_DATE = 'Invalid Date';
export const FORMAT_DATE = 'mm/dd/yyyy';

export const isRequired = (field) => {
    return `${field} is required`
}
export const dateNotEarlierThan = (date, isOneMoreDay = false) => {
    const oneMoreDay = add(date, { days: 1 });
    return `Not earlier than ${getFormatedDate(getDateFormatISO(isOneMoreDay ? oneMoreDay : date))}`
}
export const dateNotLaterThan = (date) => {
    return `Not later than ${getFormatedDate(getDateFormatISO(date))}`
}
export const mustBeMoreSymbols = (field, count) => {
    return `${field} must be ${count} or more symbols`
}
export const mustBeLessSymbols = (field, count) => {
    return `${field} must be ${count} or less symbols`
}
