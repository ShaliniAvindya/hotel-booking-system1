import React, { useEffect, useState } from 'react';
import { DatePicker, Space, Input } from 'antd';

const { RangePicker } = DatePicker;

const DateRange = ({ onDateChange }) => {
  const [dateRange, setDateRange] = useState([]);

  const handleDateChange = (dates) => {
    setDateRange(dates);
    onDateChange([dates[0].format('YYYY-MM-DD'), dates[1].format('YYYY-MM-DD')]);
  };

  useEffect(() => {
    let fromDateString = dateRange[0] ? dateRange[0].format('YYYY-MM-DD') : localStorage.getItem('fromDate');
    let toDateString = dateRange[1] ? dateRange[1].format('YYYY-MM-DD') : localStorage.getItem('toDate');
  }, [dateRange]);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <RangePicker onChange={handleDateChange} style={{height: '7vh'}} />
    </Space>
  );
};

export default DateRange;
