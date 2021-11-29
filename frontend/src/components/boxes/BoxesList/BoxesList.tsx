import * as React from 'react';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import { Box } from 'types';

import { boxesTableColumns } from './helper';

import './styles.scss';
import { useSelector, useDispatch } from 'react-redux';


import {updateBox, updateSelectedBox, boxesList} from '../boxesSlice/BoxesSlice';

export type BoxesListProps = {
  boxes: Box[]
};

const BoxesList = ({ boxes }: BoxesListProps) => {

  const [pageSize, setPageSize] = useState(10);
  const list = useSelector(boxesList);
  const dispatch = useDispatch();
  const [selectedRows, setSelectedRows] = React.useState([]);

  // @ts-ignore
  return (
    <div id="boxes-list" >
      <DataGrid
        autoHeight={true}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
        rowsPerPageOptions={[5, 10, 15]}
        columns={boxesTableColumns}
        rows={list}
        hideFooterSelectedRowCount={true}
        checkboxSelection
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRows = list.filter((row:any) =>
            selectedIDs.has(row.id),
          );
          dispatch(updateSelectedBox(selectedRows));
          setSelectedRows(selectedRows);
        }}
        disableSelectionOnClick
      />
    </div>
  );
};

export default BoxesList;
