import * as React from 'react';
import Inventory2 from '@mui/icons-material/Inventory2';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
// Contains list items of the sidebar
export const sideBarListItems = (userId: string) => [
  {
    title: 'Boxes',
    icon: (<MarkunreadMailboxIcon />),
    link: '/box',
    roles: ['DISPATCHER']
  },
  {
    title: 'Deliveries',
    icon: (<Inventory2 />),
    link: '/delivery',
    roles: ['DISPATCHER']
  },
  {
    title: 'Order search',
    icon: (<SearchIcon />),
    link: '/orders/search',
    roles: ['CUSTOMER']
  },
  {
    title: 'My Orders',
    icon: (<ShoppingCartOutlinedIcon />),
    link: `/customer/${userId}/orders`,
    roles: ['CUSTOMER']
  },
  {
    title: 'My Deliveries',
    icon: (<LocalShippingIcon />),
    link: `/deliverer/${userId}/deliveries`,
    roles: ['DELIVERER']
  },
  {
    title: 'Users List',
    icon: (<AdminPanelSettingsIcon />),
    link: '/dispatcher/usersList/',
    roles: ['DISPATCHER']
  },
  {
    title: 'Create User',
    icon: (<AddCircleIcon />),
    link: '/dispatcher/userManagement/',
    roles: ['DISPATCHER']

  }
];
