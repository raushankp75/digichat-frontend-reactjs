import { Box, Grid, Paper, Skeleton, Typography } from '@mui/material'
import React from 'react'

const ChatLoading = () => {
  return (
    <Box>
      <Grid item lg={12} sm={12} xs={12} sx={{ cursor: 'pointer' }}>
        <Paper sx={{ padding: '15px', display: 'flex', alignItems: 'center', gap: '20px' }} elevation={1}>

          <Skeleton animation="wave" variant="circular" width={40} height={40} />

          <Box>
            <Skeleton
              animation="wave"
              height={20}
              width={150}
              style={{ marginBottom: 6 }}
            />

            <Skeleton
              animation="wave"
              height={20}
              width={150}
              style={{ marginBottom: 6 }}
            />
          </Box>
        </Paper>
      </Grid>
      <Grid item lg={12} sm={12} xs={12} sx={{ cursor: 'pointer' }}>
        <Paper sx={{ padding: '15px', display: 'flex', alignItems: 'center', gap: '20px' }} elevation={1}>

          <Skeleton animation="wave" variant="circular" width={40} height={40} />

          <Box>
            <Skeleton
              animation="wave"
              height={20}
              width={150}
              style={{ marginBottom: 6 }}
            />

            <Skeleton
              animation="wave"
              height={20}
              width={150}
              style={{ marginBottom: 6 }}
            />
          </Box>
        </Paper>
      </Grid>
      <Grid item lg={12} sm={12} xs={12} sx={{ cursor: 'pointer' }}>
        <Paper sx={{ padding: '15px', display: 'flex', alignItems: 'center', gap: '20px' }} elevation={1}>

          <Skeleton animation="wave" variant="circular" width={40} height={40} />

          <Box>
            <Skeleton
              animation="wave"
              height={20}
              width={150}
              style={{ marginBottom: 6 }}
            />

            <Skeleton
              animation="wave"
              height={20}
              width={150}
              style={{ marginBottom: 6 }}
            />
          </Box>
        </Paper>
      </Grid>
      <Grid item lg={12} sm={12} xs={12} sx={{ cursor: 'pointer' }}>
        <Paper sx={{ padding: '15px', display: 'flex', alignItems: 'center', gap: '20px' }} elevation={1}>

          <Skeleton animation="wave" variant="circular" width={40} height={40} />

          <Box>
            <Skeleton
              animation="wave"
              height={20}
              width={150}
              style={{ marginBottom: 6 }}
            />

            <Skeleton
              animation="wave"
              height={20}
              width={150}
              style={{ marginBottom: 6 }}
            />
          </Box>
        </Paper>
      </Grid>
      <Grid item lg={12} sm={12} xs={12} sx={{ cursor: 'pointer' }}>
        <Paper sx={{ padding: '15px', display: 'flex', alignItems: 'center', gap: '20px' }} elevation={1}>

          <Skeleton animation="wave" variant="circular" width={40} height={40} />

          <Box>
            <Skeleton
              animation="wave"
              height={20}
              width={150}
              style={{ marginBottom: 6 }}
            />

            <Skeleton
              animation="wave"
              height={20}
              width={150}
              style={{ marginBottom: 6 }}
            />
          </Box>
        </Paper>
      </Grid>
    </Box>


  )
}

export default ChatLoading