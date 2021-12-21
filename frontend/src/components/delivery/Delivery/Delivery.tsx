import * as React from 'react';
import Chip from '@mui/material/Chip';
import { Delivery, Box } from 'types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Grid } from '@mui/material';

import BoxAddress from 'components/common/BoxAddress/BoxAddress';
import DeliveryStatusStepper from '../DeliveryStatusStepper/DeliveryStatusStepper';

import { boxInfo } from 'redux/slices/box/boxSlice';
import { deliveryInfo } from 'redux/slices/delivery/deliverySlice';
import { useSelector } from 'react-redux';

import { getDeliveryStatusColor, toUpperCase } from 'utils';

import './styles.scss';
import EditDelivery from '../deliveryManagement/EditDelivery';

const DeliveryComponent = () => {

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
        <EditDelivery />
        <Chip className="boxStatus" size="small" label={toUpperCase(latestStatus.deliveryStatus)} sx={{ backgroundColor: getDeliveryStatusColor(latestStatus.deliveryStatus) }} />
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
              <section className="trackingInfo">
                <h4 className="sectionTitle">
                  Tracking Info (REMOVE FOR CUSTOMER):
                </h4>

                <Table sx={{ width: '70%' }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
                      <TableCell style={{ fontWeight: 'bold' }}>ID</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell style={{ fontWeight: 'bold' }} component="th" scope="row">
                        Customer
                      </TableCell>
                      <TableCell >
                        <a href={`/customer/${delivery.customer.id}`}>
                          {delivery.customer.name}
                        </a>
                      </TableCell>
                      <TableCell >
                        <a href={`/customer/${delivery.customer.id}`}>
                          {delivery.customer.id}
                        </a>
                      </TableCell>
                    </TableRow>

                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell style={{ fontWeight: 'bold' }} component="th" scope="row">
                        Dispatcher
                      </TableCell>
                      <TableCell >
                        <a href={`/dispatcher/${delivery.dispatcher.id}`}>
                          {delivery.dispatcher.name}
                        </a>
                      </TableCell>
                      <TableCell >
                        <a href={`/dispatcher/${delivery.dispatcher.id}`}>
                          {delivery.dispatcher.id}
                        </a>
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell style={{ fontWeight: 'bold' }} variant="head" scope="row">
                        Deliverer
                      </TableCell>
                      <TableCell >
                        <a href={`/deliverer/${delivery.deliverer.id}`}>
                          {delivery.deliverer.name}
                        </a>
                      </TableCell>
                      <TableCell >
                        <a href={`/deliverer/${delivery.deliverer.id}`}>
                          {delivery.deliverer.id}
                        </a>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
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
