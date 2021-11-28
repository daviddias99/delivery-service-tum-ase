import React from 'react';
import SidebarMenuItem from './SidebarMenuItem/SidebarMenuItem';
import { sideBarListItems } from './menuItems';

const SidebarMenu = () => {
  return (
    <div>
      {
        sideBarListItems.map(
          (item, idx) => (
            <SidebarMenuItem key={idx} {...item} />
          )
        )
      }
    </div>);
};

export default SidebarMenu;
