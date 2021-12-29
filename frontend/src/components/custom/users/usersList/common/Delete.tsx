import React from 'react';
import {
  Alert,
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Toolbar
} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';



const Delete = (props:any)=> {
  const selected:any = useSelector(props.selectedSelector);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();



  const customer:any = useSelector(props.selector);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const deleteClicked = () => {
    const selectedCopy = [...selected];
    const customerCopy =[...customer];

    selectedCopy.forEach(element => {
      const index = customerCopy.indexOf(element, 0);
      if (index > -1) {
        customerCopy.splice(index, 1);
      }
    });
    dispatch(props.updateSelected([]));
    dispatch(props.update(customerCopy));
    handleClose();
  };
  return (

    selected.length > 0 ?(
      <div style={{whiteSpace: 'nowrap'}}>
        <Box sx={{flexGrow: 1}}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{mr: 2}}
              >
                <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={handleClickOpen}>
                  Delete
                </Button>
                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>Delete Box</DialogTitle>
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
                </Dialog>
              </IconButton>
            </Toolbar>
          </AppBar>
        </Box>
      </div>)
      :(
        <div></div>)


  );
};
export default Delete;