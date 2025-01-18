import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Tabs, Tab } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { animated, useSpring } from 'react-spring';
import Slider from "react-slick";  
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-calendar/dist/Calendar.css';
import BookingCalendar from './Bookingcalender';
import { useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
}

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
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);


  const handleDateRangeSelect = (from, to) => {
    setFromDate(from);
    setToDate(to);
  };

  const handleBooking = () => {
    if (fromDate && toDate) {
      navigate('/rooms', {
        state: {
          fromDate: fromDate.toISOString(), 
          toDate: toDate.toISOString()
        },
      });
    } else {
      alert('Please select a date range.');
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: isMobile? '90vh' :'98vh', opacity: '0.9' }}>
      <Slider {...settings} dots={false}>
        <div
          style={{position: 'relative',}}
        >
          <img src="https://firebasestorage.googleapis.com/v0/b/hotel-booking-system-35f4a.appspot.com/o/Public%20Folder%2Fb.jpg?alt=media&token=8cd785be-e300-498d-8593-7bdd00698924" alt="Luxury hotel" style={{ width: '100%', height: isMobile ? '50vh' : '100vh', objectFit: 'cover' }} />
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
          <img src="https://i.postimg.cc/8CYsNjcV/pexels-asadphoto-3426880.jpg" alt="ocean" style={{ width: '100%', height: isMobile ? '50vh' : '100vh'  }} />
        </div>
        <div>
          <img src="https://i.postimg.cc/yY3gdh9r/maldives-2299563-1280.jpg" alt="sea boat" style={{ width: '100%', height: isMobile ? '50vh' : '100vh' }} />
        </div>
        <div>
          <img src="https://i.postimg.cc/2SvZHdSB/flowers-1854075-1280.jpg" alt="events" style={{ width: '100%', height: isMobile ? '50vh' : '100vh' }} />
        </div>
        <div>
          <img src="https://i.postimg.cc/3w8xg24h/pexels-asadphoto-3601440.jpg" alt="ocean view" style={{ width: '100%', height: isMobile ? '50vh' : '100vh' }} />
        </div>
        <div>
          <img src="https://i.postimg.cc/NfqxcS6C/ray-954355-1280.jpg" alt="diving" style={{ width: '100%', height: isMobile ? '50vh' : '100vh' }} />
        </div>
      </Slider>

      <div style={{ position: 'absolute', top: isMobile ? '20%' : '35%', left: '50%', transform: 'translateX(-50%)' }}>
        <AnimatedText>
          <Typography 
            variant="h1" 
            component="div" 
            style={{ 
              textAlign: 'center' , 
              fontFamily:'Playfair Display', 
              color:"white", 
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', 
              fontSize: isMobile ? '36px' : '90px',
              fontWeight: 'bold',
              margin: isMobile ? '0 10px' : '0',
              padding: isMobile ? '0 10px' : '0'
            }}>
            The Luxury Stay Awaits You
          </Typography>
        </AnimatedText>
      </div>

      {/* Date Picker and Book Now */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'center',
        columnGap: isMobile ? '0' : '1vw',
        rowGap: isMobile ? '2vh' : '0',
        alignItems: 'center',
        position: isMobile ? 'relative' : 'absolute',
        bottom: isMobile ? '10%' : '20%',
        left: isMobile ? '0%' : '20%',
        width: isMobile ? '100%' : '60%',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        padding: isMobile ? '2vh 7vw' : '2vh 1.5vw 2vh 1.2vw',
        borderRadius: '6px'
      }}>

        {/* Show Booking Calendar */}
        <BookingCalendar onDateRangeSelect={handleDateRangeSelect} isMobile={isMobile} />
        <button 
          onClick={handleBooking}
          style={{
            backgroundColor: '#023e8a', 
            color: 'white', 
            padding: '10px 10px',
            marginTop: isMobile? '0' :'30px',
            borderRadius: '4px', 
            fontSize: '16px',
            cursor: 'pointer',
            width: isMobile? '100%' : '10vw',
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
    title={
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
        height: '90vh',
        position: 'relative',
        top: '20vh',
    }}
      > Our Rooms 
    </Typography>
    } backgroundImage="https://firebasestorage.googleapis.com/v0/b/hotel-booking-system-35f4a.appspot.com/o/Public%20Folder%2Froom3.png?alt=media&token=910b9e2a-54b5-436a-8c8c-1fba99b19a3d"
  />
);


export const FacilitiesTabContent = () => (
  <TabContent
    title={
    <Typography 
      variant="h1" 
      component="div" 
      style={{textAlign: 'center' , 
        fontFamily:'Playfair Display', 
        color:"white", 
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', 
        fontSize: '90px',
        fontWeight: 'bold',
        height: '90vh',
        position: 'relative',
        top: '30vh',
      }}
      > Facilities we offer </Typography>
    } backgroundImage="https://firebasestorage.googleapis.com/v0/b/hotel-booking-system-35f4a.appspot.com/o/Public%20Folder%2FSwimming.png?alt=media&token=a8b2c994-cf8e-429c-b874-fd01b633a44e" />
);

