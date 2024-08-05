import { Add, Delete, Info } from "@mui/icons-material";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import DataGridComponent from "../components/DataGridComponent";
import PageTitle from "../components/PageTitle";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleClickOpen = (id) => setOpen(id);

  const handleClose = () => setOpen(false);

  const deleteStudent = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND}/students/${open}`);
      enqueueSnackbar({message: 'Επιτυχής Διαγραφή του μαθητή', variant: 'success'});
      fetchStudents();
    } catch (error) {
      console.error(error);
      enqueueSnackbar({message: 'Η διαγραφή του μαθητή απέτυχε!', variant: 'error'});
    } finally {
      handleClose();
    }
  }

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND}/students`);
      setStudents(response.data);
    } catch (error) {
      console.error(error);
      enqueueSnackbar({message: 'Κάτι πήγε λάθος!', variant: 'error'});
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchStudents()
  }, []);

  const columns = [
    {
      field: 'id',
      sortable: true,
      flex: 0.5,
      minWidth: 100,
      headerName: 'id'
    },
    {
      field: 'firstName',
      sortable: true,
      flex: 1,
      minWidth: 100,
      headerName: 'Όνομα'
    },
    {
      field: 'lastName',
      sortable: true,
      flex: 1,
      minWidth: 100,
      headerName: 'Έπώνυμο'
    },
    {
      field: 'management', 
      headerName: '', 
      flex: 0.4, 
      minWidth: 100,
      sortable: false,
      renderCell: ({row}) => <Box display='flex' gap={1} p={0}>
        <Tooltip title='Προβολή Μαθητή'>
          <IconButton onClick={() => navigate(`/students/${row.id}`)}>
            <Info color='info'/>
          </IconButton>
        </Tooltip>
        <Tooltip title='Διαγραφή Μαθητή'>
          <IconButton onClick={() => handleClickOpen(row.id)}>
            <Delete color='error'/>
          </IconButton>
        </Tooltip>
      </Box>,
    }
  ]
  return (
    <>
      <PageTitle title='Αναζήτηση Μαθητών'/>
      <Button variant='contained' endIcon={<Add />} sx={{ textTransform: "none", mb: 2 }} onClick={() => navigate('new')}>
        Δημιουργία Μαθητή
      </Button>
      <DataGridComponent loading={loading} columns={columns} rows={students} noRowsText="Δεν υπάρχουν Μαθητές"/>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">
          Διαγραφή Μαθητή
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Είστε σίγουρος ότι θέλετε να διαγράψετε τον συγκεκριμένο μαθητή;
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Όχι</Button>
          <Button onClick={deleteStudent} autoFocus>Ναι</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Students