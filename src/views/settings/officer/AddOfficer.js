import React, {useState} from 'react';
import {TextField, Button, Card, CardContent, MenuItem} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';

import localKey from 'constant';
import {AdminUserAddRequest} from '../../../proto/webadmin_pb';
import {service} from 'proto/service';

const AddOfficer = () => {
  const [officeData, setOfficeData] = useState({
    username: '',
    name: '',
    phone: '',
    email: '',
    role: ''
  });
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setOfficeData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const onSaveUserRpc = async () => {
    setisLoading(true);
    try {
      const dataRpc = new AdminUserAddRequest();
      dataRpc.setSessionid(localStorage.getItem(localKey.sessionid));
      dataRpc.setAdminid(localStorage.getItem(localKey.adminid));

      dataRpc.setUsername(officeData.username);
      dataRpc.setName(officeData.name);
      dataRpc.setEmail(officeData.email);
      dataRpc.setPhone(officeData.phone);
      dataRpc.setRole(officeData.role);
      dataRpc.setRemoteip(localStorage.getItem(localKey.remoteip));

      // new Promise((resolve, reject) => {
      return service.doAdminUserAdd(dataRpc, null, (err, response) => {
        const status = response?.toObject()?.status;
        setisLoading(false);
        console.log(response?.toObject());

        if (status == '000') {
          navigate('/settings/officer');
          setisError('');
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
      // });
    } catch (err) {
      setisLoading(false);
      setisError(err?.toString());
      Swal.fire('Error!', `${isError} Something went wrong try again`, 'danger');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // onAddOfficer(officeData);
    onSaveUserRpc();
    console.log(officeData, 'officeData');
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

            <Button type="submit" disabled={isLoading} variant="contained" color="primary">
              {isLoading ? 'Loading' : '  Add Office'}
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
