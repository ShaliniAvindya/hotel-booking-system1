import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Grid, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
import DateRange from '../components/DateRange';
import Footer from '../components/Footer';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import WifiIcon from '@mui/icons-material/Wifi';
import BathtubIcon from '@mui/icons-material/Bathtub';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import SafetyCheckIcon from '@mui/icons-material/SafetyCheck';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Carousel } from 'react-responsive-carousel';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'; // Import arrow icons
import RoomSearch from '../components/RoomSearch';
import Slider from 'react-slick';

const facilityIcons = {
  "Free Wi-Fi": <WifiIcon />,
  "Minibar": <FreeBreakfastIcon />,
  "Shower WC": <BathtubIcon />,
  "Bathrobe": <LocalLaundryServiceIcon />,
  "In-room Digital Safe": <SafetyCheckIcon />,
  "Iron and Iron Board": <LocalLaundryServiceIcon />,
};

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [filteredRooms, setFilteredRooms] = useState([]);

  const settings = {
    dots: true, 
    infinite: true, 
    speed: 500, 
    slidesToScroll: 1, 
    slidesToShow: 1,
    autoplay: true,
    arrows: true, 
  };

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDateRangeChange = (dates) => {
    setFromDate(dates[0]);
    setToDate(dates[1]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/rooms', {
          params: {
            fromDate,
            toDate,
          },
        });
        console.log('Fetched rooms:', response);
        setRooms(response.data);
        setFilteredRooms(response.data); 
      } catch (error) {
        console.log('Error fetching rooms:', error);
        console.error('Error fetching rooms:', error);
      }
    };
    fetchData();
  }, [fromDate, toDate]); // Run on date changes
  

  return (
    <div style={{ backgroundColor: '#f9f9f9' }}>
      <br />
      <h1 style={{ textAlign: "center", fontFamily: 'Dancing Script' , fontSize: '50px'  }}>Book Now</h1>
      <br />

      <div style={{ maxWidth: '50vw', margin: '0 auto', position: 'relative', left: '46vw',bottom: '1vh', zIndex: '1' }}>
        <DateRange onDateChange={handleDateRangeChange} />
      </div>

      <div style={{ padding: '0 10%', marginTop: '1%' }}>
        <RoomSearch setFilteredRooms={setFilteredRooms} rooms={rooms} />
        <Grid container spacing={3}>
          {Array.isArray(filteredRooms) && filteredRooms.map((room) => (
            <Grid item key={room._id} xs={12} sm={6} md={4}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'left',
                  height: '69vh', 
                  boxSizing: 'border-box',
                  border: '1px solid #ccc', 
                  borderRadius: '8px',
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
                  paddingBottom: '1vh',
                }}
                onClick={handleRoomClick}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0px 8px 12px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
                }}
              >
                <Slider {...settings} style={{ width: '100%', height: '38%' }}>
                  {room.imageUrls.map((image, index) => (
                    <div key={index}>
                      <img
                        src={image}
                        alt={`${room.name} ${index}`}
                        style={{
                          width: '100%',
                          height: '30vh', 
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                  ))}
                </Slider>
                <p 
                  style={{
                    position: 'relative',
                    top: '-24vh',
                    left: '1.5vw',
                    zIndex: '1',
                    backgroundColor: 'rgba(0, 0, 50, 0.8)',
                    color: '#fff',
                    width: 'fit-content',
                    padding: '4px 8px',
                  }}
                >
                  {room.type}
                </p>
                <div 
                  style={{ 
                    height: '55%',
                    padding: '1vh 1vw',
                  }}>
                  <h3
                    style={{
                      margin: '2vh 0vw 1vh 0vw',
                      fontSize: '1.4rem',
                      fontWeight: 'bold',
                      color: '#333', 
                    }}
                  >
                    {room.name}
                  </h3>
                  <p
                    style={{
                      margin: '0 1vw 0 0vw',
                      textAlign: 'left',
                      fontSize: '0.9rem',
                      color: '#555', 
                    }}
                  >
                    {room.description}
                  </p>
                  <div style={{ backgroundColor: '#0A369D', height: '5px', width: '20%', margin: '1vh 0 1vh 0'}}></div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      gap: '0.6vw',
                      alignItems: 'center',
                      overflowX: 'auto',
                      width: '100%',
                      height: '30%',
                      scrollbarColor: 'rgba(0, 0, 0, 0.2)',
                      scrollbarWidth: 'thin',
                      scrollbarGutter: '5px',
                    }}
                  >
                    {room.facilities.map((facility, index) => (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          minWidth: '5vw',
                          maxWidth: '6vw',
                          flexShrink: 0,
                        }}
                      >
                        {facilityIcons[facility]}
                        <span style={{ fontSize: '0.8rem', marginTop: '4px', textAlign: 'center' }}>
                          {facility}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'left', marginTop: '1vh' }}>
                    <div>
                      <p style={{ fontSize: '15px', color: 'rgba(0,0,0,0.5)'}}>Starting From</p>
                      <p
                        style={{
                          fontSize: '0.9rem',
                          color: 'black', 
                          height: '10%',
                          fontSize: '30px',
                          fontWeight: 'bold',
                        }}
                      >${room.rentPerDay}<span style={{ fontSize: '20px', color: 'rgba(0,0,0,0.5)'}}>/night</span>
                      </p>
                    </div>
                    <button style={{ backgroundColor: '#0A369D', color: '#fff', padding: '5px 15px',margin: '2vh 0 0 0',height: '40px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>
                      Book Now
                    </button>
                  </div>
                  
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>

      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          style: { minHeight: '500px' },
        }}
      >
        {selectedRoom && (
          <>
            <Carousel
              showThumbs={false}
              infiniteLoop
              useKeyboardArrows
              autoPlay
              renderArrowPrev={(onClickHandler, hasPrev) =>
                hasPrev && (
                  <div onClick={onClickHandler} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', zIndex: 10 }}>
                    <KeyboardArrowLeft style={{ fontSize: '40px', color: '#fff' }} />
                  </div>
                )
              }
              renderArrowNext={(onClickHandler, hasNext) =>
                hasNext && (
                  <div onClick={onClickHandler} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', zIndex: 10 }}>
                    <KeyboardArrowRight style={{ fontSize: '40px', color: '#fff' }} />
                  </div>
                )
              }
            >
              {selectedRoom.imageUrls.map((url, index) => (
                <div key={index}>
                  <img src={url} alt={`${selectedRoom.name}`} style={{ width: '100%', height: '450px' }} />
                </div>
              ))}
            </Carousel>
            <DialogTitle>{selectedRoom.name}</DialogTitle>
            <DialogContent>
              <Typography variant="body1">Type: {selectedRoom.type}</Typography>
              <Typography variant="body1">Description: {selectedRoom.description}</Typography>

              <Box display="flex" justifyContent="space-between" mt={2}>
                <Typography variant="body1">Max Count: {selectedRoom.maxCount}</Typography>
                <Typography variant="body1">Phone Number: {selectedRoom.phoneNumber}</Typography>
                <Typography variant="body1">Rent Per Day: {selectedRoom.rentPerDay}</Typography>
              </Box>

              <Typography variant="h6" style={{ marginTop: '10px' }}>Facilities:</Typography>
              <Box display="flex" flexWrap="wrap" gap={2} alignItems="center">
                {Array.isArray(selectedRoom.facilities) && selectedRoom.facilities.map((facility, index) => (
                  <Box key={index} display="flex" alignItems="center">
                    {facilityIcons[facility] || null} {/* Render the corresponding icon */}
                    <Typography variant="body2" style={{ marginLeft: '8px' }}>{facility}</Typography>
                  </Box>
                ))}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">Close</Button>
              <Button
                color="primary"
                onClick={() => window.location.href = `/rooms/${selectedRoom._id}`}
              >
                Book Now
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      <br /><br />

      <Footer />
    </div>
  );
};

export default Rooms;
