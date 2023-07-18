import React, {useState, useEffect} from 'react';
import {TextField, Button, Card, CardContent, MenuItem, Select} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';

import localKey from 'constant';
import {PlaceAddRequest, CitiesRequest, ProvincesRequest, CountriesRequest} from 'proto/webadmin_pb';
import {service} from 'proto/service';

const AddPlaces = () => {
  const [placeData, setPlaceData] = useState({
    name: '',
    address: '',
    city: '',
    province: '',
    zipcode: '',
    country: '',
    type: '',
    category: ''
  });
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState('');

  const [countries, setCountries] = useState({
    data: [],
    isLoading: false,
    isError: false
  });

  const [provices, setProvinces] = useState({
    data: [],
    isLoading: false,
    isError: false
  });

  const [cities, setCities] = useState({
    data: [],
    isLoading: false,
    isError: false
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setPlaceData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const onSavePlaceRpc = async () => {
    setisLoading(true);
    try {
      const dataRpc = new PlaceAddRequest();
      dataRpc.setSessionid(localStorage.getItem(localKey.sessionid));
      dataRpc.setAdminid(localStorage.getItem(localKey.adminid));
      dataRpc.setClientid('CLI0000001');

      dataRpc.setName(placeData.name);
      dataRpc.setAddress(placeData.address);
      dataRpc.setCity(placeData.city);
      dataRpc.setProvince(placeData.province);
      dataRpc.setZipcode(placeData.zipcode);
      dataRpc.setLatitude(-6.17511);
      dataRpc.setLongitude(106.865036);

      dataRpc.setCountry(placeData.country);

      dataRpc.setType(placeData.type);
      dataRpc.setCategory(placeData.category);
      dataRpc.setRemoteip(localStorage.getItem(localKey.remoteip));

      return service.doPlaceAdd(dataRpc, null, (err, response) => {
        const status = response?.toObject()?.status;
        setisLoading(false);
        console.log(response?.toObject());

        if (status === '000') {
          navigate('/places/list-places');
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
      Swal.fire('Error!', `${isError} Something went wrong try again`, 'danger');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSavePlaceRpc();
    console.log(placeData, 'placeData');
    setPlaceData({
      name: '',
      address: '',
      city: '',
      province: '',
      zipcode: '',
      country: '',
      type: '',
      category: ''
    });
  };

  // Get Countries
  const onGetCountriesRpc = async () => {
    setCountries({
      isLoading: true,
      ...countries
    });
    try {
      const dataRpc = new CountriesRequest();
      dataRpc.setSessionid(localStorage.getItem(localKey.sessionid));
      dataRpc.setAdminid(localStorage.getItem(localKey.adminid));
      dataRpc.setCountryid('');
      dataRpc.setRemoteip(localStorage.getItem(localKey.remoteip));

      return service.doGetCountries(dataRpc, null, (err, response) => {
        const status = response?.toObject()?.status;
        setCountries({
          isLoading: false,
          ...countries
        });

        if (status === '000') {
          const dataResponse = response?.toObject();
          setCountries({
            isLoading: true,
            isError: false,
            data: dataResponse?.resultsList
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: `Something went wrong! Error Get Country! | ${status}`
          });
          setisLoading(false);
          setisError(err?.toString());
        }
      });
    } catch (err) {
      Swal.fire('Error!', `${err?.response?.status} Something went wrong try again  Error Get Country`, 'danger');
      setCountries({
        isLoading: false,
        isError: true,
        data: []
      });
      setisError(err?.toString());
    }
  };

  // Get Province
  const onGetProvinceRpc = async (id) => {
    setProvinces({
      isLoading: true,
      ...provices
    });
    try {
      const dataRpc = new ProvincesRequest();
      dataRpc.setSessionid(localStorage.getItem(localKey.sessionid));
      dataRpc.setAdminid(localStorage.getItem(localKey.adminid));
      dataRpc.setCountryid(id || 'ID');
      dataRpc.setRemoteip(localStorage.getItem(localKey.remoteip));

      return service.doGetProvinces(dataRpc, null, (err, response) => {
        const status = response?.toObject()?.status;
        setProvinces({
          isLoading: false,
          ...provices
        });

        if (status === '000') {
          const dataResponse = response?.toObject();
          setProvinces({
            isLoading: true,
            isError: false,
            data: dataResponse?.resultsList
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: `Something went wrong! Error Get Province! | ${status}`
          });
          setisLoading(false);
          setisError(err?.toString());
        }
      });
    } catch (err) {
      Swal.fire('Error!', `${err?.response?.status} Something went wrong try again  Error Get Province`, 'danger');
      setProvinces({
        isLoading: false,
        isError: true,
        data: []
      });
      setisError(err?.toString());
    }
  };

  // Get city RPC
  const onGetCityRpc = async (id) => {
    setCities({
      isLoading: true,
      ...cities
    });
    try {
      const dataRpc = new CitiesRequest();
      dataRpc.setSessionid(localStorage.getItem(localKey.sessionid));
      dataRpc.setAdminid(localStorage.getItem(localKey.adminid));
      dataRpc.setProvinceid(id);
      dataRpc.setRemoteip(localStorage.getItem(localKey.remoteip));

      return service.doGetCities(dataRpc, null, (err, response) => {
        const status = response?.toObject()?.status;
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
            text: `Something went wrong! Error Get City | ${status}`
          });
          setisLoading(false);
          setisError(err?.toString());
        }
      });
    } catch (err) {
      Swal.fire('Error!', `${err?.response?.status} Something went wrong try again  Error Get City `, 'danger');
      setCities({
        isLoading: false,
        isError: true,
        data: []
      });
      setisError(err?.toString());
    }
  };

  useEffect(() => {
    onGetCountriesRpc();
  }, []);

  return (
    <div>
      <Card>
        <CardContent>
          <h1>Add Place</h1>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              value={placeData.name}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />
            <TextField
              label="Address"
              name="address"
              value={placeData.address}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />
            <Select
              label="Country"
              fullWidth
              sx={{marginBottom: '1rem'}}
              name="country"
              required
              value={placeData.country}
              onChange={handleInputChange}
            >
              {countries.data.map((item) => {
                return (
                  <MenuItem key={item.countryid} value={item.countryid} onClick={() => onGetProvinceRpc(item.countryid)}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>

            <Select
              label="Province"
              fullWidth
              sx={{marginBottom: '1rem'}}
              name="province"
              required
              value={placeData.province}
              onChange={handleInputChange}
            >
              {provices.data.map((item) => {
                return (
                  <MenuItem key={item.provinceid} value={item.provinceid} onClick={() => onGetCityRpc(item.provinceid)}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>

            <Select
              label="City"
              fullWidth
              sx={{marginBottom: '1rem'}}
              name="city"
              required
              value={placeData.city}
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
            {/* <TextField
              label="City"
              name="city"
              value={placeData.city}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />
            <TextField
              label="Province"
              name="province"
              value={placeData.province}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            /> */}
            <TextField
              label="Zipcode"
              name="zipcode"
              value={placeData.zipcode}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />
            {/* <TextField
              label="Country"
              name="country"
              value={placeData.country}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            /> */}
            <TextField
              label="Type"
              name="type"
              value={placeData.type}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />
            <TextField
              label="Category"
              name="category"
              value={placeData.category}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />

            <Button type="submit" disabled={isLoading} variant="contained" color="primary">
              {isLoading ? 'Loading' : 'Add Place'}
            </Button>
            <Link to="/places/list-places">
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

export default AddPlaces;
