import * as React from 'react';
// import cx from 'classnames';
// import { Link } from 'react-router-dom';
import Link from '@mui/material/Link';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';

import './styles.scss';

type SidebarMenuProps = {
  title: string,
  icon: React.ReactNode,
  link: string,
}

const SidebarMenuItem = ({ title, icon, link }: SidebarMenuProps) => {
  const selected: boolean = window.location.pathname === link;
  return (
    <Link href={link} underline={selected ? 'always' : 'none'} color="inherit">
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
