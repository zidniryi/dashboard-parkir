import React, {useState} from 'react';
import {TextField, Button, Card, CardContent, InputLabel} from '@mui/material';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';

import localKey from 'constant';
import {CategoryEditRequest} from 'proto/webadmin_pb';
import {service} from 'proto/service';

const EditMasterCategory = () => {
  const location = useLocation();
  const dataPasing = location.state.data;

  const [categoryData, setCategoryData] = useState({
    name: dataPasing.name
  });

  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setCategoryData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const onSaveGateRpc = async () => {
    setisLoading(true);
    try {
      const dataRpc = new CategoryEditRequest();
      dataRpc.setSessionid(localStorage.getItem(localKey.sessionid));
      dataRpc.setAdminid(localStorage.getItem(localKey.adminid));
      dataRpc.setCategoryid(dataPasing.categoryid);
      dataRpc.setName(categoryData.name);

      dataRpc.setRemoteip(localStorage.getItem(localKey.remoteip));

      return service.doCategoryEdit(dataRpc, null, (err, response) => {
        const status = response?.toObject()?.status;
        setisLoading(false);
        if (status === '000') {
          navigate('/master/category');
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
  // (handleInputChange, onSavecategoryRpc, handleSubmit, onGetClientDataRpc, useEffect, etc.)

  return (
    <div>
      <Card>
        <CardContent>
          <h1>Edit Master Category</h1>

          <form onSubmit={handleSubmit}>
            {/* Replace the 'Name' input with the new field */}
            <InputLabel id="demo-simple-select-label">Master Category Name</InputLabel>
            <TextField
              label="Master Category Name"
              name="name" // Rename the name field to "name"
              value={categoryData.name}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />

            {/* The rest of the form remains unchanged... */}
            {/* (Location, Access, Type inputs, etc.) */}

            <Button type="submit" disabled={isLoading} variant="contained" color="primary">
              {isLoading ? 'Loading' : 'Edit Master Category'}
            </Button>
            <Link to="/master/category">
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

export default EditMasterCategory;
