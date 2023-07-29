import React, {useState} from 'react';
import {TextField, Button, Card, CardContent} from '@mui/material';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';

import localKey from 'constant';
import {PriceEditRequest} from 'proto/webadmin_pb';
import {service} from 'proto/service';

const EditPrice = () => {
  const location = useLocation();
  const dataPasing = location.state.data;
  const [officeData, setOfficeData] = useState({
    free: dataPasing.free || '',
    duration1: dataPasing.duration1 || '',
    price1: dataPasing.price1 || '',
    duration2: dataPasing.duration2 || '',
    price2: dataPasing.price2 || '',
    duration3: dataPasing.duration3 || '',
    price3: dataPasing.price3 || '',
    price4: dataPasing.price4 || ''
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
      const dataRpc = new PriceEditRequest();
      dataRpc.setSessionid(localStorage.getItem(localKey.sessionid));
      dataRpc.setAdminid(localStorage.getItem(localKey.adminid));
      dataRpc.setPriceid(dataPasing.priceid);
      dataRpc.setPlaceid(dataPasing.placeid);

      dataRpc.setFree(officeData.free);
      dataRpc.setDuration1(officeData.duration1);
      dataRpc.setPrice1(officeData.price1);
      dataRpc.setDuration2(officeData.duration2);
      dataRpc.setPrice2(officeData.price2);
      dataRpc.setDuration3(officeData.duration3);
      dataRpc.setPrice3(officeData.price3);
      dataRpc.setPrice4(officeData.price4);
      dataRpc.setRemoteip(localStorage.getItem(localKey.remoteip));

      return service.doPriceEdit(dataRpc, null, (err, response) => {
        const status = response?.toObject()?.status;
        setisLoading(false);

        if (status === '000') {
          navigate('/settings/parking-rates');
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
          <h1>Edit Clients</h1>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Free"
              name="free"
              value={officeData.free}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />
            <TextField
              label="Duration 1"
              name="duration1"
              value={officeData.duration1}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />
            <TextField
              label="Price 1"
              name="price1"
              value={officeData.price1}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />
            <TextField
              label="Duration 2"
              name="duration2"
              value={officeData.duration2}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />
            <TextField
              label="Price 2"
              name="price2"
              value={officeData.price2}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />
            <TextField
              label="Duration 3"
              name="duration3"
              value={officeData.duration3}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />
            <TextField
              label="Price 3"
              name="price3"
              value={officeData.price3}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />
            <TextField
              label="Price 4"
              name="price4"
              value={officeData.price4}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />

            <Button type="submit" disabled={isLoading} variant="contained" color="primary">
              {isLoading ? 'Loading' : '  Edit Price'}
            </Button>
            <Link to="/settings/parking-rates">
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

export default EditPrice;
