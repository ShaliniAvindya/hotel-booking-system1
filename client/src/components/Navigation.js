import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Tabs, Tab } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { animated, useSpring } from 'react-spring';
import Slider from "react-slick";  
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-calendar/dist/Calendar.css';
import BookingCalendar from './Bookingcalender';

const AnimatedText = ({ children }) => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  const props = useSpring({
    opacity: visible ? 1 : 0,
    transform: 'scale(1)',
    from: { opacity: 0, transform: 'scale(1.5)' }
  });

  return <animated.div style={props}>{children}</animated.div>;
};

const HomeTabContent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const handleDateRangeSelect = (from, to) => {
    setFromDate(from);
    setToDate(to);
  };

  const handleBooking = () => {
    if (fromDate && toDate) {
      alert(`Booking confirmed! From: ${fromDate.toLocaleDateString()} To: ${toDate.toLocaleDateString()}`);
    } else {
      alert('Please select a date range.');
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '98vh', opacity: '0.9' }}>
      <Slider {...settings} dots={false}>
        <div
          style={{position: 'relative',}}
        >
          <img src="https://firebasestorage.googleapis.com/v0/b/hotel-booking-system-35f4a.appspot.com/o/Public%20Folder%2Fb.jpg?alt=media&token=8cd785be-e300-498d-8593-7bdd00698924" alt="Luxury hotel" style={{ width: '100%', height: '100vh', objectFit: 'cover' }} />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6), transparent 30%, transparent 70%, rgba(0, 0, 0, 0.5))',
            }}
          />
        </div>
        <div>
          <img src="https://i.postimg.cc/8CYsNjcV/pexels-asadphoto-3426880.jpg" alt="ocean" style={{ width: '100%', height: '100vh' }} />
        </div>
        <div>
          <img src="https://i.postimg.cc/yY3gdh9r/maldives-2299563-1280.jpg" alt="sea boat" style={{ width: '100%', height: '100vh' }} />
        </div>
        <div>
          <img src="https://i.postimg.cc/2SvZHdSB/flowers-1854075-1280.jpg" alt="events" style={{ width: '100%', height: '100vh' }} />
        </div>
        <div>
          <img src="https://i.postimg.cc/3w8xg24h/pexels-asadphoto-3601440.jpg" alt="ocean view" style={{ width: '100%', height: '100vh' }} />
        </div>
        <div>
          <img src="https://i.postimg.cc/NfqxcS6C/ray-954355-1280.jpg" alt="diving" style={{ width: '100%', height: '100vh' }} />
        </div>
      </Slider>

      <div style={{ position: 'absolute', top: '35%', left: '50%', transform: 'translateX(-50%)' }}>
        <AnimatedText>
          <Typography 
            variant="h1" 
            component="div" 
            style={{ 
              textAlign: 'center' , 
              fontFamily:'Playfair Display', 
              color:"white", 
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', 
              fontSize: '90px',
              fontWeight: 'bold',
            }}>
            The Luxury Stay Awaits You
          </Typography>
        </AnimatedText>
      </div>

      {/* Date Picker and Book Now */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        columnGap: '1vw',
        alignItems: 'center',
        position: 'absolute',
        bottom: '20%',
        left: '20%',
        width: '60%',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        padding: '2vh 1.5vw 2vh 1.2vw',
        borderRadius: '6px',
      }}>

        {/* Show Booking Calendar */}
        <BookingCalendar onDateRangeSelect={handleDateRangeSelect} />
        <button 
          onClick={handleBooking}
          style={{
            backgroundColor: '#023e8a', 
            color: 'white', 
            padding: '10px 10px',
            marginTop: '30px',
            borderRadius: '4px', 
            fontSize: '16px',
            cursor: 'pointer',
            width: '10vw',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#001845')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#023e8a')}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

// Tab Content Component to be used for Rooms, Facilities, Contact, Login, etc.
const TabContent = ({ title, backgroundImage }) => (
  <div
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      minHeight: '98vh',
      opacity: '0.9',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'black',
    }}
  >
    <AnimatedText>
      <Typography variant="h1" component="div" style={{ textAlign: 'center' }} marginTop={11} fontFamily={'Playfair Display'}>
        {title}
      </Typography>
    </AnimatedText>
  </div>
);

export const RoomsTabContent = () => (
  <TabContent
    title={<Typography variant="h1" component="div" style={{ textAlign: 'center', fontFamily: 'Playfair Display', color: "#001845", WebkitTextStroke: '1.3px white',}}
      > Our Rooms </Typography>
    } backgroundImage="https://firebasestorage.googleapis.com/v0/b/hotel-booking-system-35f4a.appspot.com/o/Public%20Folder%2Froom3.png?alt=media&token=910b9e2a-54b5-436a-8c8c-1fba99b19a3d"
  />
);


export const FacilitiesTabContent = () => (
  <TabContent
    title={<Typography variant="h1" component="div" style={{ textAlign: 'center', fontFamily: 'Playfair Display', color: "#001845", WebkitTextStroke: '1.3px white',}}
      > Facilities we offer </Typography>
    } backgroundImage="https://firebasestorage.googleapis.com/v0/b/hotel-booking-system-35f4a.appspot.com/o/Public%20Folder%2FSwimming.png?alt=media&token=a8b2c994-cf8e-429c-b874-fd01b633a44e" />
);

