import React, { useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Grid, Button, Divider } from '@mui/material';
import Swal from 'sweetalert2';
import AdminPanel from './AdminPanel';
import Footer from '../components/Footer';
import EmailIcon from '@mui/icons-material/Email';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

const Account = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const { id: id, name, email, isAdmin: admin } = currentUser;

  const [ongoingBookings, setOngoingBookings] = useState([]);
  const [previousBookings, setPreviousBookings] = useState([]);
  const [roomImages, setRoomImages] = useState({}); 
  const [newName, setNewName] = useState(name); 
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [openNameDialog, setOpenNameDialog] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);


  // Fetch booking data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/book/${id}`);
        if (!response.ok) throw new Error('Failed to fetch booking data');
        const data = await response.json();
        const ongoing = data.filter((b) => b.status === 'Booked');
        const previous = data.filter((b) => b.status === 'Cancelled').slice(0, 5);

        // Preload room images for ongoing bookings
        const images = {};
        await Promise.all(
          ongoing.map(async (booking) => {
            const roomResponse = await fetch(`http://localhost:8000/api/rooms/${booking.room_id}`);
            const roomData = await roomResponse.json();
            images[booking.room_id] = roomData.imageUrls[0]; // Store the first image for the room
          })
        );

        setRoomImages(images);
        setOngoingBookings(ongoing);
        console.log(previous)
        setPreviousBookings(previous);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchData();
  }, [id]);

  // Cancel booking handler
  const handleCancelBooking = (bookingId) => {
    fetch(`http://localhost:8000/api/book/cancel/${bookingId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then(() => {
        Swal.fire('Success', 'Your booking has been cancelled.', 'success').then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        console.error('Error canceling booking:', error);
        Swal.fire('Error', 'Something went wrong.', 'error');
      });
  };

  const handleOpenNameDialog = () => setOpenNameDialog(true);
  const handleCloseNameDialog = () => setOpenNameDialog(false);

  const handleOpenPasswordDialog = () => setOpenPasswordDialog(true);
  const handleClosePasswordDialog = () => {
    setOpenPasswordDialog(false);
    setNewPassword('');
    setConfirmPassword('');
  };
  const handleSaveName = () => {
    if (!newName) {
      Swal.fire('Error', 'Name cannot be empty.', 'error');
      return;
    }

    fetch(`http://localhost:8000/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName }),
    })
      .then((response) => {
        if (response.ok) {
          Swal.fire('Success', 'Name updated successfully.', 'success').then(() => {
            localStorage.setItem(
              'currentUser',
              JSON.stringify({ ...currentUser, name: newName })
            );
          });
          setOpenNameDialog(false);
          window.location.reload();
        } else {
          Swal.fire('Error', 'Failed to update name.', 'error');
        }
      })
      .catch((error) => {
        console.error('Error updating name:', error);
        Swal.fire('Error', 'Something went wrong.', 'error');
      });
  };

  const handleSavePassword = () => {
    if (!newPassword || !confirmPassword) {
      Swal.fire('Error', 'Both password fields are required.', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      Swal.fire('Error', 'Passwords do not match.', 'error');
      return;
    }

    fetch(`http://localhost:8000/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: newPassword }),
    })
      .then((response) => {
        if (response.ok) {
          setOpenPasswordDialog(false); 
          Swal.fire('Success', 'Password updated successfully.', 'success');
          
        } else {
          Swal.fire('Error', 'Failed to update password.', 'error');
        }
      })
      .catch((error) => {
        console.error('Error updating password:', error);
        Swal.fire('Error', 'Something went wrong.', 'error');
      });
  };

  return (
    <div style={{ minHeight: '90vh', backgroundColor: 'rgba(240,240,240,1)' }}>
      <div
        style={{
          textAlign: 'center',
          padding: '20px 0',
          background: '#f5f5f5',
          borderBottom: '2px solid #e0e0e0',
        }}
      >
        <Typography variant="h4" style={{ fontWeight: 'bold', color: '#333' }}>
          Welcome to THE LUXURY, <span style={{ fontSize: '45px', color: 'rgb(0, 62, 138)' }}>{name}</span>!
        </Typography>
        <Typography
          variant="subtitle1"
          style={{
            color: '#666',
            margin: '10px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <EmailIcon style={{ marginRight: '8px', color: '#666' }} />
          {email}
        </Typography>
        <div style={{ marginTop: '20px' }}>
          <Button
            variant="contained"
            style={{ backgroundColor: '#007bff', color: 'white', marginRight: '10px' }}
            onClick={handleOpenNameDialog}
          >
            Change Name
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: '#007bff', color: 'white' }}
            onClick={handleOpenPasswordDialog}
          >
            Change Password
          </Button>
        </div>
        <Divider style={{ margin: '20px 0' }} />
      </div>
      <Dialog open={openNameDialog} onClose={handleCloseNameDialog} fullWidth maxWidth="sm">
        <DialogTitle style={{ textAlign: 'center', fontWeight: 'bold' }}>Change Name</DialogTitle>
        <DialogContent style={{ padding: '20px 24px' }}>
          <TextField
            label="New Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            fullWidth
            style={{ marginBottom: '15px' }}
          />
        </DialogContent>
        <DialogActions style={{ padding: '20px 24px', justifyContent: 'space-between' }}>
          <Button onClick={handleCloseNameDialog} style={{ color: '#d32f2f' }}>
            Cancel
          </Button>
          <Button
            onClick={handleSaveName}
            variant="contained"
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Changing Password */}
      <Dialog open={openPasswordDialog} onClose={handleClosePasswordDialog} fullWidth maxWidth="sm">
        <DialogTitle style={{ textAlign: 'center', fontWeight: 'bold' }}>Change Password</DialogTitle>
        <DialogContent style={{ padding: '20px 24px' }}>
          <TextField
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            style={{ marginBottom: '15px' }}
          />
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions style={{ padding: '20px 24px', justifyContent: 'space-between' }}>
          <Button onClick={handleClosePasswordDialog} style={{ color: '#d32f2f' }}>
            Cancel
          </Button>
          <Button
            onClick={handleSavePassword}
            variant="contained"
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <div style={{ padding: '2vh 4vw' }}>
        <Typography
          style={{
            margin: '20px 0',
            color: '#333',
            fontSize: '40px',
            fontWeight: 'bold',
            fontWeight: 700,
            textAlign: 'center',
          }}
        >
          Ongoing Bookings
        </Typography>
        <Grid container spacing={3}>
          {ongoingBookings.length > 0 ? (
            ongoingBookings.map((booking) => (
              <Grid item xs={12} sm={6} key={booking.transaction_id}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'linear-gradient(145deg, #f7f8fa, #ffffff)',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                    borderRadius: '15px',
                    height: '16vh',
                  }}
                >
                  {roomImages[booking.room_id] ? (
                    <img
                      src={roomImages[booking.room_id]}
                      alt={booking.room}
                      style={{
                        height: '100%',
                        width: '25%',
                        borderRadius: '10px 0 0 10px',
                        marginRight: '0.5vw',
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '25%',
                        height: '100%',
                        borderRadius: '10px',
                        marginRight: '0.5vw',
                        backgroundColor: '#e0e0e0',
                      }}
                    ></div>
                  )}
                  <div style={{ padding: '2vh 1vh', display: 'flex', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                      <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '' }}>
                        {booking.room}
                      </Typography>
                      <Typography>
                        Date Range: {new Date(booking.from_date).toLocaleDateString('en-CA')} to{' '}
                        {new Date(booking.to_date).toLocaleDateString('en-CA')}
                      </Typography>
                      <Typography>Status: {booking.status}</Typography>
                      <Typography>Total Amount: ${booking.total_amount}</Typography>
                    </div>
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: '#d32f2f',
                        color: 'white',
                        marginLeft: '20px',
                        marginTop: '7vh',
                      }}
                      onClick={() => handleCancelBooking(booking._id)}
                    >
                      Cancel Booking
                    </Button>             
                  </div>
                </div>
              </Grid>
            ))
          ) : (
            <Typography style={{ textAlign: 'center', width: '100%' }}>
              You have no ongoing bookings at the moment.
            </Typography>
          )}
        </Grid>
      </div>
      <Divider style={{ margin: '20px 0' }} />
      <div style={{ padding: '1vh 4vw 8vh 4vw' }}>
        <Typography
          style={{
            margin: '20px 0',
            color: '#333',
            fontSize: '40px',
            fontWeight: 'bold',
            fontWeight: 700,
            textAlign: 'center',
          }}
        >
          Previous Bookings
        </Typography>
        <Grid container spacing={3}>
          {previousBookings.length > 0 ? (
            previousBookings.map((booking) => (
              <Grid item xs={12} sm={6} md={4} key={booking.transaction_id}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'linear-gradient(145deg, #f7f8fa, #ffffff)',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                    borderRadius: '15px',
                    height: '15vh',
                  }}
                >
                  {roomImages[booking.room_id] ? (
                    <img
                      src={roomImages[booking.room_id]}
                      alt={booking.room}
                      style={{
                        height: '100%',
                        width: '40%',
                        borderRadius: '10px 0 0 10px',
                        marginRight: '20px',

                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '40%',
                        height: '100%',
                        borderRadius: '10px 0 0 10px',
                        marginRight: '20px ',
                        backgroundColor: '#e0e0e0',
                      }}
                    ></div>
                  )}
                  <div style={{ flex: 1 }}>
                    <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '0px' }}>
                      {booking.room}
                    </Typography>
                    <Typography>
                      {new Date(booking.from_date).toLocaleDateString('en-CA')} to{' '}
                      {new Date(booking.to_date).toLocaleDateString('en-CA')}
                    </Typography>
                    <Typography>Total Amount: ${booking.total_amount}</Typography>
                  </div>
                </div>
              </Grid>
            ))
          ) : (
            <Typography style={{ textAlign: 'center', width: '100%' }}>
              No previous bookings found.
            </Typography>
          )}
        </Grid>
      </div>


      {admin && <AdminPanel />}
      <Footer />
    </div>
  );
};

export default Account;
