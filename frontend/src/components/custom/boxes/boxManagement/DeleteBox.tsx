import { useDispatch, useSelector } from 'react-redux';

import {updateSelectedBox, selectedBoxes, boxesList, updateBoxes} from 'redux/slices/box/boxesSlice';
import * as React from 'react';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from 'types';

import api from 'services/api';

export const DeleteBox = () => {
  const [open, setOpen] = React.useState(false);
  const selected: Box[] = useSelector(selectedBoxes);
  const boxes: Box[] = useSelector(boxesList);
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const deleteClicked = () => {
    const selectedCopy = [...selected];
    const index: number[] =[];
    selectedCopy.forEach(element => {
      api.deleteBox(element.id, () => {});
      index.push(boxes.indexOf(element));
      dispatch(updateSelectedBox([]));
    });
    const boxesCopy = [...boxes];
    index.forEach(i => {
      const element = boxesCopy[i];
      boxesCopy[i]= {id: element.id, raspberryId: element.raspberryId, name: element.name, address: element.address, status: 'inactive'};
    });
    dispatch(updateBoxes(boxesCopy));

    handleClose();
  };

  return (
    <div style={{ display: 'inline-block' }} >
      <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={handleClickOpen}>
        Delete
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Box</DialogTitle>
        {selected.length <= 0 ? (
          <>
            <DialogContent>
              <Alert severity="error">No Box selected</Alert>
            </DialogContent>
            <Button onClick={handleClose}>Cancel</Button>
          </>
        )
          : (
            <React.Fragment>
              <DialogContent>
                <Alert severity="warning">Are you sure!</Alert>

              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => {
                  deleteClicked();
                }}
                >
                  Delete
                </Button>
              </DialogActions>
            </React.Fragment>
          )
        }
      </Dialog>


    </div>
  );
};


export default DeleteBox;