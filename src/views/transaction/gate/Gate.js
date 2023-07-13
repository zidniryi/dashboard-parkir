import React, {useState} from 'react';
import {Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TextField, Button, Card, CardContent} from '@mui/material';
import {Link} from 'react-router-dom';

const Gate = () => {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState([
    // Dummy data
    {
      id: '001',
      noGate: 'Gate 1',
      totalIncomeToday: 500000,
      totalVehicle: 100,
      location: 'Jakarta'
    },
    {
      id: '002',
      noGate: 'Gate 2',
      totalIncomeToday: 400000,
      totalVehicle: 80,
      location: 'Surabaya'
    },
    {
      id: '003',
      noGate: 'Gate 3',
      totalIncomeToday: 600000,
      totalVehicle: 120,
      location: 'Bandung'
    }
    // ... 7 more data entries
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((item) => item.noGate.toLowerCase().includes(searchTerm.toLowerCase()));

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
            <TextField label="Search by Gate" value={searchTerm} onChange={handleSearch} />
            <Link to={'/transaction/add-gate'}>
              <Button variant="contained" color="primary">
                Add Gate
              </Button>
            </Link>
          </div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>No Gate</TableCell>
                  <TableCell>Total Income Today (IDR)</TableCell>
                  <TableCell>Total Vehicle</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>View</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.noGate}</TableCell>
                    <TableCell>{item.totalIncomeToday}</TableCell>
                    <TableCell>{item.totalVehicle}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" size="small">
                        View
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Link to={{pathname: '/transaction/edit-gate'}} state={{item}}>
                        <Button variant="contained" color="primary" size="small">
                          Edit
                        </Button>
                      </Link>
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

export default Gate;
