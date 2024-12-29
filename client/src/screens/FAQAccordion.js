import React from 'react';
import { Container, Typography, Grid, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';

const PurpleAccordion = styled(Accordion)({
  backgroundColor: '#226C9A',
  color: 'white',
  borderRadius: 4,
  marginBottom: 1,
});

const DarkGrayAccordionDetails = styled(AccordionDetails)({
  backgroundColor: '#CEE3FF',
  color: 'black',
  borderRadius: 4,
  marginBottom: 1,
});

const CustomExpandMoreIcon = styled(ExpandMoreIcon)({
  color: '#fde2e4', 
});

const FAQAccordion = () => {
  return (
    <Container>
      <br />
      <br />
      <Typography variant="h3" textAlign="center" color="#0A369D" fontFamily="Dancing Script">
        Frequently Asked Questions
      </Typography>
      <br />
      <br />
      <Box width="90%" margin="auto">
        <Grid container spacing={2}>
          {/* Question 1 */}
          <Grid item xs={12}>
            <PurpleAccordion>
              <AccordionSummary expandIcon={<CustomExpandMoreIcon />}>
                <Typography>How do I get to Luxury Hotel?</Typography>
              </AccordionSummary>
              <DarkGrayAccordionDetails>
                <Typography>
                  Luxury Hotel is about 25 minutes from the airport. You can hail an Uber or even book your airport
                  transfer in advance for an additional charge of 98 USD.
                </Typography>
              </DarkGrayAccordionDetails>
            </PurpleAccordion>
          </Grid>
          {/* Question 2 */}
          <Grid item xs={12}>
            <PurpleAccordion>
              <AccordionSummary expandIcon={<CustomExpandMoreIcon />}>
                <Typography>What are check-in and check-out times at Luxury Hotel?</Typography>
              </AccordionSummary>
              <DarkGrayAccordionDetails>
                <Typography>
                  Check-in Time 1.00 pm Check-out Time 12 noon.
                  <br />
                  Early Arrivals: Guests arriving before 12 noon are encouraged to reserve and pay for the previous
                  night to guarantee immediate access to their room.
                  <br />
                  Early Departures: For guests departing earlier than planned, especially during peak occupancy periods,
                  a 100% charge on the remaining room nights will apply.
                  <br />
                  Late Departures: We recognize that your schedule may require flexibility, and we are pleased to offer
                  options for late departures:
                  <br />
                  Check-out by 04:00 pm incurs a 50% charge for the day.
                  <br />
                  Departures after 04:00 pm will be subject to a full day's charge.
                </Typography>
              </DarkGrayAccordionDetails>
            </PurpleAccordion>
          </Grid>
          {/* Question 3 */}
          <Grid item xs={12}>
            <PurpleAccordion>
              <AccordionSummary expandIcon={<CustomExpandMoreIcon />}>
                <Typography>What are popular tourist attractions near Luxury Hotel?</Typography>
              </AccordionSummary>
              <DarkGrayAccordionDetails>
                <Typography>
                  Galle Face Green
                  <br />
                  Gangaramaya Temple
                  <br />
                  Viharamahadevi Park
                  <br />
                  Colombo National Museum
                  <br />
                  Independence Memorial Hall
                  <br />
                  Dutch Hospital Shopping Precinct
                  <br />
                  Beira Lake
                </Typography>
              </DarkGrayAccordionDetails>
            </PurpleAccordion>
          </Grid>
          {/* Question 4 */}
          <Grid item xs={12}>
            <PurpleAccordion>
              <AccordionSummary expandIcon={<CustomExpandMoreIcon />}>
                <Typography>What is the smoking policy at Luxury Hotel?</Typography>
              </AccordionSummary>
              <DarkGrayAccordionDetails>
                <Typography>
                  To ensure a pleasant and healthy environment for all our guests, certain floors within our hotel are
                  designated as smoking floors, offering dedicated smoking rooms. Smoking is only permitted in these
                  designated areas.
                </Typography>
              </DarkGrayAccordionDetails>
            </PurpleAccordion>
          </Grid>
          {/* Question 5 */}
          <Grid item xs={12}>
            <PurpleAccordion>
              <AccordionSummary expandIcon={<CustomExpandMoreIcon />}>
                <Typography>What popular shopping places are close to Luxury Hotel?</Typography>
              </AccordionSummary>
              <DarkGrayAccordionDetails>
                <Typography>
                  One Galle Face Shopping Mall
                  <br />
                  Colombo City Centre
                  <br />
                  Pettah Market
                </Typography>
              </DarkGrayAccordionDetails>
            </PurpleAccordion>
          </Grid>
        </Grid>
      
      </Box>
    </Container>
  );
};

export default FAQAccordion;
