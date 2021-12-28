import * as React from 'react';
import Inventory2 from '@mui/icons-material/Inventory2';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

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
  }
];
