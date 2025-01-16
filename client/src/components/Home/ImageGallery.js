import React from 'react';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import ClickablePicture from './ClickablePicture';
import imageGallery from './imageGalleryData';

const ImageGallery = () => {
  const navigate = useNavigate(); 

  const handleClick = (id) => {
    navigate(`/rooms/${id}`); 
  };

  return (
    <div style={{  width: '100%', minHeight: '90vh', padding: '0px 0' }}>
      <Grid container spacing={3}>
        {imageGallery.map((item, index) => (
          <Grid item xs={4} key={index} >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '52vh', 
                boxSizing: 'border-box',
                border: '1px solid #ccc', 
                borderRadius: '8px',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
                paddingBottom: '1vh',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0px 8px 12px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
              }}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '70%', 
                  objectFit: 'cover', 
                }}
              />
              <h3
                style={{
                  margin: '0px 0vw 0px 0vw',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: '#333', 
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  margin: '0 1vw 0 1vw',
                  textAlign: 'center',
                  fontSize: '0.9rem',
                  color: '#555', 
                  height: '15%',
                }}
              >
                {item.sentence1}
              </p>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ImageGallery;
