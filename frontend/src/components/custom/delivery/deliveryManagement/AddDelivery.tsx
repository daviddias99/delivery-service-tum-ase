import * as React from 'react';
import {Alert, Button, Snackbar} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeliveryForm from './DeliveryForm';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deliveriesList, updateDeliveries } from 'redux/slices/delivery/deliveriesSlice';
import { loggedUser } from 'redux/slices/loggedUser/loggedUserSlice';
import api from 'services/api';
import { AxiosResponse } from 'axios';


const AddDelivery = () => {
  const user = useSelector(loggedUser);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [additionError, setAdditionError] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const list = useSelector(deliveriesList);
  const dispatch = useDispatch();

  const handler = (formData: any) => {
    const newDelivery = {
      description: formData.deliveryDescription.trim(),
      deliverer: {
        id: formData.delivererId.trim(),
        name: formData.delivererName.trim()
      },
      customer: {
        id: formData.customerId.trim(),
        name: formData.customerName.trim()
      },
      dispatcher: {
        id: user.id,
        name: `${user.firstName} ${user.surname}`
      },
      box: {
        id: formData.boxId.trim(),
        name: formData.boxName.trim(),
      }
    };

    const callback = (response: AxiosResponse<any, any>) => {
      if (response.status !== 200) {
        setAdditionError('Could not create delivery');
        setError(true);
        return;
      } else if (response.status === 200) {
        setSuccess(true);
      }
      dispatch(updateDeliveries([...list, response.data.deliveryDto]));
    };

    api.createDelivery(newDelivery, callback);
  };
  const handleError = () => {
    setError(false);
  };

  const handleSuccess = () => {
    setSuccess(false);
  };
  return (
    <div style={{ display: 'inline-block' }}>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleError}>
        <Alert severity="error" sx={{ width: '100%' }}>
          This is a error message! Could not create the delivery.
        </Alert>
      </Snackbar>
      <Snackbar open={success} autoHideDuration={6000} onClose={handleSuccess}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Delivery successfully added.
        </Alert>
      </Snackbar>
      <Button variant="contained" color="success" sx={{ mr: 6 }} startIcon={<AddIcon />} onClick={handleClickOpen}>
        Create delivery
      </Button>
      <DeliveryForm
        isOpen={open}
        close={handleClose}
        title="Add delivery"
        description="Create a new delivery associated with a customer, deliverer and box."
        btnText="Create"
        error={additionError}
        initialData={{
          boxId: '',
          boxName: '',
          delivererId: '',
          delivererName: '',
          customerId: '',
          customerName: '',
          deliveryDescription: '',
        }}
        handler={handler}
      />

    </div>
  );
};

export default AddDelivery;