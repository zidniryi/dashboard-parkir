import React, {useState, useEffect} from 'react';
import {TextField, Button, Card, CardContent, MenuItem, InputLabel, Select} from '@mui/material';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';

import localKey from 'constant';
import {GateEditRequest, PlacesRequest} from '../../../proto/webadmin_pb';
import {service} from 'proto/service';

const EditGate = () => {
  const location = useLocation();
  const dataPasing = location.state.data;

  const [gateData, setGateData] = useState({
    placeid: {
      clientid: dataPasing.clientid,
      placeid: dataPasing.placeid,
      placename: dataPasing.placename
    },
    name: dataPasing.clientname,
    location: dataPasing.location,
    access: dataPasing.access,
    type: dataPasing.type
  });

  console.log(gateData.placeid);

  const [placeData, setPlaceData] = useState({
    data: [],
    isLoading: false,
    isError: false
  });
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const {name, value} = event.target;

    if (name === 'placeid') {
      setGateData((prevData) => ({
        ...prevData,
        placeid: {
          ...prevData.placeid,
          placeid: value
        }
      }));
    } else {
      setGateData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const onSaveGateRpc = async () => {
    setisLoading(true);
    try {
      const dataRpc = new GateEditRequest();
      dataRpc.setSessionid(localStorage.getItem(localKey.sessionid));
      dataRpc.setAdminid(localStorage.getItem(localKey.adminid));
      dataRpc.setClientid(gateData?.placeid?.clientid);
      dataRpc.setPlaceid(gateData?.placeid?.placeid);
      dataRpc.setGateid(dataPasing.gateid);

      dataRpc.setName(gateData.name);
      dataRpc.setLocation(gateData.location);
      dataRpc.setAccess(gateData.access);
      dataRpc.setType(gateData.type);
      dataRpc.setRemoteip(localStorage.getItem(localKey.remoteip));

      return service.doGateEdit(dataRpc, null, (err, response) => {
        const status = response?.toObject()?.status;
        setisLoading(false);
        if (status === '000') {
          navigate('/gates/list-gate');
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
  };

  const onGetClientDataRpc = async () => {
    setPlaceData({
      isLoading: true,
      ...placeData
    });
    try {
      const dataRpc = new PlacesRequest();
      dataRpc.setSessionid(localStorage.getItem(localKey.sessionid));
      dataRpc.setAdminid(localStorage.getItem(localKey.adminid));
      dataRpc.setClientid(dataPasing?.clientid || '');
      dataRpc.setRemoteip(localStorage.getItem(localKey.remoteip));

      return service.doGetPlaces(dataRpc, null, (err, response) => {
        const status = response?.toObject()?.status;
        setPlaceData({
          isLoading: false,
          ...placeData
        });

        if (status === '000') {
          const dataResponse = response?.toObject();
          setPlaceData({
            isLoading: true,
            isError: false,
            data: dataResponse?.resultsList
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: `Something went wrong! Error Get Place List ID! | ${status}`
          });
          setisLoading(false);
          setisError(err?.toString());
        }
      });
    } catch (err) {
      Swal.fire('Error!', `${err?.response?.status} Something went wrong try again  Error Get Place List ID`, 'danger');
      setPlaceData({
        isLoading: false,
        isError: true,
        data: []
      });
      setisError(err?.toString());
    }
  };

  useEffect(() => {
    onGetClientDataRpc();
    if (!gateData.placeid.placeid) {
      setGateData((prevData) => ({
        ...prevData,
        placeid: {
          ...prevData.placeid,
          placeid: placeData.data.length > 0 ? placeData.data[0].placeid : '' // Set the default value here
        }
      }));
    }
  }, []);

  return (
    <div>
      <Card>
        <CardContent>
          <h1>Edit Gate</h1>

          <form onSubmit={handleSubmit}>
            <InputLabel id="demo-simple-select-label">Place Name</InputLabel>
            <Select
              placeholder="Place ID"
              label="Place ID"
              fullWidth
              sx={{marginBottom: '1rem'}}
              name="placeid"
              required
              value={gateData.placeid.placeid}
              onChange={handleInputChange}
              defaultValue={gateData.placeid.placename}
            >
              {placeData.data.map((item) => {
                return (
                  <MenuItem key={item.placeid} value={item.placeid}>
                    {item.placename}
                  </MenuItem>
                );
              })}
            </Select>
            <InputLabel id="demo-simple-select-label"> Name</InputLabel>

            <TextField
              label="Name"
              name="name"
              value={gateData.name}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />
            <InputLabel id="demo-simple-select-label"> Location</InputLabel>

            <TextField
              label="Location"
              name="location"
              value={gateData.location}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />
            <InputLabel id="demo-simple-select-label"> Access</InputLabel>

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
            <InputLabel id="demo-simple-select-label"> Type</InputLabel>

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
              {isLoading ? 'Loading' : 'Edit Gate'}
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

export default EditGate;
