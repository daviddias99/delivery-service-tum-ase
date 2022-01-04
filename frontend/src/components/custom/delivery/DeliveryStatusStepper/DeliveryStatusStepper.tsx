import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';

import { DeliveryStatus, Delivery, User } from 'types';
import { toUpperCase } from 'utils';
import api from 'services/api';

import './styles.scss';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loggedUser } from 'redux/slices/loggedUser/loggedUserSlice';
import { deliveryInfo, updateDelivery } from 'redux/slices/delivery/deliverySlice';
import { AxiosResponse } from 'axios';

const steps: { status: DeliveryStatus, description: string, activeText: string }[] = [
  { status: 'ordered', description: 'This delivery has been created.', activeText: 'Waiting for courier pickup.' },
  { status: 'dispatched', description: 'This delivery is on it\'s way to the box.', activeText: 'Waiting for package to arrive.'},
  { status: 'delivered', description: 'This delivery is currently in the box.', activeText: 'Waiting for customer pickup.' },
  { status: 'collected', description: 'This delivery has been collected by the customer.', activeText: '' },
];


function showUpdateButtonFun(delivery: Delivery, user: User) {
  return delivery.statusHistory[0].deliveryStatus === 'ordered' &&
    user.role === 'deliverer' &&
    user.id === delivery.deliverer.id;
}

const DeliveryStatusStepper = () => {
  const delivery: Delivery = useSelector(deliveryInfo);
  const user: User = useSelector(loggedUser);
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(delivery.statusHistory.length - 1);
  const [history, setStatusHistory] = React.useState(delivery.statusHistory);
  const [showUpdateButton, setShowUpdateButton] = React.useState(showUpdateButtonFun(delivery, user));

  React.useEffect(
    () => {
      setShowUpdateButton(showUpdateButtonFun(delivery, user));
    },
    [delivery, user]);

  const update = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const dispatchCallback = (response: AxiosResponse<any, any>) => {
      if (response.status !== 200) {
        return;
      }

      const statusUpdate = (new Date()).toUTCString();
      const newDelivery = { ...delivery, ...{ statusHistory: [...[{ deliveryStatus: 'dispatched', statusUpdate: statusUpdate }], ...history] } };
      dispatch(updateDelivery(newDelivery));
      setStatusHistory([{ deliveryStatus: 'dispatched', statusUpdate: statusUpdate }, ...history]);
    };
    api.dispatch(delivery.id, dispatchCallback);
    //TODO remove and replace it with updated
  };
  return (
    <Box className="deliveryStatusStepper" sx={{ width: '100%' }}>
      <Stepper nonLinear activeStep={activeStep} orientation="vertical">
        {steps.map((statusHistoryStep, index) => (
          <Step key={index} completed={index <= activeStep}>
            <StepButton color="inherit">
              <p className="stepName">
                {toUpperCase(steps[index].status)}
              </p>


              {index <= activeStep &&
                <p className="description">
                  {steps[index].description}
                </p>}
              {index < history.length &&
                <p className="stepDate">
                  {(new Date(history[history.length - 1 - index].statusUpdate)).toLocaleString()}
                </p>}
              {index === activeStep && index < steps.length - 1 &&
                <React.Fragment>
                  <p className="activeText">
                    {steps[index].activeText}
                  </p>
                  {
                    showUpdateButton &&
                    <Box sx={{ mb: 2 }}>
                      <div>
                        <Button
                          variant="contained"
                          onClick={update}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          {index === steps.length - 1 ? 'Close' : 'Update'}
                        </Button>
                      </div>
                    </Box>
                  }
                </React.Fragment>
              }
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default DeliveryStatusStepper;