export const ContactTabContent = () => (
  <TabContent
    title={<Typography variant="h1" component="div" style={{ textAlign: 'center', fontFamily: 'Playfair Display', color: "#001845", WebkitTextStroke: '1.3px white',}}
      > Contact us </Typography>
    } backgroundImage="https://i.postimg.cc/Wb5WNvG7/pexels-asadphoto-1483053.jpg" />
);

export const LoginTabContent = () => (
  <TabContent
    title={<Typography variant="h1" component="div" style={{ textAlign: 'center', fontFamily: 'Playfair Display', color: "#001845", WebkitTextStroke: '1.3px white',}}
      > Login with us </Typography>
    } backgroundImage="https://i.postimg.cc/ZRTKbj5d/pexels-richard-segal-732340-1645028.jpg" />
);

export const RegisterTabContent = () => (
  <TabContent
    title={<Typography variant="h1" component="div" style={{ textAlign: 'center', fontFamily: 'Playfair Display', color: "#001845", WebkitTextStroke: '1.3px white',}}
      > Register with us </Typography>
    } backgroundImage="https://firebasestorage.googleapis.com/v0/b/hotel-booking-system-35f4a.appspot.com/o/Public%20Folder%2Flogin.jpg?alt=media&token=a810ff0a-6305-4be3-8a40-d0abbb0b8875" />
);


export const AccountTabContent = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    setUser(currentUser);
  }, []);

  return (
    <div style={{ 
      position: 'relative', 
      backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/hotel-booking-system-35f4a.appspot.com/o/Public%20Folder%2FSpa.png?alt=media&token=f0e89146-dbfe-4a98-9eae-a1243bfb8de3')`,
      backgroundSize: 'cover',
      height: '100vh', 
      opacity: 0.86,
      color: "#001845",
      WebkitTextStroke: '1.3px white',

    }}>
      <TabContent
        title={user ? (user.isAdmin ? "Admin Dashboard" : "My Account") : "My Account"}
      />
    </div>
  );
};

const Navigation = () => {
  const [value, setValue] = useState(0);
  const [user, setUser] = useState();
  const location = useLocation();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    setUser(currentUser);
  }, []);

  useEffect(() => {
    if (location.pathname === '/rooms') {
      setValue(1);
    } else if (location.pathname === '/facilities') {
      setValue(2);
    } else if (location.pathname === '/contact') {
      setValue(3);
    } else if (location.pathname === '/login') {
      setValue(5);
    } else if (location.pathname === '/register') {
      setValue(6);
    } else if (location.pathname === '/account') {
      setValue(7);
    } else {
      setValue(0);
    }
  }, [location]);

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const opacity = Math.min(1, (scrollPosition / 400)); 
  const backgroundColor = `rgba(0, 62, 138, ${opacity})`;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.href = '/';
  };

  return (
    <div>
      <AppBar 
        position="fixed"
        style={{
          backgroundColor: backgroundColor,
          backdropFilter: 'blur(10px)',
          boxShadow: 'none',
          height: '85px',
        }}
      >
        <Toolbar
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '100%',
            padding: '0 2vw', 
          }}
        >
          {/* Left Tabs */}
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '30px',
              color: 'white', 
              textAlign: 'left',
              flex: 1, 
            }}
          >
            THE HOTEL LUXURY
          </Typography>

          <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            TabIndicatorProps={{ style: {backgroundColor: 'rgba(255,255,255,0.9)' ,height: "2px", marginBottom: "5px" } }}
            sx={{
              '.MuiTab-root': {
                fontFamily: "'Playfair Display', serif",
                fontSize: '20px',
                textTransform: 'none', 
                minWidth: '5vw', 
                marginLeft: '1vw',
                color: "white",
                transition: 'color 0.3s ease',
              },
              flex: 2,
              marginLeft: '11vw',
            }}
          >
            <Tab label="Home" component={Link} to="/" value={0} />
            <Tab label="Rooms" component={Link} to="/rooms" value={1} />
            <Tab label="Facilities" component={Link} to="/facilities" value={2} />
            <Tab label="Contact" component={Link} to="/contact" value={3} />
          </Tabs>

          {/* Right Tabs */}
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            sx={{
              '.MuiTab-root': {
                fontFamily: "'Playfair Display', serif",
                fontSize: '20px',
                textTransform: 'none', 
                minWidth: '8vw',
                marginLeft: '1vw',
                padding: '0px 10px',
                color: 'white', 
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '25px',
                border: '1px solid white',
                transition: 'background-color 0.3s ease, color 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  color: "white",
                  scale: 1.001,
                }
              }
            }}
            style={{ marginRight: '1vw',padding: '20px 10px',}}
          >
            {!user && <Tab label="Login" component={Link} to="/login" value={5} />}
            {!user && <Tab label="Register" component={Link} to="/register" value={6} />}
            {user && !user.isAdmin && <Tab label="Account" component={Link} to="/account" value={7} />}
            {user && user.isAdmin && <Tab label="Admin Panel" component={Link} to="/admin" value={8} />}
            {user && <Tab label="Logout" onClick={handleLogout} value={9} />}
          </Tabs>
        </Toolbar>
      </AppBar>

      {/* Tab Content */}
      <div style={{ position: 'relative', minHeight: '98vh' }}>
        {value === 0 && <HomeTabContent />}
        {value === 1 && <RoomsTabContent />}
        {value === 2 && <FacilitiesTabContent />}
        {value === 3 && <ContactTabContent />}
        {value === 5 && <LoginTabContent />}
        {value === 6 && <RegisterTabContent />}
        {value === 7 && <AccountTabContent />}
      </div>
    </div>
  );
};

export default Navigation;
