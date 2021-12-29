import { createSlice } from '@reduxjs/toolkit';
const dispatcherList = [
  {
    'id': 1,
    'userName': 'alechmere0',
    'firstName': 'Angelina',
    'surname': 'Lechmere',
    'email': 'alechmere0@tinyurl.com'
  }, {
    'id': 2,
    'userName': 'jstanyard1',
    'firstName': 'Juliana',
    'surname': 'Stanyard',
    'email': 'jstanyard1@pinterest.com'
  }, {
    'id': 3,
    'userName': 'cmcdougald2',
    'firstName': 'Claresta',
    'surname': 'McDougald',
    'email': 'cmcdougald2@ft.com'
  }, {
    'id': 4,
    'userName': 'kpashen3',
    'firstName': 'Kylynn',
    'surname': 'Pashen',
    'email': 'kpashen3@narod.ru'
  }, {
    'id': 5,
    'userName': 'rearles4',
    'firstName': 'Rossy',
    'surname': 'Earles',
    'email': 'rearles4@marriott.com'
  }, {
    'id': 6,
    'userName': 'aeyckel5',
    'firstName': 'Ardeen',
    'surname': 'Eyckel',
    'email': 'aeyckel5@geocities.com'
  }, {
    'id': 7,
    'userName': 'zstandring6',
    'firstName': 'Zia',
    'surname': 'Standring',
    'email': 'zstandring6@artisteer.com'
  }, {
    'id': 8,
    'userName': 'lroadnight7',
    'firstName': 'Lydon',
    'surname': 'Roadnight',
    'email': 'lroadnight7@theglobeandmail.com'
  }, {
    'id': 9,
    'userName': 'gmerrington8',
    'firstName': 'Gabe',
    'surname': 'Merrington',
    'email': 'gmerrington8@si.edu'
  }, {
    'id': 10,
    'userName': 'dovendale9',
    'firstName': 'Davon',
    'surname': 'Ovendale',
    'email': 'dovendale9@nih.gov'
  }
];
const initialState = {
  dispatchers: dispatcherList,
  selectedDispatchers: []
};

export const dipatchersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    updateDispatchers: (state, action) => {
      state.dispatchers = action.payload;
    },
    updateSelectedDispatchers: (state, action) => {
      state.selectedDispatchers= action.payload;
    }

  },
});

export const { updateDispatchers, updateSelectedDispatchers } = dipatchersSlice.actions;
export const dispatchersList = (state: any) => state.dispatchers.dispatchers;
export const selectedDispatchersList = (state: any) => state.dispatchers.selectedDispatchers;
export default dipatchersSlice.reducer;