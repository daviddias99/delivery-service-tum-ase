import React from 'react';
import { Container, Paper } from '@mui/material';
import Layout from '../../components/common/Layout/Layout';
import UserManagement from 'components/UserManagement/UserManagement';


const UserManagementPage = () => {


  return (
    <Layout hasSidebar={true}>

      <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>

        <Paper sx={{ p: '2em'}}>
          <UserManagement />
        </Paper>

      </Container>

    </Layout>
  );

};

export default UserManagementPage;