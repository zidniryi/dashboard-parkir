import React, {useState} from 'react';
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
  Chip
} from '@mui/material';
import {Link} from 'react-router-dom';

const Payment = () => {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState([
    // Dummy data
    {
      no: 1,
      paymentType: 'Credit Card',
      status: 'Active',
      updated: '2023-06-30'
    },
    {
      no: 2,
      paymentType: 'Bank Transfer',
      status: 'Inactive',
      updated: '2023-06-29'
    },
    {
      no: 3,
      paymentType: 'E-wallet',
      status: 'Active',
      updated: '2023-06-28'
    }
    // ... more data entries
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter(
    (item) =>
      item.paymentType.toLowerCase().includes(searchTerm.toLowerCase()) || item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Card>
        <CardContent>
          <div style={{marginBottom: '1rem', display: 'flex', justifyContent: 'space-between'}}>
            <TextField label="Search by Payment Type or Status" value={searchTerm} onChange={handleSearch} />
            <Link to={'/payments/add-payment'}>
              <Button variant="contained" color="primary">
                Add Payment
              </Button>
            </Link>
          </div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Payment Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Updated</TableCell>
                  <TableCell>View</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentItems.map((item) => (
                  <TableRow key={item.no}>
                    <TableCell>{item.no}</TableCell>
                    <TableCell>{item.paymentType}</TableCell>
                    <TableCell>
                      <Chip label={item.status} color={item.status === 'Active' ? 'primary' : 'error'} />
                    </TableCell>
                    <TableCell>{item.updated}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" size="small">
                        View
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" size="small">
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="secondary" size="small">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div style={{marginTop: '1rem', textAlign: 'center'}}>
            {Array.from({length: totalPages}, (_, index) => index + 1).map((pageNumber) => (
              <Button
                key={pageNumber}
                variant={pageNumber === currentPage ? 'contained' : 'outlined'}
                color="primary"
                size="small"
                onClick={() => handlePaginationClick(pageNumber)}
                style={{margin: '0.25rem'}}
              >
                {pageNumber}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payment;
