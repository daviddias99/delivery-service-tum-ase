import { Delivery } from 'types';

const deliveries: Delivery[] = [
  {
    id: '786b6c5d-bc5a-57db-9241-3cfe1fe86770', trackingCode: 'aa0973a7-312a-54db-b1d5-130ed474921c', dispatcher: { name: 'Chad Silva', id: '270e8b89-41a6-5751-b08c-b85ab1683b78' }, deliverer: { name: 'Hattie Hawkins', id: '025bda9f-2607-5c4d-9d99-c4ecbc889d44' }, customer: { name: 'Lou Wood', id: '7503e790-0f86-5e47-844c-433df6ab2fc3' }, statusHistory: [
      { status: 'dispatched', statusUpdate: '2021-11-17T22:39:10+02:00' },
      { status: 'ordered', statusUpdate: '2021-11-16T22:39:10+02:00' },
    ]
  },
  {
    id: 'fb5413fd-0774-54df-b3a2-e613fffe545c', trackingCode: '4ff0874f-a852-59b7-a363-1ddc2284c992', dispatcher: { name: 'Roxie Reynolds', id: 'af5a1c47-d89b-5a0f-bf72-fc32a8f24a54' }, deliverer: { name: 'Dustin Miles', id: 'ed07467d-1572-56cf-907b-c3ffae80a6ab' }, customer: { name: 'Josie Daniel', id: '723fc6ae-0854-532d-b559-a966e684094f' }, statusHistory: [
      { status: 'delivered', statusUpdate: '2021-11-18T22:39:10+02:00' },
      { status: 'dispatched', statusUpdate: '2021-11-17T22:39:10+02:00' },
      { status: 'ordered', statusUpdate: '2021-11-16T22:39:10+02:00' },
    ]
  },
  {
    id: '59f51c1b-6517-55fe-8759-dd98a217e4ca', trackingCode: '9f372419-e6a0-5f0f-8b2c-7e3df965d519', dispatcher: { name: 'Louise Fox', id: 'd6ef20a6-61e5-577b-a8a2-209ccd3dda2e' }, deliverer: { name: 'Richard Bowers', id: 'a88809b3-2508-5690-be0f-6b42d1a6853b' }, customer: { name: 'Brett Atkins', id: '154adb13-5e44-56c3-8d05-6d7fe8a7b753' }, statusHistory: [
      { status: 'collected', statusUpdate: '2021-11-19T22:39:10+02:00' },
      { status: 'delivered', statusUpdate: '2021-11-18T22:39:10+02:00' },
      { status: 'dispatched', statusUpdate: '2021-11-17T22:39:10+02:00' },
      { status: 'ordered', statusUpdate: '2021-11-16T22:39:10+02:00' },
    ]
  },
  {
    id: '7a89b21e-6f0a-5298-808e-7ba8703248eb', trackingCode: '2ea766e9-1b8f-502f-821c-ad453066a417', dispatcher: { name: 'Nell Gardner', id: 'dde08e3c-4f3d-5290-8445-7d5a24a52313' }, deliverer: { name: 'Ryan Quinn', id: '523c4671-2cc9-5f16-9ef5-7fe6289958cb' }, customer: { name: 'Annie Pope', id: '060d13ca-4a11-50cc-bd25-d73cb0880ec7' }, statusHistory: [
      { status: 'dispatched', statusUpdate: '2021-11-17T22:39:10+02:00' },
      { status: 'ordered', statusUpdate: '2021-11-16T22:39:10+02:00' },
    ]
  },
  {
    id: '0c0c869c-2992-55bb-bb95-68b89ab91aab', trackingCode: 'b57af4b5-7db3-587d-a2be-896b18eef242', dispatcher: { name: 'Mike Strickland', id: '6aad13d6-5dbf-5c41-a1c0-64eb7e34790a' }, deliverer: { name: 'Aiden Weber', id: 'fff7c604-7eaf-5dc7-af03-37f871dafa60' }, customer: { name: 'Julia Ray', id: '5fe5516e-9baa-5ecc-92ff-9048baf2ae2f' }, statusHistory: [{ status: 'ordered', statusUpdate: '2021-11-16T22:39:10+02:00' }]
  },
  { id: 'cd8767af-8944-5922-badd-118eca82327c', trackingCode: 'e108be0b-0eb7-560b-aa03-7f9e821db72a', dispatcher: { name: 'Miguel Meyer', id: 'c13924b9-11b4-5a36-b546-c81295283be9' }, deliverer: { name: 'Nell Fleming', id: 'f2c55f4b-9bc6-5c75-9c93-704125773fa1' }, customer: { name: 'Albert Wallace', id: 'cc2748d2-295f-58b9-a1a9-50630be81c5b' }, statusHistory: [{ status: 'collected', statusUpdate: '2021-03-18T03:39:55+01:00' }] },
  { id: '56ac63a1-5b93-5cf4-9654-9b27ac84ce2c', trackingCode: '69b62242-0c78-5470-9701-929b79fc1a79', dispatcher: { name: 'Dollie Lambert', id: '0ffcd346-728d-57d1-81fc-478ef6810317' }, deliverer: { name: 'Mary Rivera', id: '93ef5641-1666-53c4-86f2-ac9c1a11ca19' }, customer: { name: 'Ella Harvey', id: '9c49b2a7-4559-5f53-8576-8818695d54c5' }, statusHistory: [{ status: 'collected', statusUpdate: '2021-09-02T02:33:46+02:00' }] },
  { id: 'f146284d-60dd-5a9b-883e-431a70f831be', trackingCode: '934f3bc0-0661-5dea-8062-c890439f96d4', dispatcher: { name: 'Richard Vasquez', id: 'e0638f11-1ce0-5aad-ac53-53889ebf7e02' }, deliverer: { name: 'Ethel Marshall', id: '3113d619-839d-566d-b507-a5a64b102de3' }, customer: { name: 'Charles Robinson', id: '34781802-e3f9-58ac-ade3-f4120ccd00e8' }, statusHistory: [{ status: 'collected', statusUpdate: '2021-11-23T03:38:00+01:00' }] },
  { id: '04cf6adf-4c17-542c-aa57-34cd7659bf4d', trackingCode: '0e50ac2b-434f-5911-bd3e-68169620fd18', dispatcher: { name: 'Jesse Hardy', id: '0ba90377-b46f-5b7b-8c8a-4416f733bccc' }, deliverer: { name: 'Isabelle Douglas', id: 'e202bd04-aff0-54a9-91c3-dd4ffd8ef123' }, customer: { name: 'Sallie Beck', id: '847a22dd-bf72-55a8-91a9-cc4e71008c8f' }, statusHistory: [{ status: 'collected', statusUpdate: '2021-08-25T02:58:56+02:00' }] },
  { id: 'c6b7563b-e38c-5f4d-8b18-381f1f07c1c4', trackingCode: '347da1ec-c49d-5573-8e9d-fb8b3256834b', dispatcher: { name: 'Mitchell Larson', id: '0218e48f-4117-5c58-a7c3-e9e264b53af8' }, deliverer: { name: 'Elnora Long', id: 'd0449dd5-c6ea-55d5-921b-ae7ffd2cd02b' }, customer: { name: 'Wesley Roy', id: 'eb7989ef-25d1-5947-891d-9bcef90287fe' }, statusHistory: [{ status: 'collected', statusUpdate: '2021-03-29T11:15:34+02:00' }] },
  { id: '9e7ddcf8-6e69-5e77-8cc4-a160185c8b33', trackingCode: '7af2fb7c-cff2-5460-a6ae-0d2b885ee4e3', dispatcher: { name: 'Timothy Webb', id: 'aa586ed8-f5e2-50ea-bd43-bf9ea34af09a' }, deliverer: { name: 'Henrietta Moody', id: 'dcf6338f-e296-533c-bae3-d2b74b40f55a' }, customer: { name: 'Bill Keller', id: '97a9d32a-7391-5fe1-b452-0482c1132df5' }, statusHistory: [{ status: 'collected', statusUpdate: '2021-11-21T18:27:18+01:00' }] },
];

export default deliveries;