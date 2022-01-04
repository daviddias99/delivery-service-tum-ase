import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Delivery } from 'types';

const TrackingInfo = ({ delivery }: { delivery: Delivery }) => {
  return (
    <section className="trackingInfo">
      <h4 className="sectionTitle">
        Tracking Info:
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
    </section>);
};

export default TrackingInfo;