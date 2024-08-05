import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import PageTitle from '../components/PageTitle';

const CreateSchool = () => {
  const [error, setError] = useState();
  const [schoolName, setSchoolName] = useState();

  const {enqueueSnackbar} = useSnackbar()
  const navigate = useNavigate();

  const createSchool = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND}/schools`, {
        schoolName
      });
      navigate('/schools');
      enqueueSnackbar({message: 'Επιτυχής Δημιουργία Σχολείου', variant: 'success'})
    } catch (error) {
      console.error(error);
    }
  };

  const hasErrors = !schoolName;

  const handleSubmit = () => {
    if (hasErrors) setError('Συμπληρώστε όλα τα απαραίτητα πεδία')
    else createSchool()
  }

  return (
    <>
      <PageTitle title='Δημιουργία Σχολείου'/>
      <Box display='flex' flexDirection='column' gap={2}>
        <TextField required label='Όνομα' onChange={(e) => setSchoolName(e.target.value)}/>
        <Typography color='error' variant="body2">
          {error}
        </Typography>
        <Button variant='contained'sx={{ textTransform: "none", display: 'flex', ml: 'auto' }} onClick={handleSubmit}>
          Δημιουργία
        </Button>
      </Box>
    </>  )
}

export default CreateSchool