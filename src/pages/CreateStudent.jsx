import { Autocomplete, Box, Button, TextField, Typography } from "@mui/material"
import PageTitle from "../components/PageTitle"
import { useEffect, useState } from "react"
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router";

const CreateStudent = () => {
  const [firstName, setName] = useState();
  const [lastName, setLastName] = useState();
  const [am, setAm] = useState();
  const [school, setSchool] = useState();
  
  const [error, setError] = useState();
  const [schools, setSchools] = useState([]);

  const navigate = useNavigate();

  const createStudent = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND}/students`, {
        firstName,
        lastName,
        am,
        school: schools.find(x => x.schoolName === school)
      });
      enqueueSnackbar({message: 'Επιτυχής Δημιουργία Μαθητή', variant: 'success'})
      navigate('/students');
    } catch (error) {
      console.error(error);
    }
  };

  const hasErrors = !firstName || !lastName || !am || !school;

  const handleSubmit = () => {
    if (hasErrors) setError('Συμπληρώστε όλα τα απαραίτητα πεδία')
    else createStudent()
  }

  const fetchSchools = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND}/schools`);
      setSchools(response.data);
    } catch (error) {
      console.error(error);
      enqueueSnackbar({message: 'Κάτι πήγε λάθος!'});
    }
  }

  useEffect(() => {
    fetchSchools()
  }, [])

  return (
    <>
      <PageTitle title='Δημιουργία Μαθητή'/>
      <Box display='flex' flexDirection='column' gap={2}>
        <TextField required label='Όνομα' onChange={(e) => setName(e.target.value)}/>
        <TextField required label='Επώνυμο' onChange={(e) => setLastName(e.target.value)}/>
        <TextField required label='ΑΜ' onChange={(e) => setAm(e.target.value)}/>
        <Autocomplete
          required
          onChange={(event, newValue) => setSchool(newValue)}
          options={schools.map(school => school.schoolName)}
          renderInput={(params) => <TextField {...params} label="Επιλογή Σχολείου" required/>}
        />
        <Typography color='error' variant="body2">
          {error}
        </Typography>
        <Button variant='contained'sx={{ textTransform: "none", display: 'flex', ml: 'auto' }} onClick={handleSubmit}>
          Δημιουργία
        </Button>
      </Box>
    </>
  )
}

export default CreateStudent