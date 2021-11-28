import * as React from 'react';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import Title from 'components/common/Title/Title';
import { Box } from 'types';

import { columns } from './helper';

import './styles.scss';


type BoxesListProps = {
  boxes: Box[]
};

const BoxesList = ({ boxes }: BoxesListProps) => {

  const [pageSize, setPageSize] = useState(10);

  return (
    <div id="boxes-list" >
      <Title>Boxes</Title>
      <DataGrid
        autoHeight={true}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
        rowsPerPageOptions={[5, 10, 15]}
        columns={columns}
        rows={boxes}
        hideFooterSelectedRowCount={true}
      />
    </div>
  );
};

export default BoxesList;