export const ContactTabContent = () => (
  <TabContent
    title={
    <Typography 
      variant="h1" 
      component="div" 
      style={{textAlign: 'center' , 
        fontFamily:'Playfair Display', 
        color:"white", 
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', 
        fontSize: '90px',
        fontWeight: 'bold',
        height: '90vh',
        position: 'relative',
        top: '30vh',
      }}
      > Contact us </Typography>
    } backgroundImage="https://i.postimg.cc/Wb5WNvG7/pexels-asadphoto-1483053.jpg" />
);

export const LoginTabContent = () => (
  <TabContent
    title={
    <Typography 
      variant="h1" 
      component="div" 
      style={{textAlign: 'center' , 
        fontFamily:'Playfair Display', 
        color:"white", 
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', 
        fontSize: '90px',
        fontWeight: 'bold',
        height: '90vh',
        position: 'relative',
        top: '30vh',
      }}
      > Login with us </Typography>
    } backgroundImage="https://i.postimg.cc/ZRTKbj5d/pexels-richard-segal-732340-1645028.jpg" />
);

export const RegisterTabContent = () => (
  <TabContent
    title={
    <Typography 
    variant="h1"
    component="div" 
    style={{textAlign: 'center' , 
      fontFamily:'Playfair Display', 
      color:"white", 
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', 
      fontSize: '90px',
      fontWeight: 'bold',
      height: '90vh',
      position: 'relative',
      top: '30vh',
    }}
      > Register with us </Typography>
    } backgroundImage="https://firebasestorage.googleapis.com/v0/b/hotel-booking-system-35f4a.appspot.com/o/Public%20Folder%2Flogin.jpg?alt=media&token=a810ff0a-6305-4be3-8a40-d0abbb0b8875" />
);

export const PaymentGateway = () => (
  <TabContent
    title={
    <Typography
      variant="h1"
      component="div"
      style={{textAlign: 'center' ,
        fontFamily:'Playfair Display',
        color:"white",
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        fontSize: '90px',
        fontWeight: 'bold',
        height: '90vh',
        position: 'relative',
        top: '40vh',
      }}
      > Payment Gateway </Typography>
    } backgroundImage="https://barn2.com/wp-content/uploads/2023/01/Top-payment-gateways-for-WooCommerce-Header.png" />
);


export const AccountTabContent = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    setUser(currentUser);
  }, []);

  return (
    <TabContent
      title={
        <Typography
          variant="h1"
          component="div"
          style={{
            textAlign: 'center',
            fontFamily: 'Playfair Display',
            color: "white",
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            fontSize: '90px',
            fontWeight: 'bold',
            height: '90vh',
            position: 'relative',
            top: '40vh',
          }}
        >
          {user ? (user.isAdmin ? "Admin Dashboard" : "My Account") : "My Account"}
        </Typography>
      }
      backgroundImage="https://firebasestorage.googleapis.com/v0/b/hotel-booking-system-35f4a.appspot.com/o/Public%20Folder%2FSpa.png?alt=media&token=f0e89146-dbfe-4a98-9eae-a1243bfb8de3"
    />
  );
};


