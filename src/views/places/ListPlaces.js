import React, {useState, useEffect} from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
  Card,
  CardContent,
  Switch,
  Chip
} from '@mui/material';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';

import localKey from 'constant';
import {PlaceViewRequest, PlaceToggleRequest, PlaceDeleteRequest} from 'proto/webadmin_pb';
import {service} from 'proto/service';
import Spinner from 'ui-component/Spinner';
import ErrorPage from 'ui-component/ErrorPage';

const ListPlaces = () => {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter(
    (item) =>
      item.clientid?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      item.placeid?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      item.clientname?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      item.placename?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      item.address?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      item.city?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      item.province?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      item.zipcode?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      item.country?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      item.type?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      item.category?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const onGetPlacesListRpc = async () => {
    setisLoading(true);
    try {
      const dataRpc = new PlaceViewRequest();
      dataRpc.setSessionid(localStorage.getItem(localKey.sessionid));
      dataRpc.setAdminid(localStorage.getItem(localKey.adminid));
      dataRpc.setClientid('');
      dataRpc.setName('');
      dataRpc.setProvince('');
      dataRpc.setCountry('');
      dataRpc.setType('');
      dataRpc.setCategory('');

      dataRpc.setRemoteip(localStorage.getItem(localKey.remoteip));

      return service.doPlaceView(dataRpc, null, (err, response) => {
        const status = response?.toObject()?.status;
        setisLoading(false);
        console.log(response?.toObject(), 'Hello');

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
      Swal.fire('Error!', `${err?.response?.status} Something went wrong try again`, 'danger');
      setisLoading(false);
      setisError(err?.toString());
    }
  };

  useEffect(() => {
    onGetPlacesListRpc();
  }, []);

  const onChangeSwitchRpc = (targetId, placeId) => {
    try {
      const dataRpc = new PlaceToggleRequest();
      dataRpc.setSessionid(localStorage.getItem(localKey.sessionid));
      dataRpc.setAdminid(localStorage.getItem(localKey.adminid));
      dataRpc.setClientid(targetId);
      dataRpc.setPlaceid(placeId);
      dataRpc.setRemoteip(localStorage.getItem(localKey.remoteip));

      return service.doPlaceToggle(dataRpc, null, (err, response) => {
        const status = response?.toObject()?.status;

        if (status === '000') {
          onGetPlacesListRpc();
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
    }
  };

  const onDeleteRpc = (targetId, placeId) => {
    try {
      const dataRpc = new PlaceDeleteRequest();
      dataRpc.setSessionid(localStorage.getItem(localKey.sessionid));
      dataRpc.setAdminid(localStorage.getItem(localKey.adminid));
      dataRpc.setClientid(targetId);
      dataRpc.setPlaceid(placeId);

      dataRpc.setRemoteip(localStorage.getItem(localKey.remoteip));

      return service.doPlaceDelete(dataRpc, null, (err, response) => {
        const status = response?.toObject()?.status;

        if (status === '000') {
          Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
          onGetPlacesListRpc();
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
    }
  };

  const onDeleteAlert = (data) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Delete this ${data.placeid}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        onDeleteRpc(data.clientid, data.placeid);
      }
    });
  };

  if (isLoading) return <Spinner />;
  else if (isError) return <ErrorPage errorMessage={isError} />;
  return (
    <div>
      <Card>
        <CardContent>
          <div
            style={{
              marginBottom: '1rem',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <TextField
              label="Search by Places ID, Place ID, Places Name, Place Name, Address, City, Province, Zipcode, Country, Type, Category, Gate In, Gate Out, or IsActive"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Link to={'/places/add-place'}>
              <Button variant="contained" color="primary">
                Add Place
              </Button>
            </Link>
          </div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Client ID</TableCell>
                  <TableCell>Place ID</TableCell>
                  <TableCell>Places Name</TableCell>
                  <TableCell>Place Name</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Province</TableCell>
                  <TableCell>Zipcode</TableCell>
                  <TableCell>Country</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Gate In</TableCell>
                  <TableCell>Gate Out</TableCell>
                  <TableCell>Is Active</TableCell>
                  <TableCell>Set Active</TableCell>
                  <TableCell>View</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentItems.map((item) => (
                  <TableRow key={item?.placeid}>
                    <TableCell>{item?.clientid}</TableCell>
                    <TableCell>{item?.placeid}</TableCell>
                    <TableCell>{item?.clientname}</TableCell>
                    <TableCell>{item?.placename}</TableCell>
                    <TableCell>{item?.address}</TableCell>
                    <TableCell>{item?.city}</TableCell>
                    <TableCell>{item?.province}</TableCell>
                    <TableCell>{item?.zipcode}</TableCell>
                    <TableCell>{item?.country}</TableCell>
                    <TableCell>{item?.type}</TableCell>
                    <TableCell>{item?.category}</TableCell>
                    <TableCell>{item?.gatein}</TableCell>
                    <TableCell>{item?.gateout}</TableCell>
                    <TableCell>
                      <Chip label={item?.isactive ? 'Y' : 'N'} color={item?.isactive ? 'primary' : 'error'} />
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={item?.isactive}
                        onChange={() => onChangeSwitchRpc(item?.clientid, item?.placeid)}
                        inputProps={{'aria-label': 'controlled'}}
                      />
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" size="small">
                        View
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Link to={'/places/edit-place'} state={{data: item}}>
                        <Button variant="contained" color="secondary" size="small">
                          Edit
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="error" size="small" onClick={() => onDeleteAlert(item)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div
            style={{
              marginTop: '1rem',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
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
    </div>
  );
};

export default ListPlaces;
