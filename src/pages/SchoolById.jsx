import { ArrowRightAlt, Edit } from '@mui/icons-material';
import { Box, Button, Card, Dialog, DialogActions, DialogTitle, Divider, IconButton, List, ListItem, ListItemText, Skeleton, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import DetailsCard from '../components/DetailsCard';
import PageTitle from '../components/PageTitle';

const SchoolById = () => {
  const {id: schoolId} = useParams();
  
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [school, setSchool] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  const { enqueueSnackbar } = useSnackbar();

  const fetchSchool = async () => {
    setError();
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND}/schools/${schoolId}`);
      setSchool(response.data);
    } catch (error) {
      console.error(error);
      setError(error.message)
    } finally {
      setLoading(false);
    }
  }
  
  const handleEditSchool = async (data) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND}/schools/${schoolId}`, data);
      setSchool(response.data);
      enqueueSnackbar({message: 'Επιτυχής Ενημέρωση του σχολείου', variant: 'success'});
      navigate('/schools');
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchSchool()
  }, []);

  return (
    <>
      <PageTitle title='Πληροφορίες Σχολείου' />
      {loading
        ? <Skeleton height={50} width={1000}/>
        : error
          ? <Typography fontStyle='italic' textAlign='center'>{error}</Typography> 
          : <>
            <Button variant='contained' endIcon={<Edit/>} sx={{ textTransform: "none", display: 'flex', ml: 'auto' }} onClick={handleClickOpen}>
              Επεξεργασία Σχολείου
            </Button>
            <DetailsCard profileInfo={[
              {
                header: 'Όνομα Σχολείου',
                value: school?.schoolName
              },
            ]}/>
            {school?.students?.length > 0 && <Card elevation={1} sx={{ minWidth: 350, mt: 5 }}>
              <Typography fontWeight='bold' sx={{ mt: 2, ml: 2 }}>
                Λίστα Μαθητών
              </Typography>
              <Divider variant='middle'/>
              <List
                sx={{ mt: 2 }}
              >
                {school?.students.map(student => (
                  <ListItem key={student.id}>
                    <ListItemText primary={`${student.firstName} ${student.lastName}`} />
                    <IconButton onClick={() => navigate(`/students/${student.id}`)} sx={{ border: 1}}>
                      <ArrowRightAlt color='info'/>
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Card>
            }
            <Dialog
              open={open}
              onClose={handleClose}
              fullWidth
              PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  const formJson = Object.fromEntries((formData).entries());
                  const schoolName = formJson.schoolName;
                  handleEditSchool({schoolName});
                  handleClose();
                },
              }}
            >
              <DialogTitle>Επεξεργασία Σχολείου</DialogTitle>
              <Box m={2} >
                <TextField
                  required
                  name='schoolName'
                  id='schoolName'
                  label="Όνομα Σχολείου"
                  value={school?.schoolName}
                  onChange={(event) => setSchool(event.target.value)}
                  fullWidth
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

export default SchoolById