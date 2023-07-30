import React, {useState} from 'react';
import {TextField, Button, Card, CardContent, InputLabel} from '@mui/material';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';

import localKey from 'constant';
import {TypeEditRequest} from 'proto/webadmin_pb';
import {service} from 'proto/service';

const EditMasterType = () => {
  const location = useLocation();
  const dataPasing = location.state.data;

  const [typeData, setTypeData] = useState({
    name: dataPasing.name
  });

  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setTypeData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const onSaveGateRpc = async () => {
    setisLoading(true);
    try {
      const dataRpc = new TypeEditRequest();
      dataRpc.setSessionid(localStorage.getItem(localKey.sessionid));
      dataRpc.setAdminid(localStorage.getItem(localKey.adminid));
      dataRpc.setTypeid(dataPasing.typeid);
      dataRpc.setName(typeData.name);

      dataRpc.setRemoteip(localStorage.getItem(localKey.remoteip));

      return service.doTypeEdit(dataRpc, null, (err, response) => {
        const status = response?.toObject()?.status;
        setisLoading(false);
        if (status === '000') {
          navigate('/master/type');
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

  // The rest of the code remains unchanged...
  // (handleInputChange, onSavetypeRpc, handleSubmit, onGetClientDataRpc, useEffect, etc.)

  return (
    <div>
      <Card>
        <CardContent>
          <h1>Edit Master Type</h1>

          <form onSubmit={handleSubmit}>
            {/* Replace the 'Name' input with the new field */}
            <InputLabel id="demo-simple-select-label">Master Type Name</InputLabel>
            <TextField
              label="Master Type Name"
              name="name" // Rename the name field to "name"
              value={typeData.name}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />

            {/* The rest of the form remains unchanged... */}
            {/* (Location, Access, Type inputs, etc.) */}

            <Button type="submit" disabled={isLoading} variant="contained" color="primary">
              {isLoading ? 'Loading' : 'Edit Master Type'}
            </Button>
            <Link to="/master/type">
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

export default EditMasterType;
