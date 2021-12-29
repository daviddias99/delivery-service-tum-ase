import React from 'react';
import SidebarMenuItem from './SidebarMenuItem/SidebarMenuItem';
import { sideBarListItems } from './menuItems';
import { loggedUser } from 'redux/slices/loggedUser/loggedUserSlice';
import { useSelector } from 'react-redux';

const SidebarMenu = () => {
  const user = useSelector(loggedUser);
  return (
    <div>
      {
        sideBarListItems(user.id)
          .filter(
            (item) =>
              item.roles.includes(user.role)
          )
          .map(
            (item, idx) => (
              <SidebarMenuItem key={idx} {...item} />
            )
          )
      }
    </div>);
};

export default SidebarMenu;
