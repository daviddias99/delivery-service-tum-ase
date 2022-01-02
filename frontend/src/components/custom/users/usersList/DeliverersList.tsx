import React, {useEffect, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {escapeRegExp, usersTableColumns} from 'components/custom/users/usersList/common/helper';
import {useDispatch, useSelector} from 'react-redux';
import Delete from './common/Delete';
import {TextField} from '@mui/material';
import {User} from '../../../../types';
import {
  deliverersList,
  selectedDeliverersList, updateDeliverers,
  updateSelctedDeliveres
} from 'redux/slices/users/delivererSlice';








const DeliverersList = () => {
  const [pageSize, setPageSize] = useState(10);
  const [searchInput, setSearchInput] = useState('');
  const list = useSelector(deliverersList);
  const [showList, setShowList] = useState(list);
  const dispatch = useDispatch();
  const selectedList = useSelector(selectedDeliverersList);
  const selectionModel = ((selectedDeliverersList: User[]) => {
    const selectedIds: any[] =[];
    selectedDeliverersList.forEach(element => {
      selectedIds.push(element.id);
    });
    return selectedIds;
  }
  );

  const contains = (element:any) => {
    const searchRegex = new RegExp(escapeRegExp(searchInput), 'i');
    return Object.keys(element).some((field: any) => {
      return searchRegex.test(element[field].toString());
    });
  };

  const searchChanged = (e: any) => {
    setSearchInput(e);
  };

  useEffect(() => {
    const displayCopy = [...list];
    const newDisplay = displayCopy.filter(contains);
    setShowList(newDisplay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  useEffect(() => {
    console.log('list Changed');
    setShowList(list);
    setSearchInput('');
  }, [list]);

  return (
    <div>
      <Delete selector={deliverersList} selectedSelector={selectedDeliverersList} updateSelected={updateSelctedDeliveres} update={updateDeliverers}></Delete>
      <div style={{width: '100%', textAlign: 'right', marginTop: '10px', marginBottom: '10px'}}>
        <TextField id="Search" label="Search" variant="outlined" sx={{width: '40%'}} value={searchInput} onChange={e => searchChanged(e.target.value)} />
      </div>
      <div id="boxes-list" >
        <DataGrid
          autoHeight={true}
          pageSize={pageSize}
          className={'myDataTable'}
          onPageSizeChange={setPageSize}
          rowsPerPageOptions={[5, 10, 15]}
          columns={usersTableColumns}
          rows={showList}
          hideFooterSelectedRowCount={true}
          checkboxSelection
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRows = list.filter((row:any) =>
              selectedIDs.has(row.id),
            );
            dispatch(updateSelctedDeliveres(selectedRows));
          }}
          selectionModel={selectionModel(selectedList)}
          disableSelectionOnClick
        />
      </div>
    </div>
  );
};

export default DeliverersList;