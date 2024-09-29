
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
              height="140"
              width="100%"
              image="https://firebasestorage.googleapis.com/v0/b/hotel-booking-system-35f4a.appspot.com/o/Public%20Folder%2Fimage-1.png?alt=media&token=e417affd-6460-4028-a7dd-6a642a21befc"
              alt="Image 1"
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              width="100%"
              image="https://firebasestorage.googleapis.com/v0/b/hotel-booking-system-35f4a.appspot.com/o/Public%20Folder%2Fimage-2.png?alt=media&token=d97b7a04-3b41-486f-8fa5-a6014a81d997"
              alt="Image 2"
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="260"
              width="100%"
              image="https://firebasestorage.googleapis.com/v0/b/hotel-booking-system-35f4a.appspot.com/o/Public%20Folder%2Fimage-3.png?alt=media&token=387cb7d8-0554-45c9-85fa-c87a733297c7"
              alt="Image 3"
            />
          </Card>
        </Grid>
        
      </Grid>
    </Grid>
  );
};

export default ImageGal;                   