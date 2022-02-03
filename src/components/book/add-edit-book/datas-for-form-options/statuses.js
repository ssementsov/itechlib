import { bookStatus } from '../../../../common/constants/status-constants';
export const statuses = [
    {
        value: bookStatus.available.name,
        label: 'Available',
    },
    {
        value: bookStatus.notAvailable.name,
        label: 'Not available',
    },
    {
        value: bookStatus.inUse.name,
        label: 'In use',
    },
];
