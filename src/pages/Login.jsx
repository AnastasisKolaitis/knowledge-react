import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router'

const Login = () => {
  const navigate = useNavigate();
  const onLogin = () => {
    navigate('/schools');
  }
  return (
    <Card elevation={2} sx={{minWidth: 350, maxWidth: 700, mt: 5, display: 'flex', marginX: 'auto', flexDirection: 'column' }}>
      <Typography fontWeight='bold' sx={{ mt: 2, ml: 2 }} textAlign='center'>
        Σύνδεση
      </Typography>
      <CardContent sx={{ padding: '18px !important', width: '100%' }}>
        <Box display='flex' flexDirection='column' gap={2} width='90%' mx='auto'>
          <TextField label='email' fullWidth />
          <TextField label='Κωδικός' fullWidth />
        </Box>
      </CardContent>
      <CardActions sx={{mr: 1}}>
        <Button variant='contained' sx={{textTransform: 'none', display: 'flex', ml: 'auto'}} onClick={onLogin}>
          Σύνδεση
        </Button>
      </CardActions>
    </Card>
  )
}

export default Login