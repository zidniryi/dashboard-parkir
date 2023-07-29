import React, {useState, useEffect} from 'react';
import {TextField, Button, Card, CardContent, MenuItem, Select, InputLabel} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';

import localKey from 'constant';
import {PlaceAddRequest, CitiesRequest, ProvincesRequest, CountriesRequest, ClientsRequest} from 'proto/webadmin_pb';
import {service} from 'proto/service';

const AddPlaces = () => {
  const [placeData, setPlaceData] = useState({
    clientId: '',
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

  const [clientData, setClientData] = useState({
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
      dataRpc.setClientid(placeData.clientId);

      dataRpc.setName(placeData.name);
      dataRpc.setAddress(placeData.address);
      dataRpc.setCity(placeData.city);
      dataRpc.setProvince(placeData.province);
      dataRpc.setZipcode(placeData.zipcode);
      dataRpc.setLatitude(localStorage.getItem(localKey.latitude));
      dataRpc.setLongitude(localStorage.getItem(localKey.longitude));

      dataRpc.setCountry(placeData.country);

      dataRpc.setType(placeData.type);
      dataRpc.setCategory(placeData.category);
      dataRpc.setRemoteip(localStorage.getItem(localKey.remoteip));

      return service.doPlaceAdd(dataRpc, null, (err, response) => {
        const status = response?.toObject()?.status;
        setisLoading(false);

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

  // Get Clients
  const onGetClientDataRpc = async () => {
    setClientData({
      isLoading: true,
      ...clientData
    });
    try {
      const dataRpc = new ClientsRequest();
      dataRpc.setSessionid(localStorage.getItem(localKey.sessionid));
      dataRpc.setAdminid(localStorage.getItem(localKey.adminid));
      dataRpc.setRemoteip(localStorage.getItem(localKey.remoteip));

      return service.doGetClients(dataRpc, null, (err, response) => {
        const status = response?.toObject()?.status;
        setClientData({
          isLoading: false,
          ...clientData
        });

        if (status === '000') {
          const dataResponse = response?.toObject();
          setClientData({
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
      setClientData({
        isLoading: false,
        isError: true,
        data: []
      });
      setisError(err?.toString());
    }
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
    onGetClientDataRpc();
  }, []);

  return (
    <div>
      <Card>
        <CardContent>
          <h1>Add Place</h1>

          <form onSubmit={handleSubmit}>
            <InputLabel id="demo-simple-select-label">Client Name</InputLabel>
            <Select
              placeholder="Client ID"
              label="ClientId"
              fullWidth
              sx={{marginBottom: '1rem'}}
              name="clientId"
              required
              value={placeData.clientId}
              onChange={handleInputChange}
            >
              {clientData.data.map((item) => {
                return (
                  <MenuItem key={item.clientid} value={item.clientid}>
                    {item.clientname}
                  </MenuItem>
                );
              })}
            </Select>
            <InputLabel id="demo-simple-select-label"> Name</InputLabel>
            <TextField
              label="Name"
              name="name"
              value={placeData.name}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />
            <InputLabel id="demo-simple-select-label">Address</InputLabel>
            <TextField
              label="Address"
              name="address"
              value={placeData.address}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />
            <InputLabel id="demo-simple-select-label">Country</InputLabel>

            <Select
              placeholder="Country"
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
            <InputLabel id="demo-simple-select-label">Province</InputLabel>
            <Select
              placeholder="Province"
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
            <InputLabel id="demo-simple-select-label">City</InputLabel>
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
            <InputLabel id="demo-simple-select-label">Zipcode</InputLabel>
            <TextField
              label="Zipcode"
              name="zipcode"
              value={placeData.zipcode}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{marginBottom: '1rem'}}
            />
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              label="Type"
              fullWidth
              sx={{marginBottom: '1rem'}}
              name="type"
              required
              value={placeData.type}
              onChange={handleInputChange}
              defaultValue="TICKET"
            >
              <MenuItem value="MEMBER">MEMBER</MenuItem>
              <MenuItem value="TICKET">TICKET</MenuItem>
            </Select>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              label="Category"
              fullWidth
              sx={{marginBottom: '1rem'}}
              name="category"
              required
              value={placeData.category}
              onChange={handleInputChange}
              defaultValue="CLUSTER"
            >
              <MenuItem value="CLUSTER">CLUSTER</MenuItem>
            </Select>

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
