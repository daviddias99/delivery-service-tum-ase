
import { Button, Card, CardActions, CardContent, CardHeader, TextField, Theme, Modal } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import axios, { AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';
import './styles.scss';

import React from 'react';
import api from 'services/api';
import { updateLoggedUser } from 'redux/slices/loggedUser/loggedUserSlice';

type LoginModalProps = {
  open: boolean,
  setOpen: any,
};

const LoginModal = ({ open, setOpen }: LoginModalProps) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [errorText, setErrorText] = React.useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: 600,
        margin: `${theme.spacing(0)} auto`,
      },
      loginBtn: {
        marginTop: theme.spacing(2),
        flexGrow: 1
      },
      header: {
        textAlign: 'center',
        background: '#212121',
        color: '#fff'
      },
      card: {
        marginTop: theme.spacing(10),
      }
    })
  );

  const submitForm = () => {
    let valid: boolean = true;

    setEmailError('');
    setPasswordError('');
    // if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    //   setEmailError('Email is invalid.');
    //   valid = false;
    // }

    if (password.length === 0) {
      setPasswordError('Password must not be empty.');
    } else if (password.length < 6) {
      setPasswordError('Password is invalid, must be at least 6 characters in length.');
      valid = false;
    }

    if (!valid) {
      return;
    }

    const loginHandler = (response: AxiosResponse<any, any>) => {
      if (response.status !== 200) {
        setErrorText('Invalid credentials.');
        return;
      }

      dispatch(updateLoggedUser(response.data.user));
      setOpen(false);
      navigate('/');
    };

    const xsrfHandler = (response: AxiosResponse<any, any>) => {
      if (response.status !== 200) {
        setErrorText('Invalid credentials.');
        return;
      }
      const xsrfToken = Cookie.get('XSRF-TOKEN');
      if (!xsrfToken) {
        return;
      }
      axios.defaults.headers.post['X-XSRF-TOKEN'] = xsrfToken;
      api.login({ username: email, password: password }, loginHandler);
    };

    api.getXSRF(xsrfHandler);
  };

  const styles = useStyles();

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="loginModal"
    >
      <form className={styles.container} noValidate autoComplete="off">

        <Card className={styles.card} >
          <CardHeader className={styles.header} title="Login" />
          <CardContent sx={{ padding: '1em 5em' }}>
            <div style={{ padding: '1.5em 0em' }}>
              <TextField
                fullWidth
                id="email"
                type="email"
                label="Email"
                placeholder="Email"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError !== ''}
                helperText={emailError}
              />
              <TextField
                fullWidth
                id="password"
                type="password"
                label="Password"
                placeholder="Password"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError !== ''}
                helperText={passwordError}
              />
              <p className="errorText">
                {errorText}
              </p>
            </div>
          </CardContent>
          <CardActions sx={{ padding: '1em 3em' }}>
            <Button
              variant="outlined"
              size="large"
              className={styles.loginBtn}
              onClick={submitForm}
            >
              Login
            </Button>
          </CardActions>
        </Card>
      </form>
    </Modal>
  );
};

export default LoginModal;