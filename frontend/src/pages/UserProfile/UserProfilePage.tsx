import React from 'react';
import Layout from '../../components/common/Layout/Layout';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import {Avatar, Box, Divider} from '@mui/material';
import {useSelector} from 'react-redux';
import {loggedUser} from '../../redux/slices/loggedUser/loggedUserSlice';




const UserProfilePage = () => {
  const user = useSelector(loggedUser);

  return (
    <Layout hasSidebar={true}>
      <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: '2em', display: 'flex', flexDirection: 'column' }}>
          <Container maxWidth="xl">
            <Box sx={{ bgcolor: '#152238', height: '10vh', position: 'relative'}}>
              <Avatar sx={{ border: '5px solid', borderRadius: '50%', color: '#000000', bgcolor: '#FFFFFF', width: '120px', height: '120px', marginLeft: 'auto', marginRight: 'auto', fontSize: '40px'}}>
                {user.username.charAt(0).toUpperCase()}
              </Avatar>
            </Box>
            <Box sx={{marginTop: '45px'}}>
              <div style={{textAlign: 'center', fontSize: '30px'}} >
                {user.firstName}
                {' ' + user.surname}
              </div>
              <div style={{textAlign: 'center', fontSize: '20px', color: 'grey'}}>
                {user.role.substr(0, 1)+user.role.substr(1).toLocaleLowerCase()}
              </div>
              <div id="personalInfos" style={{marginTop: '3%', marginBottom: '5%', textAlign: 'center'}}>
                <Divider />
                <h3 style={{fontSize: '20px'}}>
                  Personal Information:
                </h3>
                <p style={{marginTop: '10px'}} >
                  <b className="infoTag" >Id: </b>
                  {' '}
                  {user.id}
                </p>
                <p style={{marginTop: '10px'}}>
                  <b className="infoTag">First Name: </b>
                  {' '}
                  {user.firstName}
                </p>
                <p style={{marginTop: '10px'}}>
                  <b className="infoTag">Surname: </b>
                  {' '}
                  {user.surname}
                </p>
                <p style={{marginTop: '10px'}}>
                  <b className="infoTag">Email: </b>
                  {' '}
                  {user.email}
                </p>
                <p style={{marginTop: '10px'}}>
                  <b className="infoTag">Role: </b>
                  {' '}
                  {user.role}
                </p>
              </div>
              <Divider />
            </Box>

          </Container>



        </Paper>
      </Container>
    </Layout>
  );



};


export default UserProfilePage;