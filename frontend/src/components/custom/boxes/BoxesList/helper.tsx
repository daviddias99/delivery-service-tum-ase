import * as React from 'react';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { getBoxStatusColor, toUpperCase } from 'utils';

const boxesTableColumns = [
  { field: 'id', headerName: 'ID', width: 90, flex: 0.4 },
  {
    field: 'name',
    headerName: 'Name',
    flex: 0.5,
  },
  {
    field: 'status',
    headerName: 'Status',
    renderCell: (params: any) => (<Chip size="small" label={toUpperCase(params.row.status)} color={getBoxStatusColor(params.row.status)} />)
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
    filterable: false,
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

export { boxesTableColumns };
