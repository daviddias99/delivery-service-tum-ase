import React from 'react';
import { Container, Paper } from '@mui/material';
import Layout from '../../components/common/Layout/Layout';
import CreateUser from 'components/custom/users/userManagement/addUser/CreateUser';


const AddUserPage = () => {


  return (
    <Layout hasSidebar={true}>

      <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>

        <Paper sx={{ p: '2em'}}>
          <CreateUser />
        </Paper>

      </Container>

    </Layout>
  );

};

export default AddUserPage;