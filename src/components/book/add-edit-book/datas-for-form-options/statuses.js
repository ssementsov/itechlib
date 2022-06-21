import { bookStatus } from '../../../../common/constants/book-status-constants';
export const statuses = [
    {
        value: bookStatus.available.name,
        label: 'Available for reading',
        title: 'The book will be available for all readers.',
    },
    {
        value: bookStatus.notAvailable.name,
        label: 'Temporary unavailable for reading (optional)',
        title: 'Readers will not be able to take this book. You can change this via editing mode when the book will be available again.',
    },
    {
        value: bookStatus.inUse.name,
        label: 'Book is already handed over to a reader (optional)',
        title: 'You can select a user and reading period. The user You select will be notified to accept the book for the period specified. The user has to be registered on iTechLib.',
    },
];
