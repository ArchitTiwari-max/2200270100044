import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Container } from '@mui/material';
import { logEvent } from '../utils/log';
import axios from 'axios';

const AverageForm: React.FC = () => {
  const [numbers, setNumbers] = useState('');
  const [average, setAverage] = useState<number | null>(null);

  const handleSubmit = async () => {
    try {
      const numArray = numbers.split(',').map(Number);

      if (numArray.some(isNaN)) {
        await logEvent(process.env.REACT_APP_TOKEN!, 'frontend', 'error', 'component', 'Invalid number input');
        return alert('Enter valid numbers separated by commas');
      }

      const res = await axios.post('http://localhost:5000/average', {
        numbers: numArray,
      });

      setAverage(res.data.average);
      await logEvent(process.env.REACT_APP_TOKEN!, 'frontend', 'info', 'component', `Calculated avg: ${res.data.average}`);
    } catch (err: any) {
      console.error(err);
      await logEvent(process.env.REACT_APP_TOKEN!, 'frontend', 'fatal', 'component', 'API call failed');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Average Calculator</Typography>
      <TextField
        fullWidth
        label="Enter numbers (comma separated)"
        value={numbers}
        onChange={(e) => setNumbers(e.target.value)}
        variant="outlined"
        margin="normal"
      />
      <Button variant="contained" onClick={handleSubmit}>Calculate</Button>
      {average !== null && (
        <Box mt={3}>
          <Typography variant="h6">Average: {average}</Typography>
        </Box>
      )}
    </Container>
  );
};

export default AverageForm;
