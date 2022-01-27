import React, {useEffect, useState} from 'react';
import Layout from '../../components/common/Layout/Layout';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import {useParams} from 'react-router-dom';
import {AxiosResponse} from 'axios';

import api from '../../services/api';
import UserProfile from '../../components/custom/users/userProfile/UserProfile';
import Spinner from '../../components/common/Spinner/Spinner';




const UserProfilePage = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = React.useState(true);

  const id = useParams();
  useEffect(() => {
    const callback = (response: AxiosResponse<any, any>) => {
      if (response.status !== 200) {
        return;
      }
      setUser(response.data);
      setIsLoading(false);
    };
    api.getUser(String(id.userId), callback);
  }, [isLoading, id.userId]);

  return (
    <Layout hasSidebar={true}>
      <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: '2em', display: 'flex', flexDirection: 'column' }}>
          {isLoading ? <Spinner className="loadingSpinner" /> : <UserProfile user={user}></UserProfile>}
        </Paper>
      </Container>
    </Layout>
  );



};


export default UserProfilePage;