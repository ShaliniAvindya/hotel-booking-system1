import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Box, Typography, TextField } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";


const BookingCalendar = ({ onDateRangeSelect, isMobile }) => {
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

  const calculateCalendarPosition = (rect) => {
    const calendarHeight = 330;  // approximate or measured
    const offset = 10;           // offset from the input
    const pageTop = rect.top + window.scrollY;
    const pageBottom = rect.bottom + window.scrollY;
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top; 
    
    let top = pageBottom + offset;
    let left = rect.left + window.scrollX;
  
    if (spaceBelow < calendarHeight && spaceAbove > calendarHeight) {
      const extraAboveOffset = -80;  
      top = pageTop - calendarHeight - extraAboveOffset;
    }
  
    
    top = Math.max(0, top);
  
    return { top, left };
  };

  const renderCalendarPortal = (ref, calendar, isOpen) => {
    if (!isOpen || !ref.current) return null;

    const rect = ref.current.getBoundingClientRect();

    const { top, left } = calculateCalendarPosition(rect);

    return ReactDOM.createPortal(
      <Box
        sx={{
          position: "absolute",
          top: `${top}px`,
          left: `${left}px`,
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
    alignItems: isMobile? "center" : "left",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    justifyContent: "center",
    width: "100%",
  };

  const commonBoxStylesIn = {
    color: "rgba(0,0,0,0.8)",
    backgroundColor: "rgba(240,240,240,0.8)",
    border: "1.5px solid rgba(1, 34, 92,0.4)",
    width: "100%",
    padding: "10px 10px",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "space-between",
    fontWeight: "bold",
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        width: "100% ",
        marginLeft: "0px",
        borderRadius: "4px",
      }}
    >
      {/* Check-In Date Tab */}
      <Box ref={checkinRef} sx={commonBoxStyles} onClick={handleCheckinClick}>
        <Typography sx={{ color: "#333", marginBottom: "5px" }}>
          Check-In Date
        </Typography>
        <Typography sx={commonBoxStylesIn}>
          {checkinDate
            ? checkinDate.toLocaleDateString()
            : "Select Check-In Date"}
          <CalendarTodayIcon
            sx={{ fontSize: "20px", color: "#333", marginRight: "5px" }}
          />
        </Typography>
      </Box>

      {renderCalendarPortal(
        checkinRef,
        <Calendar onChange={handleCheckinDateChange} value={checkinDate} />,
        showCheckinCalendar
      )}

      {/* Check-Out Date Tab */}
      <Box ref={checkoutRef} sx={commonBoxStyles} onClick={handleCheckoutClick}>
        <Typography sx={{ color: "#333", marginBottom: "5px" }}>
          Check-Out Date
        </Typography>
        <Typography sx={commonBoxStylesIn}>
          {checkoutDate
            ? checkoutDate.toLocaleDateString()
            : "Select Check-Out Date"}
          <CalendarTodayIcon
            sx={{ fontSize: "20px", color: "#333", marginRight: "5px" }}
          />
        </Typography>
      </Box>

      {renderCalendarPortal(
        checkoutRef,
        <Calendar onChange={handleCheckoutDateChange} value={checkoutDate} />,
        showCheckoutCalendar
      )}

      {/* Promo Code Tab */}
      <Box sx={commonBoxStyles}>
        <Typography sx={{ color: "#333", marginBottom: "5px" }}>
          Promo Code
        </Typography>
        <TextField
          value={promoCode}
          onChange={handlePromoCodeChange}
          placeholder="Enter Code"
          fullWidth
          variant="standard"
          InputProps={{ disableUnderline: true }}
          sx={{
            color: "rgba(0,0,0,0.8)",
            backgroundColor: "rgba(240,240,240,0.8)",
            border: "1.5px solid rgba(1, 34, 92,0.4)",
            width: "100%",
            padding: "5px 10px",
            borderRadius: "4px",
          }}
        />
      </Box>
    </Box>
  );
};

export default BookingCalendar;
