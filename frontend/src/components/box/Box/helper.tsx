import * as React from 'react';

import Chip from '@mui/material/Chip';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { getDeliveryStatusColor, toUpperCase } from 'utils';

const commonTableColumns = [
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
  {
    field: 'dateUpdated',
    headerName: 'Date updated',
    type: 'dateTime',
    valueGetter: (params: any) => params.row.statusUpdate && new Date(params.row.statusUpdate),
    flex: 0.5,
  },
  {
    field: 'action',
    headerName: 'See',
    flex: 0.1,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (_params: any) => {
      return (
        <Link to="/">
          <Button className="viewDeliveryButton" >View</Button>
        </Link>
      );
    },
  },
];

const pastDeliveriesTableColumns: any[] = [...commonTableColumns];
const currentDeliveriesTableColumns: any[] = [...commonTableColumns];

currentDeliveriesTableColumns.splice(3, 0,
  {
    field: 'status',
    headerName: 'Status',
    renderCell: (params: any) => (<Chip size="small" label={toUpperCase(params.row.status)} sx={{backgroundColor: getDeliveryStatusColor(params.row.status)}} />)
  },
);

export { currentDeliveriesTableColumns, pastDeliveriesTableColumns };