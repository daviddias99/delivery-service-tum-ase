import * as React from 'react';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import { Box } from 'types';

import { boxesTableColumns } from './helper';

import './styles.scss';


type BoxesListProps = {
  boxes: Box[]
};

const BoxesList = ({ boxes }: BoxesListProps) => {

  const [pageSize, setPageSize] = useState(10);

  return (
    <div id="boxes-list" >
      <DataGrid
        autoHeight={true}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
        rowsPerPageOptions={[5, 10, 15]}
        columns={boxesTableColumns}
        rows={boxes}
        hideFooterSelectedRowCount={true}
      />
    </div>
  );
};

export default BoxesList;
