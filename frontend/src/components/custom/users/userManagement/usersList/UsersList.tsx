import React, {useEffect} from 'react';
import {AppBar, Box, Tab, Tabs, Typography} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import CustomersList from './CustomersList';
import DeliverersList from './DeliverersList';
import DispatchersList from './DispatchersList';
import {AxiosResponse} from 'axios';
import {updateCustomer} from 'redux/slices/users/customersSlice';
import {useDispatch} from 'react-redux';
import api from 'services/api';
import {updateDeliverers} from 'redux/slices/users/delivererSlice';
import {updateDispatchers} from 'redux/slices/users/dispatcherSlice';



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

const UsersList = () => {
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    switch (value){
      case 0: {
        const requestCallback = (response: AxiosResponse<any, any>) => {
          console.log(response.data);
          dispatch(updateCustomer(response.data));
        };
        api.getAllCustomers(requestCallback);
        break;
      }
      case 1: {
        const requestCallback = (response: AxiosResponse<any, any>) => {
          console.log(response.data);
          dispatch(updateDeliverers(response.data));
        };
        api.getAllDeliverers(requestCallback);
        break;
      }
      case 2: {
        const requestCallback = (response: AxiosResponse<any, any>) => {
          console.log(response.data);
          dispatch(updateDispatchers(response.data));
        };
        api.getALlDispatchers(requestCallback);
        break;
      }
    }
  }, [value, dispatch]);

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

          <Tab icon={<PersonIcon />} label="Customers List" {...a11yProps(0)} />
          <Tab icon={<DeliveryDiningIcon />} label="Deliverers List" {...a11yProps(1)} />
          <Tab icon={<SupervisorAccountIcon />} label="Dispatchers List" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <CustomersList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DeliverersList />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DispatchersList />
      </TabPanel>
    </Box>
  );


};
export default UsersList;
