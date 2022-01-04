import * as React from 'react';
import Chip from '@mui/material/Chip';
import { Delivery, Box, User } from 'types';
import { Grid } from '@mui/material';

import BoxAddress from 'components/common/BoxAddress/BoxAddress';
import DeliveryStatusStepper from '../DeliveryStatusStepper/DeliveryStatusStepper';

import { boxInfo, updateBox } from 'redux/slices/box/boxSlice';
import { deliveryInfo } from 'redux/slices/delivery/deliverySlice';
import { useSelector, useDispatch } from 'react-redux';

import { getDeliveryStatusColor, toUpperCase } from 'utils';

import './styles.scss';
import EditDelivery from '../deliveryManagement/EditDelivery';
import TrackingInfo from './TrackingInfo';
import { loggedUser } from 'redux/slices/loggedUser/loggedUserSlice';
import api from 'services/api';


const canSeeTrackingInfo = (user: User, delivery: Delivery) => {
  return user && (user.role === 'DISPATCHER' || (user.role === 'DELIVERER' && delivery.deliverer.id === user.id));
};

const DeliveryComponent = () => {

  const user: User = useSelector(loggedUser);
  const delivery: Delivery = useSelector(deliveryInfo);
  const [tagStatus, setTagStatus] = React.useState(delivery.statusHistory[0].deliveryStatus);
  const box: Box = useSelector(boxInfo);
  const dispatch = useDispatch();

  React.useEffect(
    () => {
      api.getBox(delivery.box.id, (result) => dispatch(updateBox(result.data)));
      setTagStatus(delivery.statusHistory[0].deliveryStatus);
    },
    [delivery, dispatch]);

  return (
    <div id="delivery" >
      <h3 className="title">
        Delivery
        <span>
          {delivery.id}
        </span>
        {user && user.role === 'DISPATCHER' && delivery.statusHistory[0].deliveryStatus === 'ordered' && <EditDelivery />}
        <Chip className="boxStatus" size="small" label={toUpperCase(tagStatus)} sx={{ backgroundColor: getDeliveryStatusColor(tagStatus) }} />
      </h3>
      <h6 className="subTitle">
        {`Tracking code: ${delivery.trackingNumber}`}
      </h6>

      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
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
              {canSeeTrackingInfo(user, delivery) && <TrackingInfo delivery={delivery} />}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} gridRow="span 2">
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
