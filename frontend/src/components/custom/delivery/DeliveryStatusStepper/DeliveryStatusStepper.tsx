import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';

import { DeliveryStatus, Delivery } from 'types';
import { toUpperCase } from 'utils';

import './styles.scss';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { loggedUser } from 'redux/slices/loggedUser/loggedUserSlice';
import { deliveryInfo } from 'redux/slices/delivery/deliverySlice';

const steps: { status: DeliveryStatus, description: string, activeText: string }[] = [
  { status: 'ordered', description: 'This delivery has been created.', activeText: 'Waiting for the delivery to be created.' },
  { status: 'dispatched', description: 'This delivery is on it\'s way to the box.', activeText: 'Waiting for courier pickup.' },
  { status: 'delivered', description: 'This delivery is currently in the box.', activeText: 'Waiting for package to arrive.' },
  { status: 'collected', description: 'This delivery has been collected by the customer.', activeText: 'Waiting for customer pickup.' },
];

const DeliveryStatusStepper = () => {
  const delivery: Delivery = useSelector(deliveryInfo);
  const [activeStep, setActiveStep] = React.useState(delivery.statusHistory.length - 1);
  const [history, setStatusHistory] = React.useState(delivery.statusHistory);
  const user = useSelector(loggedUser);

  const update = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    //TODO remove and replace it with updated
    const statusUpdate = history[history.length - 1].statusUpdate;
    switch (history[history.length - 1].deliveryStatus) {
      case 'ordered':
        setStatusHistory([...history, { deliveryStatus: 'dispatched', statusUpdate: statusUpdate }]);
        break;
      case 'dispatched':
        setStatusHistory([...history, { deliveryStatus: 'delivered', statusUpdate: statusUpdate }]);
        break;
      case 'delivered':
        setStatusHistory([...history, { deliveryStatus: 'collected', statusUpdate: statusUpdate }]);
        break;
    }
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
                    history[history.length - 1 - index].deliveryStatus === 'ordered' &&
                    user.role === 'deliverer' &&
                    user.id === delivery.deliverer.id &&
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