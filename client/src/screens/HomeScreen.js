import React from 'react';
import { Container, Typography, Button, Grid, Box } from '@mui/material';
import ImageGallery from '../components/Home/ImageGallery';
import Footer from '../components/Footer';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FAQAccordion from './FAQAccordion';
import ImageGal from '../components/Home/ImageGal';
import LiveChat from '../components/Home/LiveChat';
import Experience from '../components/Home/Experience';
import HomeExperience from '../components/Home/HomeExperience';
import OffersSection from '../components/Home/OffersSection';
// import Slider from '../components/Home/Slider';

<LiveChat />

const HomeScreen = () => {
  return (
    <div style={{ backgroundColor: '#caf0f8' }}>
      <LiveChat />

      <Box bgcolor="#ffffff" padding="35px" mt="30px" minWidth='100vw'marginTop={'1px'}><br></br>
        <div style={{ display: 'flex', marginBottom: '30px' }}>
          {/* Left Block: Image */}
          <div
            style={{
              flex: 1,
              backgroundImage: "url('https://i.postimg.cc/j2mDcCVX/maldives-784666-1280.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '550px',
              marginLeft: '10px',
              transition: 'transform 0.3s ease background-color 0.3s ease, opacity 0.8s ease', 
              cursor: 'pointer', 
            }}
            
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.04)'; 
               e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
            }}
            
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)'; 
            }}
            
          ></div>

          <div
            style={{
              flex: 1,
              backgroundColor: '#caf0f8',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginLeft: '20px',
              justifyContent: 'center',
              border: '1px solid rgba(54, 160, 226, 0.71)',
              padding: '20px 30px',
            }}
          >
            <h2
              style={{
                fontFamily: 'Menlo',
                fontStyle: 'italic',
                color: '#0A369D',
                textAlign: 'center',
                fontSize: '40px',
              }}
            >
              Experience the Pinnacle of<br />Authentic Maldivian Luxury<br /> and Hospitality
            </h2>
            <br />
            <p
              style={{
                fontFamily: 'Domine',
                fontSize: '20px',
                lineHeight: '1.8',
                color: '#4472CA',
                textAlign: 'center',
                margin: '5px',
                textAlign: 'justify'
              }}
            >
            Embark on a journey through the heart of our legacy with a special documentary that brings our story to life. Through the voices of our owners, cherished guests, and devoted team, discover the essence of our unparalleled Maldivian hospitality and the magic that makes our island a timeless sanctuary.            </p>
            <br />
            <a
              href="none"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '10px 20px',
                fontSize: '16px',
                color: '#ffffff',
                backgroundColor: '#023e8a',
                textDecoration: 'none',
                border: 'solid 1px',
                borderRadius: '5px',
                borderColor: '#0A369D',
                marginTop: '20px',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#0A369D';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#023e8a';
              }}
            >
              View Documentary
            </a>
          </div>
        </div>
      </Box>

      <Container>
        <Typography variant="h3" component="div" sx={{ color: '#0A369D', marginBottom: '20px', fontFamily: 'Dancing Script', textAlign: 'center' }}>
          <br />
          Experience the Essence of The Luxury
        </Typography><br />
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" color="#4472CA" marginBottom={3} align="justify" fontFamily='Domine' fontSize={18}>
              "The Luxury" is not just a hotel; it's an experience of refined elegance, unparalleled comfort, and exceptional service. Nestled in the heart of Colombo, The Luxury stands as a beacon of sophistication, offering guests a haven of tranquility amidst the bustling cityscape. At The Luxury, we pride ourselves on curating unforgettable experiences for our guests, ensuring that every moment spent with us is nothing short of extraordinary.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" color="#4472CA" marginBottom={3} align="justify" fontFamily='Domine' fontSize={18}>
              For those in search of relaxation and rejuvenation, our spa and wellness facilities provide a sanctuary for restorative treatments and holistic therapies. Unwind with a blissful massage, take a dip in our sparkling pool, or invigorate your senses with a yoga session overlooking panoramic vistas. In addition to our exceptional accommodations and amenities, The Luxury offers personalized concierge services to cater to your every need.
            </Typography>
          </Grid>
        </Grid>
        <br />
      </Container>

      <HomeExperience /><br />

      <Box
        bgcolor="#ffffff"
        padding="30px"
        mt="30px"
        sx={{
          width: '90%',
          position: 'relative',
          left: '80px' ,
          boxSizing: 'border-box',
        }}
      >
        <Typography
          variant="h3"
          component="div"
          sx={{
            color: '#0A369D',
            marginBottom: '30px',
            fontFamily: 'Dancing Script',
            textAlign: 'center',
          }}
        >
         
          Our Rooms
        </Typography>
        <Typography
          variant="body1"
          color="#4472CA"
          marginBottom={3}
          align="justify"
          fontFamily="Domine"
          fontSize={17}
        >
          Experience unmatched comfort and luxury during your stay at The Luxury Hotel, where our range of rooms caters to every traveler's needs. From cozy retreats ideal for romantic getaways to spacious suites perfect for family vacations, each room is meticulously designed to offer a haven of tranquility amidst the bustling cityscape. Indulge in plush furnishings, state-of-the-art amenities, and breathtaking views of the surrounding landscape, ensuring a restful and rejuvenating stay. Whether you're seeking a serene escape or an adventure-filled retreat, our variety of rooms provide the perfect backdrop for an unforgettable experience, where every moment is crafted with care to ensure your utmost satisfaction.
        </Typography>
        <br />
        <ImageGallery />
      </Box>

      <br /><br />

      <OffersSection />

      <Box bgcolor="#ffffff" padding="40px" mt="30px" minWidth='100vw'>
        <Container>
          <Typography variant="h3" component="div" sx={{ color: '#0A369D', marginBottom: '30px', fontFamily: 'Dancing Script', textAlign: 'center' }}>
            Learn More About The Luxury Hotel
          </Typography>
          <Typography variant="body1" color="#4472CA" marginBottom={3} align="justify" fontFamily='Domine' fontSize={17}>
            Experience unmatched comfort and luxury during your stay at The Luxury Hotel, where our range of rooms caters to every traveler's needs. From cozy retreats ideal for romantic getaways to spacious suites perfect for family vacations, each room is meticulously designed to offer a haven of tranquility amidst the bustling cityscape. Indulge in plush furnishings, state-of-the-art amenities, and breathtaking views of the surrounding landscape, ensuring a restful and rejuvenating stay. Whether you're seeking a serene escape or an adventure-filled retreat, our variety of rooms provide the perfect backdrop for an unforgettable experience, where every moment is crafted with care to ensure your utmost satisfaction.
          </Typography>
          <Button>Learn More</Button>
          <ImageGal />
          <br /><br />
        </Container>
      </Box>

      <FAQAccordion />
      <Experience /><br></br><br></br>
      <Footer />
    </div>
  );
};

export default HomeScreen;
