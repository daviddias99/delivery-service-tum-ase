const usersTableColumns = [
  { field: 'id', headerName: 'ID', width: 90, flex: 0.4 },
  {
    field: 'userName',
    headerName: 'User Name',
    flex: 0.5,
  },
  {
    field: 'firstName',
    headerName: 'First Name',
    flex: 0.5,
  },
  {
    field: 'surname',
    headerName: 'Surname',
    flex: 0.5,
  },
  {
    field: 'email',
    headerName: 'email',
    flex: 0.5,
  },

];
function escapeRegExp(value: string): string {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}



export {usersTableColumns, escapeRegExp};