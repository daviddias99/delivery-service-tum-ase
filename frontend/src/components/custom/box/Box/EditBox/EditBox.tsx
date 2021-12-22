import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { updateBox } from 'redux/slices/box/boxSlice';
import api from 'services/api';

const EditBox = ({ initialData }: { initialData: any }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [formData, setFormData] = React.useState(initialData);
  const handleFormDataChange = (change: any) => {
    setFormData({ ...formData, ...change });
  };

  const EditClicked = () => {
    // copy the value from the store to change them.
    const newBox: any = { id: initialData.id, status: initialData.status };
    const addressInfo = { ...initialData.address };

    newBox.name = formData.name;
    addressInfo.addressLine1 = formData.address;
    addressInfo.addressLine2 = formData.co;
    addressInfo.city = formData.city;
    addressInfo.postalCode = formData.postalCode;
    newBox.address = addressInfo;

    const callback = (data: any, status: number) => {

      if (status !== 200) {
        return;
      }
      dispatch(updateBox(newBox));
      handleClose();
    };
    api.editBox(newBox.id, newBox, callback);
  };

  return (
    <React.Fragment>
      <Button variant="contained" style={{ float: 'right' }} endIcon={<EditIcon />} onClick={handleClickOpen}>Edit</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit box Information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit the following Cells.
          </DialogContentText>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="name"
                fullWidth
                value={formData.name}
                onChange={(e) => handleFormDataChange({ name: e.target.value })}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                autoFocus
                margin="dense"
                id="adress"
                label=" Address"
                type="adress"
                fullWidth
                value={formData.address}
                onChange={(e) => handleFormDataChange({ address: e.target.value })}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                margin="dense"
                id="co"
                label=" Co"
                type="co"
                fullWidth
                value={formData.co}
                onChange={(e) => handleFormDataChange({ co: e.target.value })}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                autoFocus
                margin="dense"
                id="city"
                label=" City"
                type="city"
                fullWidth
                value={formData.city}
                onChange={(e) => handleFormDataChange({ city: e.target.value })}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                autoFocus
                margin="dense"
                id="postalCode"
                label=" Postal Code"
                type="postalCode"
                fullWidth
                value={formData.postalCode}
                onChange={(e) => handleFormDataChange({ postalCode: e.target.value })}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => {
            EditClicked();
          }}
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default EditBox;