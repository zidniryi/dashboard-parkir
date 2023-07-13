import React, {useState} from 'react';
import {TextField, Button, Card, CardContent} from '@mui/material';
import {Link} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import {useEffect} from 'react';

const EditGate = () => {
  const location = useLocation();
  console.log(location.state.item, 'Loc');

  const [editedGateData, setEditedGateData] = useState({
    noGate: '',
    totalIncomeToday: '',
    totalVehicle: '',
    location: ''
  });

  useEffect(() => {
    setEditedGateData(location.state.item);
  }, []);

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setEditedGateData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div>
      <Card>
        <CardContent>
          <form onSubmit={handleInputChange}>
            <TextField
              label="No Gate"
              name="noGate"
              value={editedGateData.noGate}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />
            <TextField
              label="Total Income Today (IDR)"
              name="totalIncomeToday"
              value={editedGateData.totalIncomeToday}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />
            <TextField
              label="Total Vehicle"
              name="totalVehicle"
              value={editedGateData.totalVehicle}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />
            <TextField
              label="Location"
              name="location"
              value={editedGateData.location}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />

            <Button type="submit" variant="contained" color="primary">
              Update Gate
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

export default EditGate;
