import React, {useState} from 'react';
import {Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TextField, Button, Card, CardContent} from '@mui/material';
import {Link} from 'react-router-dom';

const ListClient = () => {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState([
    // Dummy data
    {
      id: '001',
      name: 'John Doe',
      location: 'Grand Indonesia',
      date: '2023-06-30',
      totalBalancePerDay: 50000,
      totalBalancePerMonth: 1500000,
      employeeName: 'Jane Smith',
      totalGateParking: 5
    },
    {
      id: '002',
      name: 'Alice Johnson',
      location: 'Central Park',
      date: '2023-06-29',
      totalBalancePerDay: 45000,
      totalBalancePerMonth: 1350000,
      employeeName: 'Bob Williams',
      totalGateParking: 4
    },
    {
      id: '003',
      name: 'Michael Brown',
      location: 'Plaza Senayan',
      date: '2023-06-28',
      totalBalancePerDay: 55000,
      totalBalancePerMonth: 1650000,
      employeeName: 'Olivia Taylor',
      totalGateParking: 3
    },
    {
      id: '004',
      name: 'Emily Davis',
      location: 'Pondok Indah Mall',
      date: '2023-06-27',
      totalBalancePerDay: 60000,
      totalBalancePerMonth: 1800000,
      employeeName: 'William Johnson',
      totalGateParking: 6
    },
    {
      id: '005',
      name: 'Sophia Clark',
      location: 'Senayan City',
      date: '2023-06-26',
      totalBalancePerDay: 48000,
      totalBalancePerMonth: 1440000,
      employeeName: 'Ethan Anderson',
      totalGateParking: 5
    },
    {
      id: '006',
      name: 'Emma Harris',
      location: 'Pacific Place',
      date: '2023-06-25',
      totalBalancePerDay: 52000,
      totalBalancePerMonth: 1560000,
      employeeName: 'Liam Martinez',
      totalGateParking: 4
    },
    {
      id: '007',
      name: 'William Wilson',
      location: 'Gandaria City',
      date: '2023-06-24',
      totalBalancePerDay: 45000,
      totalBalancePerMonth: 1350000,
      employeeName: 'Ava Moore',
      totalGateParking: 3
    },
    {
      id: '008',
      name: 'Oliver Lee',
      location: 'Kota Kasablanka',
      date: '2023-06-23',
      totalBalancePerDay: 55000,
      totalBalancePerMonth: 1650000,
      employeeName: 'Mia Hernandez',
      totalGateParking: 4
    },
    {
      id: '009',
      name: 'Isabella Taylor',
      location: 'Lotte Shopping Avenue',
      date: '2023-06-22',
      totalBalancePerDay: 60000,
      totalBalancePerMonth: 1800000,
      employeeName: 'Noah Lewis',
      totalGateParking: 6
    },
    {
      id: '010',
      name: 'James Brown',
      location: 'Mall Taman Anggrek',
      date: '2023-06-21',
      totalBalancePerDay: 48000,
      totalBalancePerMonth: 1440000,
      employeeName: 'Sophia Garcia',
      totalGateParking: 5
    }
    // ... 9 more data entries
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

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
            <TextField label="Search by Name" value={searchTerm} onChange={handleSearch} />
            <Link to={'/clients/add-client'}>
              <Button variant="contained" color="primary">
                Tambah Client
              </Button>
            </Link>
          </div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Total Balance Per Day (IDR)</TableCell>
                  <TableCell>Total Balance Per Month (IDR)</TableCell>
                  <TableCell>Employee Name</TableCell>
                  <TableCell>Total Gate Parking</TableCell>
                  <TableCell>View</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.totalBalancePerDay}</TableCell>
                    <TableCell>{item.totalBalancePerMonth}</TableCell>
                    <TableCell>{item.employeeName}</TableCell>
                    <TableCell>{item.totalGateParking}</TableCell>
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

export default ListClient;
