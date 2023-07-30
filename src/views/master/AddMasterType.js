import React, {useState} from 'react';
import {TextField, Button, Card, CardContent} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';

import localKey from 'constant';
import {TypeAddRequest} from 'proto/webadmin_pb';
import {service} from 'proto/service';

const AddMasterType = () => {
  const [reqData, setReqData] = useState({
    name: ''
  });

  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setReqData((prevData) => ({
      ...prevData,

      [name]: value
    }));
  };

  const onSaveUserRpc = async () => {
    setisLoading(true);
    try {
      const dataRpc = new TypeAddRequest();
      dataRpc.setSessionid(localStorage.getItem(localKey.sessionid));
      dataRpc.setAdminid(localStorage.getItem(localKey.adminid));
      dataRpc.setName(reqData.name);
      dataRpc.setRemoteip(localStorage.getItem(localKey.remoteip));

      return service.doTypeAdd(dataRpc, null, (err, response) => {
        const status = response?.toObject()?.status;
        setisLoading(false);
        console.log(response?.toObject());

        if (status === '000') {
          navigate('/master/type');
          setisError('');
          setReqData({
            name: ''
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
      Swal.fire('Error!', `${isError} Something went wrong, try again`, 'danger');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSaveUserRpc();
  };

  return (
    <div>
      <Card>
        <CardContent>
          <h1>Add Master Type</h1>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              value={reqData.name}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />
            <Button type="submit" disabled={isLoading} variant="contained" color="primary">
              {isLoading ? 'Loading' : '  Add Type'}
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

export default AddMasterType;
