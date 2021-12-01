import * as React from 'react';
import Chip from '@mui/material/Chip';
import CurrentDeliveriesTable from './CurrentDeliveriesTable';
import PastDeliveriesTable from './PastDeliveriesTable';
import { Box, Delivery } from 'types';

import { getBoxStatusColor, toUpperCase } from 'utils';

import './styles.scss';
import EditBox from './boxManagement/EditBox';

type BoxProps = {
  box: Box,
  deliveries: Delivery[],
};

const BoxComponent = ({ box, deliveries }: BoxProps) => {

  return (
    <div id="box" >
      <h3 className="title">
        Box
        <span>
          {box.name}
        </span>
        <EditBox />
        <Chip className="boxStatus" size="small" label={toUpperCase(box.status)} color={getBoxStatusColor(box.status)} />
      </h3>
      <h6 className="subTitle">
        {box.id}
      </h6>

      <section className="address">
        <h4 className="sectionTitle">
          Address:
        </h4>

        <div className="addressFields">
          <p>
            {`${box.address.addressLine1}${box.address.addressLine2 && ', '}${box.address.addressLine2 ? box.address.addressLine2 : ''}`}
          </p>
          <p>
            {box.address.postalCode}
          </p>
          <p>
            {box.address.city}
          </p>
        </div>
      </section>

      <section className="currentStatus">
        <h4 className="sectionTitle">
          Status:
        </h4>

        <CurrentDeliveriesTable deliveries={deliveries} />

        <h4 className="sectionTitle">
          Past deliveries:
        </h4>

        <PastDeliveriesTable deliveries={deliveries} />

      </section >

    </div >
  );
};

export default BoxComponent;
