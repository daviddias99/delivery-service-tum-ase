import React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Title from 'components/common/Title/Title';
import Layout from 'components/common/Layout/Layout';
import { User, Delivery } from 'types';
import Deliveries from 'components/custom/deliverer/Deliverer/Deliveries';
const deliverer: User = {
  id: '025bda9f-2607-5c4d-9d99-c4ecbc889d44b',
  firstName: 'Cristiano',
  surname: 'Ronaldo',
  username: 'cr7best',
  email: 'Cristiano.ronaldo@football.com',
  role: 'deliverer',
};

const deliveriesOverview: Delivery[] = [
  {
    'id': '786b6c5d-bc5a-57db-9241-3cfe1fe86770',
    'trackingNumber': 'aa0973a7-312a-54db-b1d5-130ed474921c',
    'dispatcher': {
      'name': 'Chad Silva',
      'id': '270e8b89-41a6-5751-b08c-b85ab1683b78'
    },
    'box': {
      'name': 'Shane Terry',
      'id': '07f34e59-14a3-52ad-9a13-5c5bd71904a5',
    },
    'deliverer': {
      'name': 'Cristiano Ronaldo',
      'id': '025bda9f-2607-5c4d-9d99-c4ecbc889d44b'
    },
    'customer': {
      'name': 'Lionel Messi',
      'id': '7503e790-0f86-5e47-844c-433df6ab2fc3'
    },
    'statusHistory': [
      {
        'deliveryStatus': 'dispatched',
        'statusUpdate': '2021-11-17T22:39:10+02:00'
      },
      {
        'deliveryStatus': 'ordered',
        'statusUpdate': '2021-11-16T22:39:10+02:00'
      }
    ],
    'description': 'Your package from the ASE department store.'
  },
  {
    'id': '59f51c1b-6517-55fe-8759-dd98a217e4ca',
    'trackingNumber': '9f372419-e6a0-5f0f-8b2c-7e3df965d519',
    'dispatcher': {
      'name': 'Louise Fox',
      'id': 'd6ef20a6-61e5-577b-a8a2-209ccd3dda2e'
    },
    'box': {
      'name': 'Clifford Hampton',
      'id': 'b056f0a0-3260-5c99-ab31-c7ad7110c63e',
    },
    'deliverer': {
      'name': 'Cristiano Ronaldo',
      'id': '025bda9f-2607-5c4d-9d99-c4ecbc889d44b'
    },
    'customer': {
      'name': 'Bill Gates',
      'id': '75030a6-61e56-5c99-ab31-c7ad7110c63e'
    },
    'statusHistory': [
      {
        'deliveryStatus': 'collected',
        'statusUpdate': '2021-11-19T22:39:10+02:00'
      },
      {
        'deliveryStatus': 'delivered',
        'statusUpdate': '2021-11-18T22:39:10+02:00'
      },
      {
        'deliveryStatus': 'dispatched',
        'statusUpdate': '2021-11-17T22:39:10+02:00'
      },
      {
        'deliveryStatus': 'ordered',
        'statusUpdate': '2021-11-16T22:39:10+02:00'
      }
    ],
    'description': 'Your package from the ASE department store.'
  },
  {
    'id': '7a89b21e-6f0a-5298-808e-7ba8703248eb',
    'trackingNumber': '2ea766e9-1b8f-502f-821c-ad453066a417',
    'dispatcher': {
      'name': 'Nell Gardner',
      'id': 'dde08e3c-4f3d-5290-8445-7d5a24a52313'
    },
    'box': {
      'name': 'Alma Parks',
      'id': '5a683cce-2a40-5f6b-a699-9be2da296ec1',
    },
    'deliverer': {
      'name': 'Cristiano Ronaldo',
      'id': '025bda9f-2607-5c4d-9d99-c4ecbc889d44b'
    },
    'customer': {
      'name': 'Elon Musk',
      'id': '025bda9f-2a40-5f6b-a699-9be2da296ec1'
    },
    'statusHistory': [
      {
        'deliveryStatus': 'dispatched',
        'statusUpdate': '2021-11-17T22:39:10+02:00'
      },
      {
        'deliveryStatus': 'ordered',
        'statusUpdate': '2021-11-16T22:39:10+02:00'
      }
    ],
    'description': 'Your package from the ASE department store.'
  }
];

const DeliveriesOverview = () => {


  return (
    <Layout hasSidebar={true}>
      <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: '2em', display: 'flex', flexDirection: 'column' }}>
          <Title>Deliveries Overview</Title>
          <Deliveries deliverer={deliverer} deliveries={deliveriesOverview} />
        </Paper>
      </Container>
    </Layout>
  );
};

export default DeliveriesOverview;