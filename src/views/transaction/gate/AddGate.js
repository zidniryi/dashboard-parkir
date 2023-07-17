import React, {useState} from 'react';
import {TextField, Button, Card, CardContent, MenuItem} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';

import localKey from 'constant';
import {GateAddRequest} from '../../../proto/webadmin_pb';
import {service} from 'proto/service';

const AddGate = () => {
  const [gateData, setGateData] = useState({
    placeid: '',
    name: '',
    location: '',
    access: '',
    type: ''
  });
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setGateData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const onSaveGateRpc = async () => {
    setisLoading(true);
    try {
      const dataRpc = new GateAddRequest();
      dataRpc.setSessionid(localStorage.getItem(localKey.sessionid));
      dataRpc.setAdminid(localStorage.getItem(localKey.adminid));

      dataRpc.setPlaceid(gateData.placeid);
      dataRpc.setName(gateData.name);
      dataRpc.setLocation(gateData.location);
      dataRpc.setAccess(gateData.access);
      dataRpc.setType(gateData.type);
      dataRpc.setRemoteip(localStorage.getItem(localKey.remoteip));

      return service.doGateAdd(dataRpc, null, (err, response) => {
        const status = response?.toObject()?.status;
        setisLoading(false);
        console.log(response?.toObject());

        if (status === '000') {
          navigate('/transaction/gate');
          setisError('');
          setGateData({
            placeid: '',
            name: '',
            location: '',
            access: '',
            type: ''
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: `Something went wrong! | ${status}`
          });
          setisLoading(false);
          setisError(err?.toString());
        }
      });
    } catch (err) {
      setisLoading(false);
      setisError(err?.toString());
      Swal.fire('Error!', `${isError} Something went wrong. Please try again.`, 'danger');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSaveGateRpc();
    console.log(gateData, 'gateData');
  };

  return (
    <div>
      <Card>
        <CardContent>
          <h1>Add Gate</h1>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Place ID"
              name="placeid"
              value={gateData.placeid}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />
            <TextField
              label="Name"
              name="name"
              value={gateData.name}
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
            <TextField
              select
              label="Access"
              name="access"
              value={gateData.access}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            >
              <MenuItem value="IN">IN</MenuItem>
              <MenuItem value="OUT">OUT</MenuItem>
            </TextField>
            <TextField
              select
              label="Type"
              name="type"
              value={gateData.type}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            >
              <MenuItem value="RFID">RFID</MenuItem>
              <MenuItem value="TICKET">TICKET</MenuItem>
              <MenuItem value="QRCODE">QRCODE</MenuItem>
            </TextField>

            <Button type="submit" disabled={isLoading} variant="contained" color="primary">
              {isLoading ? 'Loading' : 'Add Gate'}
            </Button>
            <Link to="/settings/gate">
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
