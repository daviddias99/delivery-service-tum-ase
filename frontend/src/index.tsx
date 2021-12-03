import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Router from './Router';
import { ThemeProvider, createTheme } from '@mui/material/styles';

/* Global styles */
import 'assets/styles/common.scss';
import { Provider } from 'react-redux';
import { store } from './redux/store';

// TODO configure theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#152238'
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <Provider store={store}>
        <Router />
      </Provider>
    </React.StrictMode>
  </ThemeProvider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
