// import React, { useState } from 'react';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import axios from 'axios';
// import { Snackbar, Slide } from '@mui/material';
// import './Login.css';
// import { Link } from 'react-router-dom';

// import Footer from '../components/Footer';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarType, setSnackbarType] = useState('');
//   const [loading, setLoading] = useState(false);


//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSnackbarMessage('');
//     setSnackbarType('');
//     setLoading(true);

//     try {
//       const response = await axios.post('http://localhost:6000/api/users/login', {
//         email: formData.email,
//         password: formData.password,
//       });

//       const { token, user } = response.data;

//       localStorage.setItem('currentUser', JSON.stringify(user));
//       localStorage.setItem('token', token);

//       setSnackbarType('success');
//       setSnackbarMessage(response.data.message || 'You logged in successfully.');
//       setOpenSnackbar(true);

//       setTimeout(() => {
//         window.location.href = '/'; 
//       }, 3000);
//     } catch (error) {
//       setSnackbarType('error');
//       setSnackbarMessage(
//         error.response?.data?.message || 'Login failed. Please try again.'
//       );
//       setOpenSnackbar(true);
//     }
//     setLoading(false);
//   };

//   const handleSocialLogin = (provider) => {
//     const url = `http://localhost:6000/api/users/auth/${provider}`;
//     window.location.href = url;
//   };

//   const handleSnackbarClose = () => {
//     setOpenSnackbar(false);
//   };

//   const TransitionUp = (props) => {
//     return <Slide {...props} direction="up" />;
//   };

//   return (
//     <>
//       <div className="container">
//         <div className="left">
//           <div className="slider">
//             <img
//               src="https://i.postimg.cc/YqvgFBcR/pexels-asadphoto-3319704.jpg"
//               alt="Slide 1"
//               className="sliderImage"
//             />
//           </div>
//         </div>

//         <div className="right">
//           <div className="formContainer">
//             <div className="logo">★</div>
//             <h2 className="heading">Welcome Back and Please Login!</h2>
//             <p className="subtext">Please enter your login details</p>

//             <form onSubmit={handleSubmit}>
//               <input
//                 type="email"
//                 placeholder="Email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="input"
//                 required
//               />
//               <div className="passwordField">
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   placeholder="Password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="input"
//                   required
//                 />
//                 <span onClick={() => setShowPassword(!showPassword)} className="icon">
//                   {showPassword ? <FaEyeSlash /> : <FaEye />}
//                 </span>
//               </div>

//               <div className="login-center-options">
//                 <div className="remember-div">
//                   <input type="checkbox" id="remember-checkbox" />
//                   <label htmlFor="remember-checkbox">
//                     Remember me
//                   </label>
//                 </div>
//                 <Link to="/forgot-password" className="forgot-pass-link">
//                   Forgot password?
//                 </Link>

//               </div>

//               <button type="submit" className="loginButton" disabled={loading}>
//                 {loading ? 'Logging In...' : 'Log In'}
//               </button>
//               <button
//                 type="button"
//                 className="googleButton"
//                 onClick={() => handleSocialLogin('google')}
//               >
//                 <img
//                   src="https://developers.google.com/identity/images/g-logo.png"
//                   alt="Google"
//                   className="socialIcon"
//                 />
//                 Log In with Google
//               </button>
//               <button
//                 type="button"
//                 className="facebookButton"
//                 onClick={() => handleSocialLogin('facebook')}
//               >
//                 <img
//                   src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
//                   alt="Facebook"
//                   className="socialIcon"
//                 />
//                 Log In with Facebook
//               </button>
//             </form>
//             <p>
//             <p>
//             Don't have an account? <Link to="/register" className="link">Sign Up</Link>
//           </p>
//             </p>
//           </div>
//         </div>

//         {/* Snackbar for success or error message */}
//         <Snackbar
//           open={openSnackbar}
//           autoHideDuration={3000} 
//           onClose={handleSnackbarClose}
//           message={snackbarMessage}
//           TransitionComponent={TransitionUp}
//           anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//           ContentProps={{
//             className: snackbarType === 'error' ? 'errorSnackbar' : 'successSnackbar',
//           }}
//         />
//       </div><br></br><br></br>
//       <Footer />
//     </>
//   );
// };

// export default Login;



import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { Snackbar, Slide } from '@mui/material';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSnackbarMessage('');
    setSnackbarType('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/users/login', {
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = response.data;

      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('token', token);

      setSnackbarType('success');
      setSnackbarMessage(response.data.message || 'You logged in successfully.');
      setOpenSnackbar(true);

      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
    } catch (error) {
      setSnackbarType('error');
      setSnackbarMessage(
        error.response?.data?.message || 'Login failed. Please try again.'
      );
      setOpenSnackbar(true);
    }
    setLoading(false);
  };
  
  const handleSocialLogin = (provider) => {
    const url = `http://localhost:6000/api/users/auth/${provider}`;
    window.location.href = url;
  };

  return (
    <div style={{ display: 'flex', height: '90vh', backgroundColor: 'rgba(240,240,240,1)'}}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(240,240,240,1)' }}>
        <div>
          <img
            src="https://i.postimg.cc/YqvgFBcR/pexels-asadphoto-3319704.jpg"
            alt="Slide 1"
            style={{ maxWidth: '100%' }}
          />
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
        <div style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <div style={{ fontSize: '30px', color: 'black', marginBottom: '20px' }}>★</div>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>Welcome Back and Please Login!</h2>
          <p style={{ color: '#6b6b6b', fontSize: '16px', marginBottom: '20px' }}>Please enter your login details</p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ width: '100%', padding: '14px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '5px', fontSize: '16px' }}
              required
            />
            <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                style={{ width: '100%', padding: '14px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '5px', fontSize: '16px' }}
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '12px', cursor: 'pointer', color: '#888' }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '14px',
                  backgroundColor: 'black',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginTop: '15px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  transition: 'transform 0.2s, background-color 0.3s',
                }}
                disabled={loading}
              >
                {loading ? 'Logging In...' : 'Log In'}
              </button>
               <button
                type="button"
                className="googleButton"
                onClick={() => handleSocialLogin('google')}
                style={{ 
                  width: "100%",
                  padding: "14px",
                  margin: "10px 0",
                  borderRadius: "5px",
                  border: "1px solid #4285F4", // Google blue
                  backgroundColor: "white",
                  color: "#4285F4", // Google blue
                  cursor: "pointer",
                  fontSize: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  gap: "10px",
                 }}
              >
                <img
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="Google"
                  className="socialIcon"
                  style={{ height: '20px', marginRight: '8px' }}
                />
                Log In with Google
              </button>
              <button
                type="button"
                className="facebookButton"
                onClick={() => handleSocialLogin('facebook')}
                style={{ 
                  width: "100%",
                  padding: "14px",
                  margin: "10px 0",
                  borderRadius: "5px",
                  border: "1px solid #1877F2", // Facebook blue
                  backgroundColor: "#1877F2",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  gap: "10px",
                }}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                  alt="Facebook"
                  className="socialIcon"
                  style={{ height: '20px' }}
                />
                Log In with Facebook
              </button>
          </form>
          <p style={{ color: '#6b6b6b', fontSize: '14px', textDecoration: 'none', marginTop: '10px' }}>
            Don't have an account? <Link to="/register" style={{ color: '#007bff' }}>Sign Up</Link>
          </p>
        </div>

      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
        TransitionComponent={Slide}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        ContentProps={{
          className: snackbarType === 'error' ? 'errorSnackbar' : 'successSnackbar',
        }}
      />
    </div>
  );
};

export default Login;

