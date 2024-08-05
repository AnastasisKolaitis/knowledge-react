import { Add, Delete, Info } from '@mui/icons-material';
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip } from '@mui/material';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import DataGridComponent from '../components/DataGridComponent';
import PageTitle from '../components/PageTitle';

const Schools = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleClickOpen = (id) => setOpen(id);

  const handleClose = () => setOpen(false);

  const deleteSchool = async () => {
    setError();
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND}/schools/${open}`);
      enqueueSnackbar({message: 'Επιτυχής Διαγραφή του σχολείου', variant: 'success'});
      fetchSchools();
    } catch (error) {
      console.error(error);
      enqueueSnackbar({message: 'Η διαγραφή του σχολείου απέτυχε!', variant: 'error'});
      setError(error.response.data.message)
    } finally {
      handleClose();
    }
  }
  const fetchSchools = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND}/schools`);
      setSchools(response.data);
    } catch (error) {
      console.error(error);
      enqueueSnackbar({message: 'Κάτι πήγε λάθος!', variant: 'error'});
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchSchools()
  }, []);

  const columns = [
    {
      field: 'id',
      sortable: true,
      minWidth: 100,
      flex: 0.5,
      headerName: 'id'
    },
    {
      field: 'schoolName',
      sortable: true,
      minWidth: 100,
      flex: 1,
      headerName: 'Όνομα Σχολείου'
    },
    {
      field: 'management', 
      headerName: '', 
      minWidth: 100,
      flex: 0.25, 
      sortable: false,
      renderCell: ({row}) => <Box display='flex' gap={1}>
        <Tooltip title='Προβολή Σχολείου'>
          <IconButton onClick={() => navigate(`/schools/${row.id}`)}>
            <Info color='info'/>
          </IconButton>
        </Tooltip>
        <Tooltip title='Διαγραφή Σχολείου'>
          <IconButton onClick={() => handleClickOpen(row.id)}>
            <Delete color='error'/>
          </IconButton>
        </Tooltip>
      </Box>,
    },
    
  ]
  return (
    <>
      <PageTitle title='Αναζήτηση Σχολείων' />
      <Button variant='contained' endIcon={<Add />} sx={{ textTransform: "none", mb: 2 }} onClick={() => navigate('new')}>
        Δημιουργία Σχολείου
      </Button>
      {error && <Alert color='error' severity='error' sx={{ mb: 2 }}>
        {error}
      </Alert>}
      <DataGridComponent columns={columns} rows={schools} loading={loading} noRowsText='Δεν υπάρχουν Σχολεία' />
      <Dialog
        open={!!open}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">
          Διαγραφή Σχολείου
        </DialogTitle>
        <DialogContent>
          <DialogContentText
           id="alert-dialog-description">
            Είστε σίγουρος ότι θέλετε να διαγράψετε τον συγκεκριμένο σχολείο;
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Όχι</Button>
          <Button onClick={deleteSchool} autoFocus>Ναι</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Schools