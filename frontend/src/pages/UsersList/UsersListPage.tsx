import React from 'react';
import { Container, Paper } from '@mui/material';
import Layout from '../../components/common/Layout/Layout';
import UsersList from '../../components/custom/users/usersList/UsersList';


const UsersListPage = () => {


  return (
    <Layout hasSidebar={true}>

      <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>

        <Paper sx={{ p: '2em'}}>
          <UsersList />
        </Paper>

      </Container>

    </Layout>
  );

};

export default UsersListPage;