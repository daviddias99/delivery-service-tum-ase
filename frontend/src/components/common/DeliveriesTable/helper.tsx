/* eslint-disable no-unused-vars */
import * as React from 'react';

import Chip from '@mui/material/Chip';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { getDeliveryStatusColor, toUpperCase } from 'utils';

const commonTableColumns = (showBox: boolean) => [
  { field: 'id', headerName: 'Delivery ID', width: 90, flex: 0.4 },
  {
    field: 'cName',
    headerName: 'Customer',
    flex: 0.5,
    valueGetter: (params: any) => params.row.customer.name,
  },
  {
    field: 'dName',
    headerName: 'Deliverer',
    valueGetter: (params: any) => params.row.deliverer.name,
    flex: 0.5,
  },
  showBox && {
    field: 'bName',
    headerName: 'Box',
    valueGetter: (params: any) => params.row.box.name,
    flex: 0.5,
  },
  {
    field: 'dateUpdated',
    headerName: 'Date updated',
    type: 'dateTime',
    valueGetter: (params: any) => params.row.statusHistory[0] && params.row.statusHistory[0].statusUpdate && new Date(params.row.statusHistory[0].statusUpdate),
    flex: 0.5,
  },
  {
    field: 'action',
    headerName: 'See',
    flex: 0.1,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params: any) => {
      return (
        <Link to={`/delivery/${params.row.id}`}>
          <Button className="viewDeliveryButton" >View</Button>
        </Link>
      );
    },
  },
];

const pastDeliveriesTableColumns: (showBox: boolean) => any[] = (showBox) => [...commonTableColumns(showBox)];
const currentDeliveriesTableColumns: (showBox: boolean) => any[] = (showBox) => {
  const temp: any[] = [...commonTableColumns(showBox)];
  temp.splice(4, 0,
    {
      field: 'status',
      headerName: 'Status',
      renderCell: (params: any) => {
        return (<Chip size="small" label={toUpperCase(params.row.statusHistory[0].deliveryStatus)} sx={{ backgroundColor: getDeliveryStatusColor(params.row.statusHistory[0].deliveryStatus) }} />);
      }
    },
  );

  return temp;
};

export { currentDeliveriesTableColumns, pastDeliveriesTableColumns };