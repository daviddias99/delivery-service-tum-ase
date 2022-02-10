import * as React from 'react';
import Chip from '@mui/material/Chip';
import { CurrentDeliveriesTable, PastDeliveriesTable } from 'components/common/DeliveriesTable/DeliveriesTable';
import { getBoxStatusColor, toUpperCase } from 'utils';

import './styles.scss';
import EditBox from './EditBox/EditBox';
import BoxAddress from 'components/common/BoxAddress/BoxAddress';
import { useSelector } from 'react-redux';
import { boxDeliveries, boxInfo } from 'redux/slices/box/boxSlice';
import {Box} from '../../../../types';

const BoxComponent = () => {
  const box: Box = useSelector(boxInfo);
  const deliveries = useSelector(boxDeliveries);
  return (
    <div id="box" >
      <h3 className="title">
        Box
        <span>
          {box.name}
        </span>
        <EditBox initialData={{
          name: box.name,
          co: box.address.addressLine2,
          address: box.address.addressLine1,
          city: box.address.city,
          postalCode: box.address.postalCode,
          status: box.status,
          id: box.id,
          raspberryId: box.raspberryId,
        }}
        />
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

        <CurrentDeliveriesTable deliveries={deliveries} showBox={false} />

        <h4 className="sectionTitle">
          Past deliveries:
        </h4>

        <PastDeliveriesTable deliveries={deliveries} showBox={false} />

      </section >

    </div >
  );
};

export default BoxComponent;
