import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deliveriesList, updateDeliveries } from '../../../redux/slices/delivery/deliveriesSlice';

const AddDelivery = () => {
  const [formData, setFormData] = useState(
    {
      boxId: '',
      boxName: 'Garching Box 4',
      delivererId: '',
      delivererName: 'Stephen Curry',
      customerId: '',
      customerName: 'Cristiano Ronaldo',
      deliveryDescription: '',
    }
  );

  const [errors, setErrors] = useState(
    {
      boxIdErrors: '',
      delivererIdErrors: '',
      customerIdErrors: '',
      deliveryDescriptionErrors: '',
    }
  );

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const list = useSelector(deliveriesList);
  const dispatch = useDispatch();

  const AddClicked = () => {
    let anyError = false;
    const newErrors: any[] = [];

    if (!formData.delivererId || formData.delivererId === '') {
      newErrors.push({ delivererIdErrors: 'Field is required' });
      anyError = true;
    } else {
      newErrors.push({ delivererIdErrors: '' });
    }

    if (!formData.boxId || formData.boxId === '') {
      newErrors.push({ boxIdErrors: 'Field is required' });
      anyError = true;
    } else {
      newErrors.push({ boxIdErrors: '' });
    }

    if (!formData.customerId || formData.customerId === '') {
      newErrors.push({ customerIdErrors: 'Field is required' });
      anyError = true;
    } else {
      newErrors.push({ customerIdErrors: '' });
    }

    if (anyError) {
      let newErrorObj = {};

      newErrors.forEach(
        (obj) => {
          newErrorObj = { ...newErrorObj, ...obj };
        }
      );

      setErrors({ ...errors, ...newErrorObj });
      return;
    }

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
    handleClose();
  };

  const handleFormDataChange = (change: any) => {
    setFormData({ ...formData, ...change });
  };

  return (
    <div style={{ display: 'inline-block' }}>
      <Button variant="contained" color="success" sx={{ mr: 6 }} startIcon={<AddIcon />} onClick={handleClickOpen}>
        Create delivery
      </Button>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Create a new delivery</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new delivery, please select a box, a customer and a deliverer.
          </DialogContentText>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                autoFocus
                margin="dense"
                id="cId"
                label="Customer ID"
                type="name"
                fullWidth
                value={formData.customerId}
                onChange={(e) => handleFormDataChange({ customerId: e.target.value })}
                variant="outlined"
                error={errors.customerIdErrors !== ''}
                helperText={errors.customerIdErrors}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                autoFocus
                margin="dense"
                id="cName"
                label="Customer Name"
                type="name"
                fullWidth
                value={formData.customerName}
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                autoFocus
                margin="dense"
                id="dId"
                label="Deliverer ID"
                type="name"
                fullWidth
                value={formData.delivererId}
                onChange={(e) => handleFormDataChange({ delivererId: e.target.value })}
                variant="outlined"
                error={errors.delivererIdErrors !== ''}
                helperText={errors.delivererIdErrors}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                autoFocus
                margin="dense"
                id="dName"
                label="Deliverer Name"
                type="name"
                fullWidth
                value={formData.delivererName}
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                autoFocus
                margin="dense"
                id="bId"
                label="Box ID"
                type="name"
                fullWidth
                value={formData.boxId}
                onChange={(e) => handleFormDataChange({ boxId: e.target.value })}
                variant="outlined"
                error={errors.boxIdErrors !== ''}
                helperText={errors.boxIdErrors}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                autoFocus
                margin="dense"
                id="bName"
                label="Box Name"
                type="name"
                fullWidth
                value={formData.boxName}
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                autoFocus
                margin="dense"
                id="desc"
                label="Delivery description"
                type="name"
                multiline
                fullWidth
                onChange={(e) => handleFormDataChange({ deliveryDescription: e.target.value })}
                value={formData.deliveryDescription}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => {
            AddClicked();
          }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default AddDelivery;