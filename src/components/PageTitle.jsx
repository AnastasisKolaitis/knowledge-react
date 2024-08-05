import { Typography } from '@mui/material'

const PageTitle = ({ title }) => {
  return (
    <Typography variant='h4' sx={{ mb: 5 }}>
      {title}
    </Typography>
  )
}

export default PageTitle