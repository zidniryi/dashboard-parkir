import React, {useState} from 'react';
import {TextField, Button, Card, CardContent} from '@mui/material';
import {Link} from 'react-router-dom';

const AddListClient = ({onAddClient}) => {
  const [clientData, setClientData] = useState({
    id: '',
    name: '',
    location: '',
    date: '',
    totalBalancePerDay: '',
    totalBalancePerMonth: '',
    employeeName: '',
    totalGateParking: ''
  });

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setClientData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddClient(clientData);
    setClientData({
      id: '',
      name: '',
      location: '',
      date: '',
      totalBalancePerDay: '',
      totalBalancePerMonth: '',
      employeeName: '',
      totalGateParking: ''
    });
  };

  return (
    <div>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="ID"
              name="id"
              value={clientData.id}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />
            <TextField
              label="Name"
              name="name"
              value={clientData.name}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />
            <TextField
              label="Location"
              name="location"
              value={clientData.location}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />
            <TextField
              label="Date"
              name="date"
              value={clientData.date}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />
            <TextField
              label="Total Balance Per Day (IDR)"
              name="totalBalancePerDay"
              value={clientData.totalBalancePerDay}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />
            <TextField
              label="Total Balance Per Month (IDR)"
              name="totalBalancePerMonth"
              value={clientData.totalBalancePerMonth}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />
            <TextField
              label="Employee Name"
              name="employeeName"
              value={clientData.employeeName}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />
            <TextField
              label="Total Gate Parking"
              name="totalGateParking"
              value={clientData.totalGateParking}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />

            <Button type="submit" variant="contained" color="primary">
              Add Client
            </Button>
            <Link to={'/clients/list-clients'}>
              <Button type="submit" variant="contained" color="inherit">
                Cancel
              </Button>
            </Link>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddListClient;
