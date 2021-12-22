import * as React from 'react';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import { Box } from 'types';

import { boxesTableColumns } from './helper';

import './styles.scss';
import { useSelector, useDispatch } from 'react-redux';


import { updateSelectedBox, boxesList, selectedBoxes } from 'redux/slices/box/boxesSlice';


const BoxesList = () => {

  const [pageSize, setPageSize] = useState(10);
  const list = useSelector(boxesList);
  const selectedList = useSelector(selectedBoxes);
  const selectionModel = ((selectedBoxList: Box[]) => {
    const selectedIds: any[] =[];
    selectedBoxList.forEach(element => {
      selectedIds.push(element.id);
    });
    return selectedIds;
  }
  );
  const dispatch = useDispatch();
  return (
    <div id="boxes-list" >
      <DataGrid
        autoHeight={true}
        pageSize={pageSize}
        className={'myDataTable'}
        onPageSizeChange={setPageSize}
        rowsPerPageOptions={[5, 10, 15]}
        columns={boxesTableColumns}
        rows={list}
        hideFooterSelectedRowCount={true}
        checkboxSelection
        isRowSelectable={(row) => row.row.status === 'free'}
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
