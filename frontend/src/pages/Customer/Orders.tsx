import React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Title from 'components/common/Title/Title';
import Layout from 'components/common/Layout/Layout';
import {Customer, Delivery} from '../../types';
import Orders from 'components/Customer/Orders';
const customer: Customer ={
  id: '7503e790-0f86-5e47-844c-433df6ab2fc3',
  name: 'Lionel Messi',
  email: 'Lionel.messi@football.com',
  phoneNumber: '1234566789'
};

const deliveries: Delivery[]= [
  {
    id: '786b6c5d-bc5a-57db-9241-3cfe1fe86770', trackingCode: 'aa0973a7-312a-54db-b1d5-130ed474921c', dispatcher: { name: 'Chad Silva', id: '270e8b89-41a6-5751-b08c-b85ab1683b78' }, deliverer: { name: 'Hattie Hawkins', id: '025bda9f-2607-5c4d-9d99-c4ecbc889d44' }, customer: { name: 'Lionel Messi', id: '7503e790-0f86-5e47-844c-433df6ab2fc3' }, statusHistory: [
      { status: 'dispatched', statusUpdate: '2021-11-17T22:39:10+02:00' },
      { status: 'ordered', statusUpdate: '2021-11-16T22:39:10+02:00' },
    ]
  },
  {
    id: '59f51c1b-6517-55fe-8759-dd98a217e4ca', trackingCode: '9f372419-e6a0-5f0f-8b2c-7e3df965d519', dispatcher: { name: 'Louise Fox', id: 'd6ef20a6-61e5-577b-a8a2-209ccd3dda2e' }, deliverer: { name: 'Richard Bowers', id: 'a88809b3-2508-5690-be0f-6b42d1a6853b' }, customer: { name: 'Lionel Messi', id: '7503e790-0f86-5e47-844c-433df6ab2fc3' }, statusHistory: [
      { status: 'collected', statusUpdate: '2021-11-19T22:39:10+02:00' },
      { status: 'delivered', statusUpdate: '2021-11-18T22:39:10+02:00' },
      { status: 'dispatched', statusUpdate: '2021-11-17T22:39:10+02:00' },
      { status: 'ordered', statusUpdate: '2021-11-16T22:39:10+02:00' },
    ]
  },
  {
    id: '7a89b21e-6f0a-5298-808e-7ba8703248eb', trackingCode: '2ea766e9-1b8f-502f-821c-ad453066a417', dispatcher: { name: 'Nell Gardner', id: 'dde08e3c-4f3d-5290-8445-7d5a24a52313' }, deliverer: { name: 'Ryan Quinn', id: '523c4671-2cc9-5f16-9ef5-7fe6289958cb' }, customer: { name: 'Lionel Messi', id: '7503e790-0f86-5e47-844c-433df6ab2fc3' }, statusHistory: [
      { status: 'dispatched', statusUpdate: '2021-11-17T22:39:10+02:00' },
      { status: 'ordered', statusUpdate: '2021-11-16T22:39:10+02:00' },
    ]
  },
];

const OrdersPage = () => {


  return (
    <Layout>
      <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: '2em', display: 'flex', flexDirection: 'column' }}>
          <Title>Orders Overview</Title>
          <Orders customer={customer} deliveries={deliveries} />
        </Paper>
      </Container>
    </Layout>
  );
};

export default OrdersPage;