import * as React from 'react';
import Inventory2 from '@mui/icons-material/Inventory2';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
// Contains list items of the sidebar
export const sideBarListItems = [
  {
    title: 'Boxes',
    icon: (<MarkunreadMailboxIcon />),
    link: '/box'
  },
  {
    title: 'Deliveries',
    icon: (<Inventory2 />),
    link: '/delivery'
  }, {
    title: 'User Management',
    icon: (<AdminPanelSettingsIcon />),
    link: '/dispatcher/userManagement/'
  }
];
