import { currentDeliveriesTableColumns } from './helper';
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Delivery } from 'types';


import './styles.scss';
import { dateSortDsc } from 'utils';

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
        hideFooter={true}
        autoHeight={true}
        sortModel={sortModel}
        rowsPerPageOptions={[5, 10, 15]}
        columns={currentDeliveriesTableColumns}
        rows={deliveries
          .filter((delivery: Delivery) => delivery.status !== 'collected')
          .sort(
            (del1: Delivery, del2: Delivery) => dateSortDsc(new Date(del1.statusUpdate), new Date(del2.statusUpdate))
          )
        }
        hideFooterSelectedRowCount={true}
      />
    </div>
  );
};

export default CurrentDeliveriesTable;
