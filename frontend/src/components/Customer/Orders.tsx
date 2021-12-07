import { Divider } from '@mui/material';
import React from 'react';
import { Customer, Delivery } from 'types';
import { CurrentDeliveriesTable, PastDeliveriesTable } from 'components/common/DeliveriesTable/DeliveriesTable';
import './styles.scss';
type CustomerProps = {
  customer: Customer,
  deliveries: Delivery[]
}

const Orders = ({ customer, deliveries }: CustomerProps) => {
  return (
    <div id="customer">
      <div id="customerInfo">
        <h3 className="subTitle">
          Customer Information:
        </h3>
        <p>
          <b className="infoTag">Id: </b>
          {' '}
          {customer.id}
        </p>
        <p>
          <b className="infoTag">Name: </b>
          {' '}
          {customer.name}
        </p>
      </div>

      <Divider />
      <section className="currentStatus">
        <h4 className="sectionTitle">
          Active deliveries:
        </h4>

        <CurrentDeliveriesTable deliveries={deliveries} showBox={true} />

        <h4 className="sectionTitle">
          Past deliveries:
        </h4>

        <PastDeliveriesTable deliveries={deliveries} showBox={true} />

      </section >
    </div>
  );
};

export default Orders;

