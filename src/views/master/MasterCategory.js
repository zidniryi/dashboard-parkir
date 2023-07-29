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
import {CategoryViewRequest, CategoryToggleRequest} from 'proto/webadmin_pb';
import {service} from 'proto/service';
import Spinner from 'ui-component/Spinner';
import ErrorPage from 'ui-component/ErrorPage';

const MasterCategory = () => {
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
      item.categoryid?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      item.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      item.isactive?.toLowerCase()?.includes(searchTerm?.toLowerCase())
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
      const dataRpc = new CategoryViewRequest();
      dataRpc.setSessionid(localStorage.getItem(localKey.sessionid));
      dataRpc.setAdminid(localStorage.getItem(localKey.adminid));
      dataRpc.setRemoteip(localStorage.getItem(localKey.remoteip));

      // new Promise((resolve, reject) => {
      return service.doCategoryView(dataRpc, null, (err, response) => {
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

  const onChangeSwitchRpc = (targetId) => {
    try {
      const dataRpc = new CategoryToggleRequest();
      dataRpc.setSessionid(localStorage.getItem(localKey.sessionid));
      dataRpc.setAdminid(localStorage.getItem(localKey.adminid));
      dataRpc.setCategoryid(targetId);
      dataRpc.setRemoteip(localStorage.getItem(localKey.remoteip));

      // new Promise((resolve, reject) => {
      return service.doCategoryToggle(dataRpc, null, (err, response) => {
        const status = response?.toObject()?.status;

        if (status === '000') {
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

  if (isLoading) return <Spinner />;
  else if (isError) return <ErrorPage errorMessage={isError} />;
  return (
    <div>
      <Card>
        <CardContent>
          <div style={{marginBottom: '1rem', display: 'flex', justifyContent: 'space-between'}}>
            <TextField label="Search by Officer Name, Shift, role, or Parking Location" value={searchTerm} onChange={handleSearch} />
            <Link to={'/master/add-category'}>
              <Button variant="contained" color="primary">
                Add Category
              </Button>
            </Link>
          </div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Category ID</TableCell>
                  <TableCell>Category Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Is Active</TableCell>
                  <TableCell>Set Active</TableCell>
                  <TableCell>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentItems.map((item) => (
                  <TableRow key={item?.adminid}>
                    <TableCell>{item?.categoryid}</TableCell>
                    <TableCell>{item?.name}</TableCell>
                    <TableCell>{item?.email}</TableCell>
                    <TableCell>
                      <Chip label={item?.isactive ? 'Y' : 'N'} color={item?.isactive ? 'primary' : 'error'} />
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={item?.isactive}
                        onChange={() => onChangeSwitchRpc(item?.categoryid)}
                        inputProps={{'aria-label': 'controlled'}}
                      />
                    </TableCell>

                    <TableCell>
                      <Link to={'/master/edit-category'} state={{data: item}}>
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
    </div>
  );
};

export default MasterCategory;
