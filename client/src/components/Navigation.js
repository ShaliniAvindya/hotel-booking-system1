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
      <Slider {...settings}>
        <div>
          <img src="https://firebasestorage.googleapis.com/v0/b/hotel-booking-system-35f4a.appspot.com/o/Public%20Folder%2Fb.jpg?alt=media&token=8cd785be-e300-498d-8593-7bdd00698924" alt="Luxury hotel" style={{ width: '100%', height: '100vh' }} />
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

      <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translateX(-50%)' }}>
        <AnimatedText>
          <Typography variant="h1" component="div" style={{ textAlign: 'center' , fontFamily:'Playfair Display', color:"#001845" ,WebkitTextStroke: '1.3px white',}}>
            The Luxury Stay Awaits You
          </Typography>
        </AnimatedText>
      </div>

      {/* Date Picker and Book Now */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        bottom: '5%',
        width: '60%',
        marginLeft: '340px',
      }}>

        {/* Show Booking Calendar */}
        <BookingCalendar onDateRangeSelect={handleDateRangeSelect} />
        <button 
  onClick={handleBooking}
  style={{
    backgroundColor: '#023e8a', 
    color: 'white', 
    padding: '10px 20px',
    border: 'none', 
    borderRadius: '4px', 
    fontSize: '16px',
    cursor: 'pointer', 
    position: 'absolute', 
    bottom: '5%', 
    left: '105%', 
    transform: 'translateX(-50%)', 
    transition: 'background-color 0.3s ease', 
  }}
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
  const [navBackground, setNavBackground] = useState('transparent');
  const [value, setValue] = useState(0);
  const [user, setUser] = useState();
  const [textColor, setTextColor] = useState('white'); // Track text color
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const navbarHeight = 80;

      if (scrollPosition > navbarHeight) {
        setNavBackground('#023e8a');
        setTextColor('white'); 
      } else {
        setNavBackground('transparent');
        setTextColor('black'); 
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
          backgroundColor: navBackground,
          boxShadow: 'none',
          height: '100px',
        }}
      >
        <Toolbar
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '100%',
            padding: '0 20px', 
          }}
        >
          {/* Left Tabs */}
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            sx={{
              '.MuiTab-root': {
                fontFamily: "'Playfair Display', serif",
                fontSize: '23px',
                textTransform: 'none', 
                minWidth: '80px', 
                marginLeft: '5px',
                color: textColor, // Apply dynamic text color
              },
            }}
          >
            <Tab label="Home" component={Link} to="/" value={0} />
            <Tab label="Rooms" component={Link} to="/rooms" value={1} />
            <Tab label="Facilities" component={Link} to="/facilities" value={2} />
            <Tab label="Contact" component={Link} to="/contact" value={3} />
          </Tabs>

          {/* Center Title */}
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '40px',
              color: textColor, // Apply dynamic text color
              textAlign: 'center',
              flex: 1, 
              marginLeft: '-180px'
            }}
          >
            THE HOTEL LUXURY
          </Typography>

          {/* Right Tabs */}
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            sx={{
              '.MuiTab-root': {
                fontFamily: "'Playfair Display', serif",
                fontSize: '23px',
                textTransform: 'none', 
                minWidth: '80px',
                marginLeft: '4px', // Add spacing between tabs
                marginRight: '10px',
                color: textColor, // Apply dynamic text color
              },
            }}
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
