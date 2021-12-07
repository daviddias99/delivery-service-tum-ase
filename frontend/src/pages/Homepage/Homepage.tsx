import React from 'react';
import HomePageComponent from 'components/homepage/Homepage';
import Layout from 'components/common/Layout/Layout';

const Homepage = () => {
  return (
    <Layout hasSidebar={false} >
      <HomePageComponent />
    </Layout>

  );
};

export default Homepage;