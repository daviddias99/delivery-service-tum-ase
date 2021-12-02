import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';

import { DeliveryStatus } from 'types';
import { toUpperCase } from 'utils';

import './styles.scss';

const steps: { status: DeliveryStatus, description: string, activeText: string }[] = [
  { status: 'ordered', description: 'This delivery has been created.', activeText: 'Waiting for the delivery to be created.' },
  { status: 'dispatched', description: 'This delivery is on it\'s way to the box.', activeText: 'Waiting for courier pickup.' },
  { status: 'delivered', description: 'This delivery is currently in the box.', activeText: 'Waiting for package to arrive.' },
  { status: 'collected', description: 'This deliveryhas been collected by the customer.', activeText: 'Waiting for customer pickup.' },
];

const DeliveryStatusStepper = ({ statusHistory }: {
  statusHistory: {
    status: DeliveryStatus,
    statusUpdate: string,
  }[]
}) => {

  return (
    <Box className="deliveryStatusStepper" sx={{ width: '100%' }}>
      <Stepper nonLinear activeStep={statusHistory.length} orientation="vertical">
        {steps.map((statusHistoryStep, index) => (
          <Step key={index} completed={index < statusHistory.length}>
            <StepButton color="inherit">
              <p className="stepName">
                {toUpperCase(steps[index].status)}
              </p>

              {index === statusHistory.length &&
                <p className="activeText">
                  {steps[index].activeText}
                </p>}
              {index < statusHistory.length &&
                <p className="description">
                  {steps[index].description}
                </p>}
              {index < statusHistory.length &&
                <p className="stepDate">
                  {(new Date(statusHistory[statusHistory.length - 1 - index].statusUpdate)).toLocaleString()}
                </p>}
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default DeliveryStatusStepper;