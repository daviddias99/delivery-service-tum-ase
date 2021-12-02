import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Delivery } from 'types';

import { currentDeliveriesTableColumns } from '../helper';
import { dateSortDsc } from 'utils';
import './styles.scss';

type Props = {
  deliveries: Delivery[],
};

const CurrentDeliveriesTable = ({ deliveries }: Props) => {

  const sortModel: any = [
    {
      field: 'dateUpdated',
      sort: 'desc',
    }
  ];

  return (
    <div className="currentDeliveries">
      <DataGrid
        className="myDataTable"
        hideFooter={true}
        autoHeight={true}
        sortModel={sortModel}
        rowsPerPageOptions={[5, 10, 15]}
        columns={currentDeliveriesTableColumns}
        rows={deliveries
          .filter((delivery: Delivery) => delivery.statusHistory[0] && delivery.statusHistory[0].status !== 'collected')
          .sort(
            (del1: Delivery, del2: Delivery) => dateSortDsc(new Date(del1.statusHistory[0].statusUpdate), new Date(del2.statusHistory[0].statusUpdate))
          )
        }
        hideFooterSelectedRowCount={true}
      />
    </div>
  );
};

export default CurrentDeliveriesTable;
