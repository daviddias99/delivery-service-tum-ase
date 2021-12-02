import {createSlice } from '@reduxjs/toolkit';
import {Box, Delivery} from 'types';

// TODO: delete
const box: Box = {
  id: 'bfZPwGdetxUlGgpb',
  name: 'Allen Blair',
  address: {
    addressLine1: '1752 Onhop Pike',
    addressLine2: '7',
    city: 'Jopnifes',
    postalCode: '5352-457'
  },
  status: 'active'
};

const deliveries: Delivery[] = [
  { id: '786b6c5d-bc5a-57db-9241-3cfe1fe86770', deliverer: { name: 'Hattie Hawkins', id: '025bda9f-2607-5c4d-9d99-c4ecbc889d44' }, customer: { name: 'Lou Wood', id: '7503e790-0f86-5e47-844c-433df6ab2fc3' }, status: 'ordered', statusUpdate: '2021-11-17T03:48:21+01:00' },
  { id: 'fb5413fd-0774-54df-b3a2-e613fffe545c', deliverer: { name: 'Dustin Miles', id: 'ed07467d-1572-56cf-907b-c3ffae80a6ab' }, customer: { name: 'Josie Daniel', id: '723fc6ae-0854-532d-b559-a966e684094f' }, status: 'dispatched', statusUpdate: '2021-11-16T15:49:25+02:00' },
  { id: '59f51c1b-6517-55fe-8759-dd98a217e4ca', deliverer: { name: 'Richard Bowers', id: 'a88809b3-2508-5690-be0f-6b42d1a6853b' }, customer: { name: 'Brett Atkins', id: '154adb13-5e44-56c3-8d05-6d7fe8a7b753' }, status: 'delivered', statusUpdate: '2021-11-16T22:39:10+02:00' },
  { id: '7a89b21e-6f0a-5298-808e-7ba8703248eb', deliverer: { name: 'Ryan Quinn', id: '523c4671-2cc9-5f16-9ef5-7fe6289958cb' }, customer: { name: 'Annie Pope', id: '060d13ca-4a11-50cc-bd25-d73cb0880ec7' }, status: 'dispatched', statusUpdate: '2021-11-18T11:02:59+02:00' },
  { id: '0c0c869c-2992-55bb-bb95-68b89ab91aab', deliverer: { name: 'Aiden Weber', id: 'fff7c604-7eaf-5dc7-af03-37f871dafa60' }, customer: { name: 'Julia Ray', id: '5fe5516e-9baa-5ecc-92ff-9048baf2ae2f' }, status: 'collected', statusUpdate: '2021-05-02T16:08:43+02:00' },
  { id: 'cd8767af-8944-5922-badd-118eca82327c', deliverer: { name: 'Nell Fleming', id: 'f2c55f4b-9bc6-5c75-9c93-704125773fa1' }, customer: { name: 'Albert Wallace', id: 'cc2748d2-295f-58b9-a1a9-50630be81c5b' }, status: 'collected', statusUpdate: '2021-03-18T03:39:55+01:00' },
  { id: '56ac63a1-5b93-5cf4-9654-9b27ac84ce2c', deliverer: { name: 'Mary Rivera', id: '93ef5641-1666-53c4-86f2-ac9c1a11ca19' }, customer: { name: 'Ella Harvey', id: '9c49b2a7-4559-5f53-8576-8818695d54c5' }, status: 'collected', statusUpdate: '2021-09-02T02:33:46+02:00' },
  { id: 'f146284d-60dd-5a9b-883e-431a70f831be', deliverer: { name: 'Ethel Marshall', id: '3113d619-839d-566d-b507-a5a64b102de3' }, customer: { name: 'Charles Robinson', id: '34781802-e3f9-58ac-ade3-f4120ccd00e8' }, status: 'collected', statusUpdate: '2021-11-23T03:38:00+01:00' },
  { id: '04cf6adf-4c17-542c-aa57-34cd7659bf4d', deliverer: { name: 'Isabelle Douglas', id: 'e202bd04-aff0-54a9-91c3-dd4ffd8ef123' }, customer: { name: 'Sallie Beck', id: '847a22dd-bf72-55a8-91a9-cc4e71008c8f' }, status: 'collected', statusUpdate: '2021-08-25T02:58:56+02:00' },
  { id: 'c6b7563b-e38c-5f4d-8b18-381f1f07c1c4', deliverer: { name: 'Elnora Long', id: 'd0449dd5-c6ea-55d5-921b-ae7ffd2cd02b' }, customer: { name: 'Wesley Roy', id: 'eb7989ef-25d1-5947-891d-9bcef90287fe' }, status: 'collected', statusUpdate: '2021-03-29T11:15:34+02:00' },
  { id: '9e7ddcf8-6e69-5e77-8cc4-a160185c8b33', deliverer: { name: 'Henrietta Moody', id: 'dcf6338f-e296-533c-bae3-d2b74b40f55a' }, customer: { name: 'Bill Keller', id: '97a9d32a-7391-5fe1-b452-0482c1132df5' }, status: 'collected', statusUpdate: '2021-11-21T18:27:18+01:00' },
];

const initialState = {
  boxInfo: box,
  deliveries: deliveries,
};

export const boxSlice = createSlice({
  name: 'box',
  initialState,
  reducers: {
    updateBox: (state, action) => {
      state.boxInfo = action.payload;
    },

  },
});

export const {updateBox} = boxSlice.actions;
export const boxInfo = (state:any) => state.box.boxInfo;
export const boxDeliveries = (state: any) => state.box.deliveries;

export default boxSlice.reducer;