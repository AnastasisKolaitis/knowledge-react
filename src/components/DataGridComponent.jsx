import { LinearProgress, Stack } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

const DataGridComponent = ({columns = [], rows = [], loading = false, noRowsText = 'Δεν βρέθηκαν εγγραφές'}) => {
  return (
    <>
      <DataGrid
        rowSelection={false}
        columns={columns}
        rows={rows}
        loading={loading}
        getRowId={(row) => row?.id}
        getRowHeight={() => 'auto'}
        autoHeight
        headerHeight={50}
        disableColumnMenu
        sx={{
          width: '100%',
          '& .MuiDataGrid-cell': {
            py: 1,
            alignContent: 'center'
          },
          '& .MuiDataGrid-virtualScrollerContent': {
            backgroundColor: 'white',
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: 'white'
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold'
          },
          '& .MuiDataGrid-columnSeparator': {
            display: 'none'
          }
        }}
        slots={{
          loadingOverlay: LinearProgress,
          noRowsOverlay: () => (
            <Stack
              height='100%'
              alignItems='center'
              justifyContent='center'
            >
              {noRowsText}
            </Stack>
          )
        }}
      />
    </>
  )
}

export default DataGridComponent