const Navigation = () => {
  const [value, setValue] = useState(0);
  const [user, setUser] = useState();
  const location = useLocation();

  const isMobile = useIsMobile();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    setUser(currentUser);
    console.log('User:', currentUser);
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
    } else if (/^\/account\/[a-zA-Z0-9]+$/.test(location.pathname)) {
      setValue(7);
    }
    else if (location.pathname === '/admin') {
      setValue(8);
    } else if (/^\/rooms\/payment\/[a-zA-Z0-9]+$/.test(location.pathname)) {  
      setValue(10);
    } else {
      setValue(0);
    }
  }, [location, user]);

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

  const handleDrawerOpen = () => setMobileOpen(true);
  const handleDrawerClose = () => setMobileOpen(false);

  const leftLinks = [
    { label: 'Home', path: '/', tabValue: 0 },
    { label: 'Rooms', path: '/rooms', tabValue: 1 },
    { label: 'Facilities', path: '/facilities', tabValue: 2 },
    { label: 'Contact', path: '/contact', tabValue: 3 },
  ];

  const rightLinks = [
    !user && { label: 'Login', path: '/login', tabValue: 5 },
    !user && { label: 'Register', path: '/register', tabValue: 6 },
    user && !user.isAdmin && { label: 'Account', path: `/account/${user?.id}`, tabValue: 7 },
    user && user.isAdmin && { label: 'Admin Panel', path: '/admin', tabValue: 8 },
    user && { label: 'Logout', path: null, tabValue: 9 }
  ].filter(Boolean);

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
          backgroundColor: isMobile? 'rgba(0, 62, 138)' : backgroundColor,
          backdropFilter: isMobile? 'none' :'blur(10px)',
          boxShadow: 'none',
          height: isMobile ? '80px' :  '85px',
        }}
      >
        <Toolbar
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '100%',
            padding: '0 2vw', 
            maxWidth: '100vw'
          }}
        >
          {/* Left Tabs */}
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontSize: isMobile ? '20px' : '30px',
              color: 'white', 
              textAlign: 'left',
              flex: 1, 
            }}
            style={{ width: 'fit-content' }}
          >
            THE HOTEL LUXURY
          </Typography>

          {isMobile ? (
            /* MOBILE VIEW */
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                style={{ color: 'white' }}
                onClick={handleDrawerOpen}
              >
                <MenuIcon />
              </IconButton>
            </div>
          ) : (
            /* DESKTOP VIEW */
            <>
              {/* Left Tabs */}
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="inherit"
                TabIndicatorProps={{
                  style: {
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    height: "2px",
                    marginBottom: "5px"
                  }
                }}
                sx={{
                  '.MuiTab-root': {
                    fontFamily: "'Playfair Display', serif",
                    fontSize: isMobile ? '14px' : '20px',
                    textTransform: 'none',
                    minWidth: '5vw',
                    marginLeft: '1vw',
                    color: "white",
                    transition: 'color 0.3s ease',
                    padding: 0
                  },
                }}
                style={{
                  flex: 2,
                  marginLeft: '11vw',
                  minWidth: 'auto'
                }}
              >
                {leftLinks.map((link) => (
                  <Tab
                    key={link.label}
                    label={link.label}
                    component={Link}
                    to={link.path}
                    value={link.tabValue}
                  />
                ))}
              </Tabs>

              {/* Right Tabs */}
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="inherit"
                TabIndicatorProps={{
                  style: { backgroundColor: 'rgba(255,255,255,0.9)', height: "0px" }
                }}
                sx={{
                  '.MuiTab-root': {
                    fontFamily: "'Playfair Display', serif",
                    fontSize: isMobile ? '14px' : '20px',
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
                      scale: 1.001
                    }
                  }
                }}
                style={{
                  padding: '20px 10px'
                }}
              >
                {rightLinks.map((link) => {
                  if (link.label === 'Logout') {
                    return (
                      <Tab
                        key={link.label}
                        label={link.label}
                        onClick={handleLogout}
                        value={link.tabValue}
                      />
                    );
                  }
                  return (
                    <Tab
                      key={link.label}
                      label={link.label}
                      component={Link}
                      to={link.path || '#'}
                      value={link.tabValue}
                    />
                  );
                })}
              </Tabs>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerClose}
        PaperProps={{
          style: { width: '70vw', backgroundColor: '#023e8a' }
        }}
      >
        <List style={{ marginTop: '20px' }}>
          {/* Left Nav Links */}
          {leftLinks.map((link) => (
            <ListItem
              button
              key={link.label}
              onClick={() => {
                handleDrawerClose();
                setValue(link.tabValue);
              }}
              component={Link}
              to={link.path}
              style={{
                borderBottom: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              <ListItemText
                primary={link.label}
                primaryTypographyProps={{
                  style: {
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '18px',
                    color: 'white'
                  }
                }}
              />
            </ListItem>
          ))}
          {/* Right Nav Links */}
          {rightLinks.map((link) => {
            if (link.label === 'Logout') {
              return (
                <ListItem
                  button
                  key={link.label}
                  onClick={() => {
                    handleLogout();
                    handleDrawerClose();
                  }}
                  style={{
                    borderBottom: '1px solid rgba(255,255,255,0.2)',
                  }}
                >
                  <ListItemText
                    primary={link.label}
                    primaryTypographyProps={{
                      style: {
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '18px',
                        color: 'white',
                      }
                    }}
                  />
                </ListItem>
              );
            }
            return (
              <ListItem
                button
                key={link.label}
                onClick={() => {
                  handleDrawerClose();
                  setValue(link.tabValue);
                }}
                component={Link}
                to={link.path || '#'}
                style={{
                  borderBottom: '1px solid rgba(255,255,255,0.2)'
                }}
              >
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{
                    style: {
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '18px',
                      color: 'white'
                    }
                  }}
                />
              </ListItem>
            );
          })}
        </List>
      </Drawer>

      {/* Tab Content */}
      <div style={{ position: 'relative', minHeight: isMobile? '89vh': '98vh', marginTop: isMobile ? '70px' : '0', backgroundColor: 'white' }}>
        {value === 0 && <HomeTabContent />}
        {value === 1 && <RoomsTabContent />}
        {value === 2 && <FacilitiesTabContent />}
        {value === 3 && <ContactTabContent />}
        {value === 5 && <LoginTabContent />}
        {value === 6 && <RegisterTabContent />}
        {value === 7 && <AccountTabContent />}
        {value === 8 && <AccountTabContent />}
        {value === 10 && <PaymentGateway />}
      </div>
    </div>
  );
};

export default Navigation;