import React, {useState, useEffect} from 'react';
import {TextField, Button, Card, CardContent, Select, MenuItem} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';

import localKey from 'constant';
import {ClientAddRequest, CitiesRequest} from '../../../proto/webadmin_pb';
import {service} from 'proto/service';

const AddListClient = () => {
  const [officeData, setOfficeData] = useState({
    name: '',
    address: '',
    city: '',
    province: '',
    zipcode: '',
    country: ''
  });

  const [cities, setCities] = useState({
    data: [],
    isLoading: false,
    isError: false
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
      const dataRpc = new ClientAddRequest();
      dataRpc.setSessionid(localStorage.getItem(localKey.sessionid));
      dataRpc.setAdminid(localStorage.getItem(localKey.adminid));

      dataRpc.setName(officeData.name);
      dataRpc.setAddress(officeData.address);
      dataRpc.setCity(officeData.city);
      dataRpc.setProvince(officeData.province);
      dataRpc.setZipcode(officeData.zipcode);
      dataRpc.setCountry(officeData.country);
      dataRpc.setRemoteip(localStorage.getItem(localKey.remoteip));

      return service.doClientAdd(dataRpc, null, (err, response) => {
        const status = response?.toObject()?.status;
        setisLoading(false);
        console.log(response?.toObject());

        if (status === '000') {
          navigate('/clients/add-client');
          setisError('');
          setOfficeData({
            name: '',
            address: '',
            city: '',
            province: '',
            zipcode: '',
            country: ''
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

  const onGetCityRpc = async () => {
    setCities({
      isLoading: true,
      ...cities
    });
    try {
      const dataRpc = new CitiesRequest();
      dataRpc.setSessionid(localStorage.getItem(localKey.sessionid));
      dataRpc.setAdminid(localStorage.getItem(localKey.adminid));
      dataRpc.setProvinceid('33');
      dataRpc.setRemoteip(localStorage.getItem(localKey.remoteip));

      return service.doGetCities(dataRpc, null, (err, response) => {
        const status = response?.toObject()?.status;
        console.log(response?.toObject(), 'cities');
        setCities({
          isLoading: false,
          ...cities
        });

        if (status === '000') {
          const dataResponse = response?.toObject();
          setCities({
            isLoading: true,
            isError: false,
            data: dataResponse?.resultsList
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
      Swal.fire('Error!', `${err?.response?.status} Something went wrong try again`, 'danger');
      setCities({
        isLoading: false,
        isError: true,
        data: []
      });
      setisError(err?.toString());
    }
  };

  useEffect(() => {
    onGetCityRpc();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSaveUserRpc();
  };

  return (
    <div>
      <Card>
        <CardContent>
          <h1>Add Admin/Officer</h1>

          <form onSubmit={handleSubmit}>
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
              label="Address"
              name="address"
              value={officeData.address}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />
            <TextField
              label="Country"
              name="country"
              value={officeData.country}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />
            {/* <TextField
              label="City"
              name="city"
              value={officeData.city}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            /> */}
            <TextField
              label="Province"
              name="province"
              value={officeData.province}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />

            <Select
              label="City"
              fullWidth
              sx={{marginBottom: '1rem'}}
              name="city"
              required
              value={officeData.city}
              onChange={handleInputChange}
            >
              {cities.data.map((item) => {
                return (
                  <MenuItem key={item.cityid} value={item.cityid}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>

            <TextField
              label="Zip Code"
              name="zipcode"
              value={officeData.zipcode}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />

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

export default AddListClient;
