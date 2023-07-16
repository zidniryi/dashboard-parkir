import React, {useState} from 'react';
import {TextField, Button, Card, CardContent, MenuItem} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';
import {useLocation} from 'react-router-dom';

import localKey from 'constant';
import {AdminUserEditRequest} from '../../../proto/webadmin_pb';
import {service} from 'proto/service';

const EditOfficer = () => {
  const location = useLocation();
  const dataPasing = location.state.data;

  const [officeData, setOfficeData] = useState({
    username: dataPasing.username,
    name: dataPasing.name,
    phone: dataPasing.phone,
    email: dataPasing.email,
    role: dataPasing.role
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
      const dataRpc = new AdminUserEditRequest();
      dataRpc.setSessionid(localStorage.getItem(localKey.sessionid));
      dataRpc.setAdminid(localStorage.getItem(localKey.adminid));
      dataRpc.setTargetadminid(dataPasing.adminid);
      dataRpc.setName(officeData.name);
      dataRpc.setEmail(officeData.email);
      dataRpc.setPhone(officeData.phone);
      dataRpc.setRole(officeData.role);
      dataRpc.setRemoteip(localStorage.getItem(localKey.remoteip));

      // new Promise((resolve, reject) => {
      return service.doAdminUserEdit(dataRpc, null, (err, response) => {
        const status = response?.toObject()?.status;
        setisLoading(false);
        console.log(response?.toObject());

        if (status == '000') {
          navigate('/settings/officer');
          setisError('');
          setOfficeData({
            username: '',
            name: '',
            phone: '',
            email: '',
            role: ''
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
      // });
    } catch (err) {
      setisLoading(false);
      setisError(err?.toString());
      Swal.fire('Error!', `${isError} Something went wrong try again`, 'danger');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // onEditOfficer(officeData);
    onSaveUserRpc();
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
              // onChange={handleInputChange}
              aria-readonly
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
              disabled
              readonly
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
              {isLoading ? 'Loading' : '  Edit Office'}
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

export default EditOfficer;
