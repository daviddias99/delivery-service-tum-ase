import * as React from 'react';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const getColumnColor = (value: string) => {

  switch (value) {
    case 'assigned':
      return 'info';
    case 'full':
      return 'warning';
    case 'free':
      return 'success';
    default:
      break;
  }
};

const columns = [
  { field: 'id', headerName: 'ID', width: 90, flex: 0.4 },

  {
    field: 'name',
    headerName: 'Name',
    flex: 0.5,

  },
  {
    field: 'status',
    headerName: 'Status',
    renderCell: (params: any) => (<Chip size="small" label={params.row.status.charAt(0).toUpperCase() + params.row.status.slice(1)} color={getColumnColor(params.row.status)} />)
  },
  {
    field: 'address',
    headerName: 'Address',
    valueGetter: (params: any) => params.row.address.addressLine1,
    flex: 0.5,
  },
  {
    field: 'addressComp',
    sortable: false,
    headerName: 'Address Complement',
    valueGetter: (params: any) => params.row.address.addressLine2,
    flex: 0.3,

  },
  {
    field: 'city',
    headerName: 'City',
    valueGetter: (params: any) => params.row.address.city,
    flex: 0.3,

  },
  {
    field: 'postalCode',
    headerName: 'Postal code',
    valueGetter: (params: any) => params.row.address.postalCode,
    flex: 0.3,
  },
  {
    field: 'action',
    headerName: 'See',
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params: any) => {
      return (
        <Link to={`/box/${params.row.id}`}>
          <Button className="viewBoxButton" >View</Button>
        </Link>
      );
    },
  },
];

export { columns };
