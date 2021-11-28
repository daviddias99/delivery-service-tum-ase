import { BoxStatus, DeliveryStatus } from 'types';

function toUpperCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function dateSortDsc(date1: Date, date2: Date): number {
  if (date1 < date2) {
    return 1;
  }

  if (date1 === date2) {
    return 0;
  }

  return -1;
}

function getBoxStatusColor(value: BoxStatus) {

  switch (value) {
    case 'assigned':
      return 'info';
    case 'active':
      return 'warning';
    case 'free':
      return 'success';
    default:
      break;
  }
}

const getDeliveryStatusColor = (value: DeliveryStatus) => {
  switch (value) {
    case 'delivered':
      return '#DCEDC2';
    case 'collected':
      return '#A8E6CE';
    case 'dispatched':
      return '#45ADA8';
    case 'ordered':
      return '#CC527A';
    default:
      break;
  }
};



export {
  getDeliveryStatusColor,
  getBoxStatusColor,
  toUpperCase,
  dateSortDsc
};
