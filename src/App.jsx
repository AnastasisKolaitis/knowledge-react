import { AccountCircle } from '@mui/icons-material'
import { AppBar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router'
import './App.css'
import CreateSchool from './pages/CreateSchool'
import CreateStudent from './pages/CreateStudent'
import SchoolById from './pages/SchoolById'
import Schools from './pages/Schools'
import StudentById from './pages/StudentById'
import Students from './pages/Students'
import Login from './pages/Login'

function App() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleclickSchools = () => {
    handleClose();
    navigate('/schools')
  }
  const handleclickStudents = () => {
    handleClose();
    navigate('/students')
  }

  return (
    <>
      <Container id='main-container' maxWidth='lg' sx={{ height: "100%" }}>
        <AppBar position='fixed' >
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Toolbar>
            <Typography variant='h6'>
              Σύστημα Διαχείρισης Σχολείων κ Μαθητών
            </Typography>
          </Toolbar>
          <div>
            <IconButton
              sx={{ mr: 5}}
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleclickSchools}>Σχολεία</MenuItem>
              <MenuItem onClick={handleclickStudents}>Μαθητές</MenuItem>
            </Menu>
          </div>
       </Box>
        </AppBar>
        <Toolbar sx={{ mb: 5}}/>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/students'>
            <Route index element={ <Students/>}/>
            <Route path=':id' element={ <StudentById/>} />
            <Route path='new' element={ <CreateStudent/>} />
          </Route>
          <Route path='/schools'>
            <Route index element={ <Schools/>}  />
            <Route path=':id' element={ <SchoolById/>} />
            <Route path='new' element={ <CreateSchool />} />
          </Route>
          <Route path='*' element={
            <Typography textAlign='center' variant='h4'>Page not Found</Typography>
          }/>
        </Routes>
      </Container>
    </>
  )
}

export default App
