import * as React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeliveryForm from './DeliveryForm';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deliveriesList, updateDeliveries } from 'redux/slices/delivery/deliveriesSlice';
import { loggedUser } from 'redux/slices/loggedUser/loggedUserSlice';


const AddDelivery = () => {
  const user = useSelector(loggedUser);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const list = useSelector(deliveriesList);
  const dispatch = useDispatch();

  const handler = (formData: any) => {
    dispatch(updateDeliveries([
      ...list, {
        id: '1',
        trackingCode: '1',
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
        },
        statusHistory: [{ status: 'ordered', statusUpdate: (new Date()).toISOString() }]
      }
    ]));
  };

  return (
    <div style={{ display: 'inline-block' }}>
      <Button variant="contained" color="success" sx={{ mr: 6 }} startIcon={<AddIcon />} onClick={handleClickOpen}>
        Create delivery
      </Button>
      <DeliveryForm
        isOpen={open}
        close={handleClose}
        title="Add delivery"
        description="Create a new delivery associated with a customer, deliverer and box."
        btnText="Create"
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