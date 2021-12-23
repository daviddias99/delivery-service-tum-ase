import { Divider } from '@mui/material';
import React from 'react';
import { CurrentDeliveriesTable, PastDeliveriesTable } from 'components/common/DeliveriesTable/DeliveriesTable';
import './styles.scss';
import { useSelector } from 'react-redux';
import { userDeliveries, userInfo } from 'redux/slices/user/userSlice';

const Orders = () => {

  const customer = useSelector(userInfo);
  const deliveries = useSelector(userDeliveries);

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
          {`${customer.firstName} ${customer.surname}`}
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

