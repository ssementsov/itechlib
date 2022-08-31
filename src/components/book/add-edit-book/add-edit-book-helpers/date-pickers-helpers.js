import { add, sub } from 'date-fns';

export const minStartDate = sub(new Date(), { years: 1, days: 1 });
export const maxStartDate = new Date();

export const minFinishDate = sub(new Date(), { days: 1 });
export const maxFinishDate = add(new Date(), { months: 1 });