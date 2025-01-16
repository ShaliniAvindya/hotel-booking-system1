
import React from 'react';
import { Grid, Card, CardMedia } from '@mui/material';

const ImageGal = () => {
  return (
    <Grid container justifyContent="flex-end" item xs={8} marginLeft={50}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              sx={{ height: 150 }}
              width="100%"
              image="https://i.postimg.cc/SNcbSBwn/image-1.png"
              alt="Image 1"
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              sx={{ height: 200 }}
              width="100%"
              image="https://i.postimg.cc/RZRrfcC9/image-2.png"
              alt="Image 2"
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              sx={{ height: 230 }}
              width="100%"
              image="https://i.postimg.cc/GmrwHMCq/image-3.png"
              alt="Image 3"
            />
          </Card>
        </Grid>
        
      </Grid>
    </Grid>
  );
};

export default ImageGal;                   