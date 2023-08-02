import React, {useState, useEffect} from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  MenuItem,
  InputLabel,
  Select,
  TableCell,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  TableBody
} from '@mui/material';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';

import localKey from 'constant';
import {GateHardwareViewRequest, PlacesRequest} from 'proto/webadmin_pb';
import {service} from 'proto/service';

const Hardware = () => {
  const [gateData, setGateData] = useState({clientid: 'CLRA23052915', placeid: '', gateid: 'LEOATEMATE23052922'});

  const [placeData, setPlaceData] = useState({
    data: [],
    isLoading: false,
    isError: false
  });
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState('');
  const [data, setData] = useState([]);

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

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const handleSearch = (event) => {
    setSearchTerm(event?.target?.value);
  };

  const filteredData = data.filter((item) => item.gateid?.toLowerCase()?.includes(searchTerm?.toLowerCase()));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const onGetData = async () => {
    setisLoading(true);

    try {
      const dataRpc = new GateHardwareViewRequest();
      dataRpc.setSessionid(localStorage.getItem(localKey.sessionid));
      dataRpc.setAdminid(localStorage.getItem(localKey.adminid));
      dataRpc.setClientid('CLRA23052915');
      dataRpc.setPlaceid('LEOATE23052920');
      dataRpc.setGateid('LEOATEMATE23052922');
      dataRpc.setRemoteip(localStorage.getItem(localKey.remoteip));

      return service.doGateHardwareView(dataRpc, null, (err, response) => {
        const status = response?.toObject()?.status;
        setisLoading(false);

        if (status === '000') {
          const dataResponse = response?.toObject();
          setData(dataResponse?.resultsList);
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

  const onGetClientDataRpc = async () => {
    setPlaceData({
      isLoading: true,
      ...placeData
    });
    try {
      const dataRpc = new PlacesRequest();
      dataRpc.setSessionid(localStorage.getItem(localKey.sessionid));
      dataRpc.setAdminid(localStorage.getItem(localKey.adminid));
      dataRpc.setClientid('');
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
  }, []);

  return (
    <div>
      <Card>
        <CardContent>
          <h1>List Hardware</h1>

          {/* <form onSubmit={handleSubmit}> */}
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
          >
            {placeData.data.map((item) => {
              return (
                <MenuItem key={item.placeid} value={item.placeid}>
                  {item.placename}
                </MenuItem>
              );
            })}
          </Select>
          <InputLabel id="demo-simple-select-label"> Client ID</InputLabel>

          <TextField
            label="clientid"
            name="clientid"
            value={gateData.clientid}
            onChange={handleInputChange}
            required
            fullWidth
            sx={{marginBottom: '1rem'}}
          />
          <InputLabel id="demo-simple-select-label"> Gate ID</InputLabel>

          <TextField
            label="Gate ID"
            name="gateid"
            value={gateData.gateid}
            onChange={handleInputChange}
            required
            fullWidth
            sx={{marginBottom: '1rem'}}
          />

          <Button onClick={onGetData} disabled={isLoading} variant="contained" color="primary">
            {isLoading ? 'Loading' : 'Cari Data'}
          </Button>
          {/* </form> */}
        </CardContent>
      </Card>

      {data.length > 0 && (
        <Card>
          <CardContent>
            <div style={{marginBottom: '1rem', display: 'flex', justifyContent: 'space-between'}}>
              <TextField
                label="Search by Gate Name, Shift, role, or Parking Location"
                value={searchTerm}
                onChange={handleSearch}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    handleSearch(event);
                  }
                }}
              />
              <Link to={'/transaction/add-gate'}>
                <Button variant="contained" color="primary">
                  List Gate Hardware
                </Button>
              </Link>
            </div>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Gate ID</TableCell>
                    <TableCell>Controller</TableCell>
                    <TableCell>Camera</TableCell>
                    <TableCell>Printer</TableCell>
                    <TableCell>Edit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentItems.map((item) => (
                    <TableRow key={item?.gateid}>
                      <TableCell>{item?.gateid}</TableCell>
                      <TableCell>{item?.controller}</TableCell>
                      <TableCell>{item?.camera}</TableCell>
                      <TableCell>{item?.printer}</TableCell>
                      <TableCell>
                        <Link to={'/gates/edit-gate'} state={{data: item}}>
                          <Button variant="contained" color="secondary" size="small">
                            Edit
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div style={{marginTop: '1rem', display: 'flex', justifyContent: 'center'}}>
              {Array.from({length: totalPages}, (_, index) => (
                <Button
                  key={index + 1}
                  variant={currentPage === index + 1 ? 'contained' : 'outlined'}
                  color="primary"
                  onClick={() => handlePaginationClick(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Hardware;
