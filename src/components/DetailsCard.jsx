import { Box, Card, CardContent, Divider, Typography } from '@mui/material'

const DetailsCard = ({profileInfo}) => {
  return (
    <Card elevation={1} sx={{ minWidth: 350, mt: 1 }}>
          <CardContent sx={{ padding: '18px !important' }}>
            <Box flexDirection='column' display='flex' gap={4}>

              {profileInfo.map(info => (
                <div key={info.header}>
                  <Box display='flex' >
                    <Typography
                      variant='body1'
                      sx={{ display: 'flex', alignItems: 'center', width: '50%' }}
                    >
                      {info.header}
                    </Typography>
                    <Typography
                      variant='body1'
                      color='text.secondary'
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      {info?.value || '-'}
                    </Typography>
                  </Box>
                  <Divider />
                </div>
              ))}

            </Box>
          </CardContent>
        </Card>
  )
}

export default DetailsCard