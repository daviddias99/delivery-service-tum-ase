import React from 'react';
import Layout from 'components/common/Layout/Layout';
import { Paper } from '@mui/material';

const NotFound = () => {
  return (
    <Layout hasSidebar={false} >
      <Paper style={{ width: '70%', margin: '10em auto' }}>
        <h1>We could not deliver the page you are looking for.</h1>
      </Paper>
    </Layout>

  );
};

export default NotFound;