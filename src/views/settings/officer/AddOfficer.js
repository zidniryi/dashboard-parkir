import React, {useState} from 'react';
import {TextField, Button, Card, CardContent, MenuItem} from '@mui/material';
import {Link} from 'react-router-dom';

const AddOfficer = ({onAddOfficer}) => {
  const [officeData, setOfficeData] = useState({
    username: '',
    name: '',
    phone: '',
    email: '',
    role: ''
  });

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setOfficeData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddOfficer(officeData);
    setOfficeData({
      username: '',
      name: '',
      phone: '',
      email: '',
      role: ''
    });
  };

  return (
    <div>
      <Card>
        <CardContent>
          <h1>Add Admin/Officer</h1>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              name="username"
              value={officeData.username}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />
            <TextField
              label="Name"
              name="name"
              value={officeData.name}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />
            <TextField
              label="Phone"
              name="phone"
              value={officeData.phone}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />
            <TextField
              label="Email"
              name="email"
              value={officeData.email}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />
            <TextField
              select
              label="Role"
              name="role"
              value={officeData.role}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            >
              <MenuItem value="OPERATION">OPERATION</MenuItem>
              <MenuItem value="ROOT">ROOT</MenuItem>
            </TextField>

            <Button type="submit" variant="contained" color="primary">
              Add Office
            </Button>
            <Link to="/settings/officer">
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

export default AddOfficer;
