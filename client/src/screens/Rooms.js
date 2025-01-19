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
import PhoneIcon from '@mui/icons-material/Phone';
import BookingCalendar from '../components/Bookingcalender';
import { useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [filteredRooms, setFilteredRooms] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const settings = {
    dots: true, 
    infinite: true, 
    speed: 500, 
    slidesToScroll: 1, 
    slidesToShow: 1,
    autoplay: true,
    arrows: true, 
  };

  useEffect(() => {
    if (location.state?.fromDate && location.state?.toDate) {
      setFromDate(new Date(location.state.fromDate));
      setToDate(new Date(location.state.toDate));
    }
  }, [location.state]);
  
  const handleDateRangeSelect = (from, to) => {
      setFromDate(from);
      setToDate(to);
    };

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const  handleDateRangeChange = (dates) => {
    setFromDate(dates[0]);
    setToDate(dates[1]);
  };

  const handleOpenPaymentDialog = () => {
    if (selectedRoom) {
      localStorage.setItem('fromDate', dayjs(fromDate).format('YYYY-MM-DD'));
      localStorage.setItem('toDate', dayjs(toDate).format('YYYY-MM-DD'));
      navigate(`/rooms/payment/${selectedRoom._id}`, {
        state: {
          fromDate,
          toDate,
        },
      });
    }
  };

  const facilityIcons = {
    "Free Wi-Fi": <WifiIcon />,
    "Minibar": <FreeBreakfastIcon />,
    "Shower WC": <BathtubIcon />,
    "Bathrobe": <LocalLaundryServiceIcon />,
    "In-room Digital Safe": <SafetyCheckIcon />,
    "Iron and Iron Board": <LocalLaundryServiceIcon />,
  };

  useEffect(() => {
    const fetchData = async () => {
      try { 
        const response = await axios.get(`http://localhost:8000/api/rooms?fromDate=${dayjs(fromDate).format('YYYY-MM-DD')}&toDate=${dayjs(toDate).format('YYYY-MM-DD')}`);
        setRooms(response.data);
        setFilteredRooms(response.data); 
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };
    fetchData();
  }, [fromDate, toDate]); 

  return (
    <div style={{ backgroundColor: '#f2f9fc' }}>
      <br />
      <h1 style={{ textAlign: "center", fontFamily: 'Dancing Script', fontSize: '50px', fontWeight: 'bold' }}>Book Now</h1>
      <br />

      <div style={{ margin: '0 0', width: 'fit-content', position: 'relative', left: '10vw', bottom: '1vh', zIndex: '1' }}>
        <DateRange onDateChange={handleDateRangeChange} initialDates={[dayjs(fromDate), dayjs(toDate)]}  />
      </div>

      <div style={{ padding: '0 10%', marginTop: '1%' }}>
        <RoomSearch setFilteredRooms={setFilteredRooms} rooms={rooms} />
        <Grid container spacing={4}>
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
                  backgroundColor: '#fff',
                }}
                onClick={() => handleRoomClick(room)}
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
                  {room.imageUrls && Array.isArray(room.imageUrls) && room.imageUrls.length > 0 ? (
                    room.imageUrls.map((image, index) => (
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
                    ))
                  ) : (
                    <div style={{ textAlign: 'center', padding: '10px' }}>
                      <p>No images available</p>
                    </div>
                  )}
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
                <div style={{ height: '55%', padding: '1vh 1vw' }}>
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
                  <div style={{ backgroundColor: '#0A369D', height: '5px', width: '20%', margin: '1vh 0 1vh 0' }}></div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      gap: '0.6vw',
                      alignItems: 'center',
                      overflowX: 'auto',
                      width: '100%',
                      height: '30%',
                    }}
                  >
                    {room.facilities && Array.isArray(room.facilities) && room.facilities.map((facility, index) => (
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
                      <p style={{ fontSize: '15px', color: 'rgba(0,0,0,0.5)', marginBottom: '0' }}>Starting From</p>
                      <p
                        style={{
                          fontSize: '30px',
                          fontWeight: 'bold',
                          color: 'black',
                        }}
                      >
                        ${room.rentPerDay}<span style={{ fontSize: '20px', color: 'rgba(0,0,0,0.5)' }}>/night</span>
                      </p>
                    </div>
                    <button
                      style={{
                        backgroundColor: '#0A369D',
                        color: '#fff',
                        padding: '5px 15px',
                        margin: '2vh 0 0 0',
                        height: '40px',
                        borderRadius: '5px',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
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
          style: { 
            minHeight: '79vh',
            borderRadius: '10px',
          },
        }}
      >
        {selectedRoom && (
          <>
            <div style={{ position: 'relative', width: '100%' }}>
              {/* Carousel */}
              <Carousel
                showThumbs={false}
                infiniteLoop
                useKeyboardArrows
                autoPlay
                renderArrowPrev={(onClickHandler, hasPrev) =>
                  hasPrev && (
                    <div 
                      onClick={onClickHandler} 
                      style={{ 
                        position: 'absolute', 
                        left: '10px', 
                        top: '50%', 
                        transform: 'translateY(-50%)', 
                        cursor: 'pointer', 
                        zIndex: 10 
                      }}
                    >
                      <KeyboardArrowLeft style={{ fontSize: '40px', color: '#fff' }} />
                    </div>
                  )
                }
                renderArrowNext={(onClickHandler, hasNext) =>
                  hasNext && (
                    <div 
                      onClick={onClickHandler} 
                      style={{ 
                        position: 'absolute', 
                        right: '10px', 
                        top: '50%', 
                        transform: 'translateY(-50%)', 
                        cursor: 'pointer', 
                        zIndex: 10 
                      }}
                    >
                      <KeyboardArrowRight style={{ fontSize: '40px', color: '#fff' }} />
                    </div>
                  )
                }
              >
                {selectedRoom.imageUrls.map((url, index) => (
                  <div key={index}>
                    <img 
                      src={url} 
                      alt={`${selectedRoom.name}`} 
                      style={{ 
                        width: '100%', 
                        height: '350px', 
                        objectFit: 'cover', 
                      }} 
                    />
                  </div>
                ))}
              </Carousel>

              {/* Fixed Dark Strip with Room Name */}
              <div 
                style={{
                  position: 'absolute',
                  bottom: '0',
                  width: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.8)', // Dark strip background
                  padding: '10px 20px',
                  zIndex: 5,
                  textAlign: 'center',
                }}
              >
                <Typography 
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    color: '#fff',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  {selectedRoom.name}
                </Typography>
              </div>
            </div>

            <DialogContent style={{ padding: '0 20px' }}>
              <Typography 
                variant="body1" 
                style={{ fontFamily: 'Playfair Display, serif', color: '#2b2a78', marginBottom: '20px', textAlign: 'center' }}
              >
                {selectedRoom.description}
              </Typography>

              <Box display="flex" justifyContent="space-between" mt={2} style={{ padding: '0 1vw' }}>
                <Typography 
                  variant="body1" 
                  style={{ fontFamily: 'Playfair Display, serif', color: '#2b2a78', marginBottom: '10px',backgroundColor: 'rgba(0,0,50,0.2)', padding: '5px 10px'}}
                >
                  {selectedRoom.type}
                </Typography>
                <Typography 
                  variant="body1" 
                  style={{ fontFamily: 'Playfair Display, serif', color: '#2b2a78' }}
                >
                  Max Count: {selectedRoom.maxCount}
                </Typography>
                <Typography 
                  variant="body1" 
                  style={{ fontFamily: 'Playfair Display, serif', color: '#2b2a78', display: 'flex', alignItems: 'center' }}
                >
                  <PhoneIcon style={{ marginRight: '8px', color: '#2b2a78' }} />
                  {selectedRoom.phoneNumber}
                </Typography>
                <Typography 
                  variant="body1" 
                  style={{ fontFamily: 'Playfair Display, serif', color: '#2b2a78' }}
                >
                  <span style={{ fontWeight: 'bold', fontSize: '25px'}}>${selectedRoom.rentPerDay}</span>/night
                </Typography>
              </Box>
              <Box
                display="flex"
                flexWrap="wrap"
                gap={2}
                alignItems="center"
                style={{
                  padding: '10px',
                  backgroundColor: '#f9f9f9',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  margin: '0 1vw 1vh 1vw',
                }}
              >
                {Array.isArray(selectedRoom.facilities) && selectedRoom.facilities.map((facility, index) => (
                  <Box key={index} display="flex" alignItems="center" style={{ margin: '5px 10px' }}>
                    {facilityIcons[facility] || null}
                    <Typography 
                      variant="body2" 
                      style={{ 
                        marginLeft: '8px', 
                        fontWeight: 'bold', 
                        fontFamily: 'Playfair Display, serif', 
                        color: '#6B4F4F' 
                      }}
                    >
                      {facility}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <BookingCalendar onDateRangeSelect={handleDateRangeSelect} />
            </DialogContent>
            
            <DialogActions style={{ display: 'flex', justifyContent: 'space-between', padding: '1vh 2vw 4vh 2vw' }}>
              <Button 
                onClick={handleCloseDialog} 
                style={{ 
                  border: '1px solid red', 
                  color: '#633434', 
                  padding: '5px 10px', 
                  borderRadius: '8px' 
                }}
              >
                Close
              </Button>
              <Button
                style={{
                  backgroundColor: '#1E3A8A',
                  color: '#fff',
                  padding: '5px 10px',
                  fontSize: '16px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
                onClick={handleOpenPaymentDialog}
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
