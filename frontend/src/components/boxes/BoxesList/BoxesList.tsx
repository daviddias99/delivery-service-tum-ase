import * as React from 'react';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import { Box } from 'types';

import { boxesTableColumns } from './helper';

import './styles.scss';
import { useSelector, useDispatch } from 'react-redux';


import { updateSelectedBox, boxesList, selectedBoxes } from '../boxesSlice/BoxesSlice';


const BoxesList = () => {

  const [pageSize, setPageSize] = useState(10);
  const list = useSelector(boxesList);
  const selectedList = useSelector(selectedBoxes);
  const selectionModel = ((selectedList: Box[]) => {
    const list: any[] =[];
    selectedList.forEach(element => {
      list.push(element.id);
    });
    return list;
  }
  );
  const dispatch = useDispatch();
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
        }}
        selectionModel={selectionModel(selectedList)}
        disableSelectionOnClick
      />
    </div>
  );
};

export default BoxesList;
