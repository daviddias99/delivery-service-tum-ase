import * as React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeliveryForm from './DeliveryForm';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deliveriesList, updateDeliveries } from 'redux/slices/delivery/deliveriesSlice';


const AddDelivery = () => {
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
          id: formData.delivererId,
          name: formData.delivererName
        },
        customer: {
          id: formData.customerId,
          name: formData.customerName
        },
        dispatcher: {
          id: 'CURRENT USER',
          name: 'CURRENT USER'
        },
        box: {
          id: formData.boxId,
          name: formData.boxName,
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
          boxName: 'Garching Box 4',
          delivererId: '',
          delivererName: 'Stephen Curry',
          customerId: '',
          customerName: 'Cristiano Ronaldo',
          deliveryDescription: '',
        }}
        handler={handler}
      />

    </div>
  );
};

export default AddDelivery;