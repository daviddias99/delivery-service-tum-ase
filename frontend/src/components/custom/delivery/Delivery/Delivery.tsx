import * as React from 'react';
import Chip from '@mui/material/Chip';
import { Delivery, Box, User } from 'types';
import { Grid } from '@mui/material';

import BoxAddress from 'components/common/BoxAddress/BoxAddress';
import DeliveryStatusStepper from '../DeliveryStatusStepper/DeliveryStatusStepper';

import { boxInfo } from 'redux/slices/box/boxSlice';
import { deliveryInfo } from 'redux/slices/delivery/deliverySlice';
import { useSelector } from 'react-redux';

import { getDeliveryStatusColor, toUpperCase } from 'utils';

import './styles.scss';
import EditDelivery from '../deliveryManagement/EditDelivery';
import TrackingInfo from './TrackingInfo';
import { loggedUser } from 'redux/slices/loggedUser/loggedUserSlice';

const DeliveryComponent = () => {

  const user: User = useSelector(loggedUser);
  const delivery: Delivery = useSelector(deliveryInfo);
  const box: Box = useSelector(boxInfo);

  const latestStatus = delivery.statusHistory[0];

  return (
    <div id="delivery" >
      <h3 className="title">
        Delivery
        <span>
          {delivery.id}
        </span>
        {user && user.role === 'dispatcher' && delivery.statusHistory[0].deliveryStatus === 'ordered' && <EditDelivery />}
        <Chip className="boxStatus" size="small" label={toUpperCase(latestStatus.deliveryStatus)} sx={{ backgroundColor: getDeliveryStatusColor(latestStatus.deliveryStatus) }} />
      </h3>
      <h6 className="subTitle">
        {`Tracking code: ${delivery.trackingNumber}`}
      </h6>

      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={12}>
              <section className="details">
                <h4 className="sectionTitle">
                  Details:
                </h4>

                <p>
                  {delivery.description}
                </p>
              </section>
            </Grid>
            <Grid item xs={12}>
              <section className="address">
                <h4 className="sectionTitle">
                  Assigned box:
                </h4>
                <p>
                  <a href={`/box/${box.id}`}>
                    {box.name}
                  </a>
                </p>
                <BoxAddress address={box.address} />
              </section>
            </Grid>
            <Grid item xs={12}>
              {user && user.role !== 'customer' && <TrackingInfo delivery={delivery} />}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} gridRow="span 2">
          <section className="currentStatus">
            <h4 className="sectionTitle">
              Status:
            </h4>

            <DeliveryStatusStepper />
          </section >
        </Grid>
      </Grid>
    </div >
  );
};

export default DeliveryComponent;
