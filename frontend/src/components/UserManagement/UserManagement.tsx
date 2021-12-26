import React from 'react';
import {AppBar, Box, Tab, Tabs, Typography} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import CustomerManagement from './CustomerManagement';
import DelivererManagement from './DelivererManagement';
import DispatcherManagement from './DispatcherManegement';


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
};
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const UserManagement = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >

          <Tab icon={<PersonIcon />} label="Customer Management" {...a11yProps(0)} />
          <Tab icon={<DeliveryDiningIcon />} label="Deliverer Management" {...a11yProps(1)} />
          <Tab icon={<SupervisorAccountIcon />} label="Dispatcher Management" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <CustomerManagement />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DelivererManagement />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DispatcherManagement />
      </TabPanel>
    </Box>
  );


};
export default UserManagement;
