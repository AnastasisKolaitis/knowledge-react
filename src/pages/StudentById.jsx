import { Edit } from '@mui/icons-material';
import { Autocomplete, Box, Button, Dialog, DialogActions, DialogTitle, Skeleton, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import DetailsCard from '../components/DetailsCard';
import PageTitle from '../components/PageTitle';
import { enqueueSnackbar } from 'notistack';

const StudentById = () => {
  const {id: studentlId} = useParams();

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [schools, setSchools] = useState([]);

  const [student, setStudent] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  const fetchStudent = async () => {
    setError();
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND}/students/${studentlId}`);
      setStudent(response.data);
    } catch (error) {
      console.error(error);
      setError(error.message)
    } finally {
      setLoading(false);
    }
  }

  const fetchSchools = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND}/schools`);
      setSchools(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    Promise.all([
      fetchStudent(),
      fetchSchools()
    ])
  }, []);

  const handleEditStudent = async (data) => {
    try {
      console.log(data);
      await axios.put(`${import.meta.env.VITE_BACKEND}/students/${studentlId}`, data);
      enqueueSnackbar({message: 'Επιτυχής Ενημέρωση του Μαθητη', variant: 'success'});
    } catch (error) {
      console.error(error);
    }
  }

  const handleOnFieldChange = (field, value) => {
    setStudent({
      ...student,
      [field]: value
    })
  };
  const handleOnSchoolChange = (value) => {
    setStudent({
      ...student,
      'school': schools.find(x => x.schoolName === value)
    })
  };
  return (
    <>
      <PageTitle title='Πληροφορίες Μαθητή'/>
      {loading
        ? <>
          <Skeleton height={50} width={1000}/>
          <Skeleton height={50} width={1000}/>
          <Skeleton height={50} width={1000}/>
          <Skeleton height={50} width={1000}/>
        </>
        : error
          ? <Typography fontStyle='italic' textAlign='center'>{error}</Typography> 
          : <>
            <Button variant='contained' endIcon={<Edit/>} sx={{ textTransform: "none", display: 'flex', ml: 'auto' }} onClick={handleClickOpen}>
              Επεξεργασία Μαθητή
            </Button>
            <DetailsCard profileInfo={[
              {
                header: 'Όνομα',
                value: student?.firstName
              },
              {
                header: 'Επώνυμο',
                value: student?.lastName
              },
              {
                header: 'Α.Μ.',
                value: student?.am
              },
              {
                header: 'Σχολείο',
                value: student?.school?.schoolName
              },
            ]}/>
            <Dialog
              open={open}
              onClose={handleClose}
              fullWidth
              PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                  event.preventDefault();
                  handleEditStudent(student);
                  handleClose();
                },
              }}
            >
              <DialogTitle>Επεξεργασία Μαθητή</DialogTitle>
              <Box m={2} display='flex' flexDirection='column' gap={1}>
                <TextField 
                  fullWidth 
                  required 
                  onChange={(event) => handleOnFieldChange('firstName', event.target.value)} 
                  id='firstName' 
                  name='firstName' 
                  label='Όνομα' 
                  value={student?.firstName}
                />
                <TextField 
                  fullWidth 
                  required 
                  onChange={(event) => handleOnFieldChange('lastName', event.target.value)} 
                  id='lastName' 
                  name='lastName' 
                  label='Επώνυμο' 
                  value={student?.lastName}
                />
                <TextField 
                  fullWidth 
                  required 
                  onChange={(event) => handleOnFieldChange('am', event.target.value)} 
                  id='am' 
                  name='am' 
                  label='ΑΜ' 
                  value={student?.am}
                />
                <Autocomplete
                  required
                  value={student?.school.schoolName}
                  onChange={(event, newValue) => handleOnSchoolChange(newValue)}
                  options={schools.map(school => school.schoolName)}
                  renderInput={(params) => <TextField 
                    {...params} 
                    id='school'
                    name='school' 
                    label="Επιλογή Σχολείου"
                    required
                  />}
                />
              </Box>
              <DialogActions>
                <Button sx={{ textTransform: 'none'}} onClick={handleClose}>Ακύρωση</Button>
                <Button sx={{ textTransform: 'none'}} type="submit">Επεξεργασία</Button>
              </DialogActions>
            </Dialog>
          </>
      }
    </>
  )
}

export default StudentById