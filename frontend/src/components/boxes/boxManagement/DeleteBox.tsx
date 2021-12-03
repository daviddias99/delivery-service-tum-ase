import { useDispatch, useSelector } from 'react-redux';

import { updateBoxes, updateSelectedBox, selectedBoxes, boxesList } from '../../../redux/slices/boxes/boxesSlice';
import * as React from 'react';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from 'types';

export const DeleteBox = () => {
  const [open, setOpen] = React.useState(false);
  const list: Box[] = useSelector(boxesList);
  const selected: Box[] = useSelector(selectedBoxes);
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const deleteClicked = () => {
    const newList = [...list];
    selected.forEach(element => {
      const index = newList.indexOf(element);
      if (index > -1) {
        //newList.splice(index, 1);
        const box = { ...newList[index] };
        box.status = 'inactive';
        newList[index] = box;
      }
    });
    dispatch(updateBoxes(newList));
    dispatch(updateSelectedBox([]));
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