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
import {GateViewRequest, AdminUserToggleRequest, AdminUserDeleteRequest} from '../../../proto/webadmin_pb';
import {service} from 'proto/service';
import Spinner from 'ui-component/Spinner';
import ErrorPage from 'ui-component/ErrorPage';
const Gate = () => {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const handleSearch = (event) => {
    setSearchTerm(event?.target?.value);
  };

  const filteredData = data.filter(
    (item) =>
      item.clientid?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      item.placeid?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      item.gateid?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      item.clientname?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      item.placename?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      item.gatename?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      item.location?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      item.access?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      item.type?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const onGetGateListRpc = async () => {
    setisLoading(true);
    try {
      const dataRpc = new GateViewRequest();
      dataRpc.setSessionid(localStorage.getItem(localKey.sessionid));
      dataRpc.setAdminid(localStorage.getItem(localKey.adminid));
      dataRpc.setClientid('');
      dataRpc.setPlaceid('');
      dataRpc.setName('');
      dataRpc.setLocation('');
      dataRpc.setAccess('');
      dataRpc.setType('');

      dataRpc.setRemoteip(localStorage.getItem(localKey.remoteip));

      // new Promise((resolve, reject) => {
      return service.doGateView(dataRpc, null, (err, response) => {
        const status = response?.toObject()?.status;
        setisLoading(false);

        if (status == '000') {
          const dataResponse = response?.toObject();
          console.log(dataResponse?.resultsList, 'Here');
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
    onGetGateListRpc();
  }, []);

  const onChangeSwitchRpc = (targetId) => {
    try {
      const dataRpc = new AdminUserToggleRequest();
      dataRpc.setSessionid(localStorage.getItem(localKey.sessionid));
      dataRpc.setAdminid(localStorage.getItem(localKey.adminid));
      dataRpc.setTargetadminid(targetId);
      dataRpc.setRemoteip(localStorage.getItem(localKey.remoteip));

      // new Promise((resolve, reject) => {
      return service.doAdminUserToggle(dataRpc, null, (err, response) => {
        const status = response?.toObject()?.status;

        if (status == '000') {
          onGetGateListRpc();
          // console.log(dataResponse?.resultsList);
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

  const onDeleteRpc = (targetId) => {
    try {
      const dataRpc = new AdminUserDeleteRequest();
      dataRpc.setSessionid(localStorage.getItem(localKey.sessionid));
      dataRpc.setAdminid(localStorage.getItem(localKey.adminid));
      dataRpc.setTargetadminid(targetId);
      dataRpc.setRemoteip(localStorage.getItem(localKey.remoteip));

      // new Promise((resolve, reject) => {
      return service.doAdminUserDelete(dataRpc, null, (err, response) => {
        const status = response?.toObject()?.status;

        if (status == '000') {
          Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
          onGetGateListRpc();
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
        onDeleteRpc(data.adminid);
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
              label="Search by Gate Name, Shift, role, or Parking Location"
              value={searchTerm}
              onChange={handleSearch}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  handleSearch(event);
                  console.log(searchTerm, 'searchTerm');
                }
              }}
            />
            <Link to={'/settings/add-officer'}>
              <Button variant="contained" color="primary">
                Add Gate
              </Button>
            </Link>
          </div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Client ID</TableCell>
                  <TableCell>Place ID</TableCell>
                  <TableCell>Gate ID</TableCell>
                  <TableCell>Client Name</TableCell>
                  <TableCell>Place Name</TableCell>
                  <TableCell>Gate Name</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Access</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Is Active</TableCell>
                  <TableCell>Is Generated</TableCell>
                  <TableCell>Last Generated</TableCell>
                  <TableCell>Set Active</TableCell>
                  <TableCell>View</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentItems.map((item) => (
                  <TableRow key={item?.clientid}>
                    <TableCell>{item?.clientid}</TableCell>
                    <TableCell>{item?.placeid}</TableCell>
                    <TableCell>{item?.gateid}</TableCell>
                    <TableCell>{item?.clientname}</TableCell>
                    <TableCell>{item?.placename}</TableCell>
                    <TableCell>{item?.gatename}</TableCell>
                    <TableCell>{item?.location}</TableCell>
                    <TableCell>{item?.access}</TableCell>
                    <TableCell>{item?.type}</TableCell>
                    <TableCell>
                      <Chip label={item?.isactive ? 'Y' : 'N'} color={item?.isactive ? 'primary' : 'error'} />
                    </TableCell>
                    <TableCell>
                      <Chip label={item?.isgenerated ? 'Y' : 'N'} color={item?.isgenerated ? 'primary' : 'error'} />
                    </TableCell>
                    <TableCell>{item?.lastgenerated ? item?.lastgenerated : '-'}</TableCell>
                    <TableCell>
                      <Switch
                        checked={item?.isactive}
                        onChange={() => onChangeSwitchRpc(item?.adminid)}
                        inputProps={{'aria-label': 'controlled'}}
                      />
                    </TableCell>

                    <TableCell>
                      <Button variant="contained" color="primary" size="small">
                        View
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Link to={'/settings/edit-officer'} state={{data: item}}>
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

export default Gate;
