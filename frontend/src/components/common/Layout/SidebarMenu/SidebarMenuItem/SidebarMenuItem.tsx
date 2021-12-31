import * as React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';

import './styles.scss';

type SidebarMenuProps = {
  title: string,
  icon: React.ReactNode,
  link: string,
}

const SidebarMenuItem = ({ title, icon, link }: SidebarMenuProps) => {
  const selected: boolean = window.location.pathname === link || window.location.pathname === `${link}/` ;
  return (
    <Link to={link} className={cx('sidebarmenu-link', { selected })}>
      <ListItem button>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={title} />
      </ListItem>
    </Link>
  );
};


export default SidebarMenuItem;
