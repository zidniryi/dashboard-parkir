import React, {useState, useEffect} from 'react';
import {Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TextField, Button, Card, CardContent} from '@mui/material';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';

import localKey from 'constant';
import {PriceViewRequest, PriceDeleteRequest} from '../../../proto/webadmin_pb';
import {service} from 'proto/service';
import Spinner from 'ui-component/Spinner';
import ErrorPage from 'ui-component/ErrorPage';

const ParkingRates = () => {
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
      item.priceid?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      item.placeid?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      item.free?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      item.duration1?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      item.price1?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      item.duration2?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      item.price2?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      item.duration3?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      item.price3?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      item.price4?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      item.fee?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const onGetAdminListRpc = async () => {
    setisLoading(true);
    try {
      const dataRpc = new PriceViewRequest();
      dataRpc.setSessionid(localStorage.getItem(localKey.sessionid));
      dataRpc.setAdminid(localStorage.getItem(localKey.adminid));
      dataRpc.setPriceid('');
      dataRpc.setPlaceid('');
      dataRpc.setRemoteip(localStorage.getItem(localKey.remoteip));

      // new Promise((resolve, reject) => {
      return service.doPriceView(dataRpc, null, (err, response) => {
        const status = response?.toObject()?.status;
        setisLoading(false);

        if (status == '000') {
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
      // });
    } catch (err) {
      Swal.fire('Error!', `${err?.response?.status} Something went wrong try again`, 'danger');
      setisLoading(false);
      setisError(err?.toString());
    }
  };

  useEffect(() => {
    onGetAdminListRpc();
  }, []);

  const onDeleteRpc = (priceid, placeid) => {
    try {
      const dataRpc = new PriceDeleteRequest();
      dataRpc.setSessionid(localStorage.getItem(localKey.sessionid));
      dataRpc.setAdminid(localStorage.getItem(localKey.adminid));
      dataRpc.setPriceid(priceid);
      dataRpc.setPlaceid(placeid);
      dataRpc.setRemoteip(localStorage.getItem(localKey.remoteip));

      // new Promise((resolve, reject) => {
      return service.doPriceReset(dataRpc, null, (err, response) => {
        const status = response?.toObject()?.status;

        if (status == '000') {
          Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
          onGetAdminListRpc();
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
      Swal.fire('Error!', `${err?.response?.status} Something went wrong try again`, 'danger');
    }
  };

  const onDeleteAlert = (data) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Delete this ${data.adminid}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        onDeleteRpc(data.priceid, data.placeid);
      }
    });
  };

  if (isLoading) return <Spinner />;
  else if (isError) return <ErrorPage errorMessage={isError} />;
  return (
    <div>
      <Card>
        <CardContent>
          <div style={{marginBottom: '1rem', display: 'flex', justifyContent: 'space-between'}}>
            <TextField
              label="Search by Price ID, Place ID, Free, Duration1, Price1, Duration2, Price2, Duration3, Price3, Price4, Fee"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Link to={'/settings/add-price'}>
              <Button variant="contained" color="primary">
                Add Price
              </Button>
            </Link>
          </div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Price ID</TableCell>
                  <TableCell>Place ID</TableCell>
                  <TableCell>Free</TableCell>
                  <TableCell>Duration1</TableCell>
                  <TableCell>Price1</TableCell>
                  <TableCell>Duration2</TableCell>
                  <TableCell>Price2</TableCell>
                  <TableCell>Duration3</TableCell>
                  <TableCell>Price3</TableCell>
                  <TableCell>Price4</TableCell>
                  <TableCell>Fee</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentItems.map((item) => (
                  <TableRow key={item?.priceid}>
                    <TableCell>{item?.priceid}</TableCell>
                    <TableCell>{item?.placeid}</TableCell>
                    <TableCell>{item?.free}</TableCell>
                    <TableCell>{item?.duration1}</TableCell>
                    <TableCell>{item?.price1}</TableCell>
                    <TableCell>{item?.duration2}</TableCell>
                    <TableCell>{item?.price2}</TableCell>
                    <TableCell>{item?.duration3}</TableCell>
                    <TableCell>{item?.price3}</TableCell>
                    <TableCell>{item?.price4}</TableCell>
                    <TableCell>{item?.fee}</TableCell>
                    <TableCell>
                      <Link to={'/settings/edit-price'} state={{data: item}}>
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
    </div>
  );
};

export default ParkingRates;
