import * as React from 'react';

import { CurrentDeliveriesTable, PastDeliveriesTable } from 'components/common/DeliveriesTable/DeliveriesTable';
import { Delivery } from 'types';

type DeliveriesListProps = {
  deliveries: Delivery[]
}

const DeliveriesList = ({ deliveries }: DeliveriesListProps) => {

  return (
    <div id="boxes-list" >
      <h4 className="sectionTitle">
        On going:
      </h4>

      <CurrentDeliveriesTable deliveries={deliveries} showBox={true} showPagination={true} />

      <h4 className="sectionTitle">
        Past deliveries:
      </h4>

      <PastDeliveriesTable deliveries={deliveries} showBox={true} />
    </div>
  );
};

export default DeliveriesList;
