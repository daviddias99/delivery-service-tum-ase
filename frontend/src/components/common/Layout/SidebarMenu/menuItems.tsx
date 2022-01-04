import * as React from 'react';
import Inventory2 from '@mui/icons-material/Inventory2';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle';
// Contains list items of the sidebar
export const sideBarListItems = (userId: string) => [
  {
    title: 'Boxes',
    icon: (<MarkunreadMailboxIcon />),
    link: '/box',
    roles: ['dispatcher']
  },
  {
    title: 'Deliveries',
    icon: (<Inventory2 />),
    link: '/delivery',
    roles: ['dispatcher']
  },
  {
    title: 'My Orders',
    icon: (<ShoppingCartOutlinedIcon />),
    link: `/customer/${userId}/orders`,
    roles: ['customer']
  },
  {
    title: 'My Deliveries',
    icon: (<LocalShippingIcon />),
    link: `/deliverer/${userId}/deliveries`,
    roles: ['deliverer']
  },
  {
    title: 'Users List',
    icon: (<AdminPanelSettingsIcon />),
    link: '/dispatcher/usersList/',
    roles: ['dispatcher']
  },
  {
    title: 'Create User',
    icon: (<AddCircleIcon />),
    link: '/dispatcher/userManagement/',
    roles: ['dispatcher']

  }


];
