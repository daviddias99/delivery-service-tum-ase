import * as React from 'react';
import { DataGrid, GridSortModel } from '@mui/x-data-grid';
import { pastDeliveriesTableColumns, currentDeliveriesTableColumns } from './helper';
import { Delivery } from 'types';
import { dateSortDsc } from 'utils';

type Props = {
  rows: any[],
  columns: any[],
  showPagination: boolean,
};

const DeliveriesTable = ({ rows, columns, showPagination }: Props) => {
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [sortModel, setSortModel] = React.useState<GridSortModel>([
    {
      field: 'dateUpdated',
      sort: 'desc',
    }
  ]);

  return (
    <div className="currentDeliveries">
      <DataGrid
        className="myDataTable"
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
        hideFooter={!showPagination}
        autoHeight={true}
        sortModel={sortModel}
        onSortModelChange={(model) => setSortModel(model)}
        rowsPerPageOptions={[5, 10, 15]}
        columns={columns}
        rows={rows}
        hideFooterSelectedRowCount={true}
      />
    </div>
  );
};


type DeliveryTableProps = {
  deliveries: Delivery[],
  showBox: boolean,
  showPagination?: boolean,
};

const AllDeliveriesTable = ({ deliveries, showBox, showPagination = true }: DeliveryTableProps) => {
  return (
    <DeliveriesTable
      rows={deliveries.slice().sort(
        (del1: Delivery, del2: Delivery) => dateSortDsc(new Date(del1.statusHistory[0].statusUpdate), new Date(del2.statusHistory[0].statusUpdate))
      )}
      columns={currentDeliveriesTableColumns(showBox)}
      showPagination={showPagination}
    />
  );
};

const PastDeliveriesTable = ({ deliveries, showBox, showPagination = true }: DeliveryTableProps) => {
  return (
    <DeliveriesTable
      rows={deliveries.filter((delivery: Delivery) => delivery.statusHistory[0] && delivery.statusHistory[0].deliveryStatus === 'collected')}
      columns={pastDeliveriesTableColumns(showBox)}
      showPagination={showPagination}
    />
  );
};

const CurrentDeliveriesTable = ({ deliveries, showBox, showPagination = false }: DeliveryTableProps) => {
  return (
    <DeliveriesTable
      rows={deliveries
        .filter((delivery: Delivery) => delivery.statusHistory[0] && delivery.statusHistory[0].deliveryStatus !== 'collected')
        .sort(
          (del1: Delivery, del2: Delivery) => dateSortDsc(new Date(del1.statusHistory[0].statusUpdate), new Date(del2.statusHistory[0].statusUpdate))
        )}
      columns={currentDeliveriesTableColumns(showBox)}
      showPagination={showPagination}
    />
  );
};

export { AllDeliveriesTable, PastDeliveriesTable, CurrentDeliveriesTable };
