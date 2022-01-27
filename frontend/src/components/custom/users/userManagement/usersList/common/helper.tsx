import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import * as React from 'react';

const usersTableColumns = [
  { field: 'id', headerName: 'ID', width: 90, flex: 0.4 },
  {
    field: 'firstName',
    headerName: 'First Name',
    flex: 0.5,
  },
  {
    field: 'surname',
    headerName: 'Surname',
    flex: 0.5,
  },
  {
    field: 'email',
    headerName: 'email',
    flex: 0.5,
  },
  {
    field: 'rfId',
    headerName: 'RFID',
    flex: 0.5,
  },
  {
    field: 'profile',
    headerName: 'Profile',
    disableColumnMenu: true,
    renderCell: (params: any) => {
      return (
        <Link to={`/user/${params.row.id}/profile`}>
          <Button className="viewProfileButton" >View</Button>
        </Link>
      );
    },
  }
];
function escapeRegExp(value: string): string {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}



export {usersTableColumns, escapeRegExp};