import * as React from 'react';
import Chip from '@mui/material/Chip';
import CurrentDeliveriesTable from 'components/common/DeliveriesTable/CurrentDeliveriesTable/CurrentDeliveriesTable';
import PastDeliveriesTable from 'components/common/DeliveriesTable/PastDeliveriesTable/PastDeliveriesTable';
import { Box, Delivery } from 'types';

import { getBoxStatusColor, toUpperCase } from 'utils';

import './styles.scss';
import EditBox from './EditBox/EditBox';
import BoxAddress from 'components/common/BoxAddress/BoxAddress';

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

      <h4 className="sectionTitle">
        Address:
      </h4>

      <BoxAddress address={box.address} />

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
