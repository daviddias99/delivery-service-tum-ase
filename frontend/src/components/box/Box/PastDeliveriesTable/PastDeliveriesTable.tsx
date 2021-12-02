import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Delivery } from 'types';

import { pastDeliveriesTableColumns } from '../helper';
import './styles.scss';

type Props = {
  deliveries: Delivery[],
};

const PastDeliveriesTable = ({ deliveries }: Props) => {
  const [pageSize, setPageSize] = React.useState(10);

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
        autoHeight={true}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
        rowsPerPageOptions={[5, 10, 15]}
        columns={pastDeliveriesTableColumns}
        rows={deliveries.filter((delivery: Delivery) => delivery.statusHistory[0] && delivery.statusHistory[0].status === 'collected')}
        hideFooterSelectedRowCount={true}
        sortModel={sortModel}
      />
    </div>
  );
};

export default PastDeliveriesTable;
