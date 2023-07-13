import React, {useState} from 'react';
import {TextField, Button, Card, CardContent} from '@mui/material';
import {Link} from 'react-router-dom';

const AddGate = ({onAddGate}) => {
  const [gateData, setGateData] = useState({
    noGate: '',
    totalIncomeToday: '',
    totalVehicle: '',
    location: ''
  });

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setGateData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddGate(gateData);
    setGateData({
      noGate: '',
      totalIncomeToday: '',
      totalVehicle: '',
      location: ''
    });
  };

  return (
    <div>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="No Gate"
              name="noGate"
              value={gateData.noGate}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />
            <TextField
              label="Total Income Today (IDR)"
              name="totalIncomeToday"
              value={gateData.totalIncomeToday}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />
            <TextField
              label="Total Vehicle"
              name="totalVehicle"
              value={gateData.totalVehicle}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />
            <TextField
              label="Location"
              name="location"
              value={gateData.location}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />

            <Button type="submit" variant="contained" color="primary">
              Add Gate
            </Button>
            <Link to="/transaction/gate">
              <Button variant="contained" color="inherit">
                Cancel
              </Button>
            </Link>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddGate;
