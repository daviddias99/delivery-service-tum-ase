import * as React from 'react';
import { useState } from 'react';

import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector, useDispatch } from 'react-redux';
import { deliveryInfo, updateDelivery } from 'redux/slices/delivery/deliverySlice';

import api from 'services/api';

import DeliveryForm from './DeliveryForm';
import { Delivery } from 'types';
import { AxiosResponse } from 'axios';

const EditDelivery = () => {
  const [open, setOpen] = useState(false);
  const [additionError, setAdditionError] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const info = useSelector(deliveryInfo);
  const dispatch = useDispatch();

  const handler = (formData: any) => {

    const newDelivery: Delivery = {
      ...info,
      ...{
        'box': {
          'name': formData.boxName,
          'id': formData.boxId,
        },
        'deliverer': {
          'name': formData.delivererName,
          'id': formData.delivererId
        },
        'customer': {
          'name': formData.customerName,
          'id': formData.customerId,
        },
        'description': formData.deliveryDescription
      }
    };

    const callback = (response: AxiosResponse<any, any>) => {
      if (response.status !== 200) {
        setAdditionError('Could not create delivery');
        return;
      }

      dispatch(updateDelivery(newDelivery));
    };

    api.editDelivery(newDelivery.id, newDelivery, callback);
  };

  const delivery: Delivery = useSelector(deliveryInfo);

  return (
    <React.Fragment>
      <Button variant="contained" style={{ float: 'right' }} endIcon={<EditIcon />} onClick={handleClickOpen}>Edit</Button>
      <DeliveryForm
        error={additionError}
        isOpen={open}
        close={handleClose}
        initialData={
          {
            boxId: delivery.box.id,
            boxName: delivery.box.name,
            delivererId: delivery.deliverer.id,
            delivererName: delivery.deliverer.name,
            customerId: delivery.customer.id,
            customerName: delivery.customer.name,
            deliveryDescription: delivery.description,
          }
        }
        title="Edit delivery"
        description="Here you can change the details of the delivery. This can only be done before a deliverer picked up the delivery."
        btnText="Edit"
        handler={handler}
      />
    </React.Fragment>
  );
};

export default EditDelivery;