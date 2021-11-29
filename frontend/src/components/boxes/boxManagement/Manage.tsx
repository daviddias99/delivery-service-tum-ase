import * as React from 'react';
import AddBox from './AddBox';
import DeleteBox from './DeleteBox';


export const ManageBoxes = () => {

  return (
    <div style={{whiteSpace: 'nowrap'}}>
      <AddBox />
      <DeleteBox />
    </div>
  );

}
;


export default ManageBoxes;