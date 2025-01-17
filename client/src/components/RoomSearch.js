import React, { useState } from 'react';
import {
  Checkbox,
  FormControlLabel,
  Slider,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Typography,
  Button,
  InputAdornment,

} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';

const RoomSearch = ({ setFilteredRooms, rooms }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roomType, setRoomType] = useState("");
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const roomTypes = ["Single", "Double", "Suite", "Deluxe", "Penthouse", "Family", "Standard", "Accessible"]; 
  const allFacilities = [
    "Free Wi-Fi",
    "Minibar",
    "Shower WC",
    "Bathrobe",
    "In-room Digital Safe",
    "Iron and Iron Board",
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterRooms(value, roomType, selectedFacilities, priceRange);
  };

  const handleRoomTypeChange = (e) => {
    const value = e.target.value;
    setRoomType(value);
    filterRooms(searchTerm, value, selectedFacilities, priceRange);
  };

  const handleFacilitiesChange = (facility) => {
    const updatedFacilities = selectedFacilities.includes(facility)
      ? selectedFacilities.filter((f) => f !== facility)
      : [...selectedFacilities, facility];

    setSelectedFacilities(updatedFacilities);
    filterRooms(searchTerm, roomType, updatedFacilities, priceRange);
  };

  const handlePriceRangeChange = (e, newValue) => {
    setPriceRange(newValue);
    filterRooms(searchTerm, roomType, selectedFacilities, newValue);
  };

  const filterRooms = (term, type, facilities, price) => {
    let filtered = rooms;

    // Filter by search term
    if (term) {
      filtered = filtered.filter(
        (room) =>
          room.name.toLowerCase().includes(term.toLowerCase()) ||
          room.description.toLowerCase().includes(term.toLowerCase())
      );
    }

    // Filter by room type
    if (type) {
      filtered = filtered.filter((room) => room.type === type);
    }

    // Filter by facilities
    if (facilities.length > 0) {
      filtered = filtered.filter(
        (room) =>
          Array.isArray(room.facilities) &&
          facilities.every((facility) => room.facilities.includes(facility))
      );
    }

    // Filter by price range
    if (price) {
      filtered = filtered.filter(
        (room) => room.rentPerDay >= price[0] && room.rentPerDay <= price[1]
      );
    }

    setFilteredRooms(filtered);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setRoomType("");
    setSelectedFacilities([]);
    setPriceRange([0, 1000]);
    setFilteredRooms(rooms); 
  };

  return (
    <div style={{ marginBottom: "5vh", backgroundColor: "#fff", padding: '3vh 2vw'}}>
      <div style={{ display: "flex", flexDirection: "row", gap: "10px", alignItems: "center" }}>
        {/* Search Bar with Magnifying Glass Icon */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search rooms..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        {/* Room Type filter */}
        <FormControl fullWidth>
          <InputLabel>Room Type</InputLabel>
          <Select value={roomType} onChange={handleRoomTypeChange} label="Room Type">
            <MenuItem value="">Any</MenuItem>
            {roomTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      

      {/* Facilities filter */}
      <div style={{ marginBottom: "10px", marginTop: "4vh" }}>
        <Typography variant="h6">Facilities</Typography>
        {allFacilities.map((facility) => (
          <FormControlLabel
            style={{ marginLeft: '1vw' }}
            key={facility}
            control={
              <Checkbox
                checked={selectedFacilities.includes(facility)}
                onChange={() => handleFacilitiesChange(facility)}
              />
            }
            label={facility}
          />
        ))}
      </div>

      {/* Price Range filter */}
      <div style={{ marginBottom: "10px", marginTop: "4vh" }}>
        <Typography variant="h6">Price Range</Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceRangeChange}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `$${value}`}
          min={0}
          max={1000}
        />
      </div>

      <Button
        variant="contained"
        color="primary"
        onClick={resetFilters}
        style={{ marginTop: "20px", width: "100%" }}
      >
        Reset Filters
      </Button>
    </div>
  );
};

export default RoomSearch;
