import { Divider } from '@mui/material';
import React from 'react';
import { CurrentDeliveriesTable, PastDeliveriesTable } from 'components/common/DeliveriesTable/DeliveriesTable';
import { useSelector } from 'react-redux';
import { userDeliveries, userInfo } from 'redux/slices/user/userSlice';
import './styles.scss';


const Deliveries = () => {

  const deliverer = useSelector(userInfo);
  const deliveries = useSelector(userDeliveries);

  return (
    <div id="deliverer">
      <div id="delivererInfo">
        <h3 className="subTitle">
          Deliverer Information:
        </h3>
        <p>
          <b className="infoTag">Id: </b>
          {' '}
          {deliverer.id}
        </p>
        <p>
          <b className="infoTag">Name: </b>
          {' '}
          {`${deliverer.firstName} ${deliverer.surname}`}
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

export default Deliveries;

