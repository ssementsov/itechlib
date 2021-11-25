import { status } from '../../../common/constants/status-constants'
export const statuses = [
  {
    defaultValue: '',
    defaultLabel: 'Status*',
    disabled: true,
  },
  {
    value: status.available,
    label: 'Available',
  },
  {
    value: status.notAvailable,
    label: 'Not available',
  },
  {
    value: status.inUse,
    label: 'In use',
  },
]
