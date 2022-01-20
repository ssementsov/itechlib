import { status } from "../../../../common/constants/status-constants";
export const statuses = [
  {
    value: status.available.name,
    label: "Available",
  },
  {
    value: status.notAvailable.name,
    label: "Not available",
  },
  {
    value: status.inUse.name,
    label: "In use",
  },
];
