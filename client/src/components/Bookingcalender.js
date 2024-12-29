import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Box, Typography, TextField } from "@mui/material";

const BookingCalendar = ({ onDateRangeSelect }) => {
  const [showCheckinCalendar, setShowCheckinCalendar] = useState(false);
  const [showCheckoutCalendar, setShowCheckoutCalendar] = useState(false);
  const [checkinDate, setCheckinDate] = useState(new Date());
  const [checkoutDate, setCheckoutDate] = useState(new Date());
  const [promoCode, setPromoCode] = useState("");

  const checkinRef = useRef(null);
  const checkoutRef = useRef(null);

  const handleCheckinClick = () => {
    setShowCheckinCalendar(!showCheckinCalendar);
    setShowCheckoutCalendar(false);
  };

  const handleCheckoutClick = () => {
    setShowCheckoutCalendar(!showCheckoutCalendar);
    setShowCheckinCalendar(false);
  };

  const handleCheckinDateChange = (date) => {
    setCheckinDate(date);
    onDateRangeSelect(date, checkoutDate);
    setShowCheckinCalendar(false);
  };

  const handleCheckoutDateChange = (date) => {
    setCheckoutDate(date);
    onDateRangeSelect(checkinDate, date);
    setShowCheckoutCalendar(false);
  };

  const handlePromoCodeChange = (event) => {
    setPromoCode(event.target.value);
  };


  const renderCalendarPortal = (ref, calendar, isOpen) => {
    if (!isOpen) return null;
    const rect = ref.current.getBoundingClientRect();

    return ReactDOM.createPortal(
      <Box
        sx={{
          position: "absolute",
          top: `${rect.bottom + window.scrollY}px`,
          left: `${rect.left + window.scrollX}px`,
          zIndex: 10000,
          backgroundColor: "white",
          borderRadius: "4px",
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        {calendar}
      </Box>,
      document.body
    );
  };

  const commonBoxStyles = {
    flex: 1,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#bbdefb",
    borderRadius: "4px",
    padding: "10px 20px",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    height: "70px",
    justifyContent: "center",
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "15px", width: "100% ", marginLeft: "-30px" }}>
      {/* Check-In Date Tab */}
      <Box ref={checkinRef} sx={commonBoxStyles} onClick={handleCheckinClick}>
        <Typography sx={{ fontWeight: "bold", color: "#333", marginBottom: "5px" }}>Check-In Date</Typography>
        <Typography sx={{ color: "#333" }}>
          {checkinDate ? checkinDate.toLocaleDateString() : "Select Check-In Date"}
        </Typography>
      </Box>

      {renderCalendarPortal(
        checkinRef,
        <Calendar
          onChange={handleCheckinDateChange}
          value={checkinDate}
        />,
        showCheckinCalendar
      )}

      {/* Check-Out Date Tab */}
      <Box ref={checkoutRef} sx={commonBoxStyles} onClick={handleCheckoutClick}>
        <Typography sx={{ fontWeight: "bold", color: "#333", marginBottom: "5px" }}>Check-Out Date</Typography>
        <Typography sx={{ color: "#333" }}>
          {checkoutDate ? checkoutDate.toLocaleDateString() : "Select Check-Out Date"}
        </Typography>
      </Box>

      {renderCalendarPortal(
        checkoutRef,
        <Calendar
          onChange={handleCheckoutDateChange}
          value={checkoutDate}
        />,
        showCheckoutCalendar
      )}

      {/* Promo Code Tab */}
      <Box sx={commonBoxStyles}>
        <Typography sx={{ fontWeight: "bold", color: "#333", marginBottom: "5px" }}>Promo Code</Typography>
        <TextField
          value={promoCode}
          onChange={handlePromoCodeChange}
          placeholder="Enter Code"
          fullWidth
          variant="standard"
          InputProps={{ disableUnderline: true }}
          sx={{ textAlign: "center" }}
        />
      </Box>

    </Box>
  );
};

export default BookingCalendar;
