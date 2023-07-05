import React, {useState} from 'react';
import {Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TextField, Button, Card, CardContent} from '@mui/material';
import {Link} from 'react-router-dom';

const Officer = () => {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState([
    // Dummy data
    {
      no: 1,
      officerName: 'John Doe',
      shift: 'Morning',
      dateAdded: '2023-06-30',
      phoneNumber: '1234567890',
      gate: 'Gate A',
      parkingLocation: 'Parking Lot 1'
    },
    {
      no: 2,
      officerName: 'Alice Johnson',
      shift: 'Afternoon',
      dateAdded: '2023-06-29',
      phoneNumber: '9876543210',
      gate: 'Gate B',
      parkingLocation: 'Parking Lot 2'
    },
    {
      no: 3,
      officerName: 'Michael Brown',
      shift: 'Night',
      dateAdded: '2023-06-28',
      phoneNumber: '4567891230',
      gate: 'Gate C',
      parkingLocation: 'Parking Lot 3'
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
      item.officerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.shift.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.gate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.parkingLocation.toLowerCase().includes(searchTerm.toLowerCase())
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
            <TextField label="Search by Officer Name, Shift, Gate, or Parking Location" value={searchTerm} onChange={handleSearch} />
            <Link to={'/officers/add-officer'}>
              <Button variant="contained" color="primary">
                Add Officer
              </Button>
            </Link>
          </div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Officer Name</TableCell>
                  <TableCell>Shift</TableCell>
                  <TableCell>Date Added</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Gate</TableCell>
                  <TableCell>Parking Location</TableCell>
                  <TableCell>View</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentItems.map((item) => (
                  <TableRow key={item.no}>
                    <TableCell>{item.no}</TableCell>
                    <TableCell>{item.officerName}</TableCell>
                    <TableCell>{item.shift}</TableCell>
                    <TableCell>{item.dateAdded}</TableCell>
                    <TableCell>{item.phoneNumber}</TableCell>
                    <TableCell>{item.gate}</TableCell>
                    <TableCell>{item.parkingLocation}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" size="small">
                        View
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="secondary" size="small">
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="error" size="small">
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

export default Officer;
