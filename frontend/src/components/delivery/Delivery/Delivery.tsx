import * as React from 'react';
import Chip from '@mui/material/Chip';
import { Delivery, Box } from 'types';

import { getDeliveryStatusColor, toUpperCase } from 'utils';

import './styles.scss';
import BoxAddress from 'components/common/BoxAddress/BoxAddress';
import DeliveryStatusStepper from '../DeliveryStatusStepper/DeliveryStatusStepper';
import { Grid } from '@mui/material';

type DeliveryProps = {
  delivery: Delivery,
  box: Box,
};

const DeliveryComponent = ({ delivery, box }: DeliveryProps) => {

  const latestStatus = delivery.statusHistory[0];

  return (
    <div id="delivery" >
      <h3 className="title">
        Delivery
        <span>
          {delivery.id}
        </span>
        <Chip className="boxStatus" size="small" label={toUpperCase(latestStatus.status)} sx={{ backgroundColor: getDeliveryStatusColor(latestStatus.status) }} />
      </h3>
      <h6 className="subTitle">
        {`Tracking code: ${delivery.trackingCode}`}
      </h6>

      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={12}>
              <section className="details">
                <h4 className="sectionTitle">
                  Details:
                </h4>

                <p>Your package from the ASE department store.</p>
              </section>
            </Grid>
            <Grid item xs={12}>
              <section className="address">
                <h4 className="sectionTitle">
                  Assigned box:
                </h4>
                <p>
                  {box.name}
                </p>
                <BoxAddress address={box.address} />
              </section>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} gridRow="span 2">
          <section className="currentStatus">
            <h4 className="sectionTitle">
              Status:
            </h4>

            <DeliveryStatusStepper statusHistory={delivery.statusHistory} />
          </section >
        </Grid>
      </Grid>
    </div >
  );
};

export default DeliveryComponent;
