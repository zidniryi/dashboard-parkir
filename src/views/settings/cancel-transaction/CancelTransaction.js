/* eslint-disable no-unused-vars */
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

const CancelTransaction = () => {
  const [data, setData] = useState([
    // Dummy data
    {
      no: 1,
      idParkir: 'A123',
      gate: 'Gate 1',
      noPolisi: 'AB 1234 CD',
      jenisKendaraan: 'Car',
      tanggal: '2023-06-30',
      petugas: 'John Doe'
    },
    {
      no: 2,
      idParkir: 'B456',
      gate: 'Gate 2',
      noPolisi: 'EF 5678 GH',
      jenisKendaraan: 'Motorcycle',
      tanggal: '2023-06-29',
      petugas: 'Jane Smith'
    },
    {
      no: 3,
      idParkir: 'C789',
      gate: 'Gate 1',
      noPolisi: 'IJ 9012 KL',
      jenisKendaraan: 'Car',
      tanggal: '2023-06-28',
      petugas: 'Bob Johnson'
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
      item.jenisKendaraan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tanggal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.petugas.toLowerCase().includes(searchTerm.toLowerCase())
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
            <TextField label="Search by Vehicle Type, Date, or Attendant" value={searchTerm} onChange={handleSearch} />
            <Link to={'/cancel-transaction/add-transaction'}>
              <Button variant="contained" color="primary">
                Add Transaction
              </Button>
            </Link>
          </div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>ID Parkir</TableCell>
                  <TableCell>Gate</TableCell>
                  <TableCell>No Polisi</TableCell>
                  <TableCell>Jenis Kendaraan</TableCell>
                  <TableCell>Tanggal</TableCell>
                  <TableCell>Petugas</TableCell>
                  <TableCell>View</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentItems.map((item) => (
                  <TableRow key={item.no}>
                    <TableCell>{item.no}</TableCell>
                    <TableCell>{item.idParkir}</TableCell>
                    <TableCell>{item.gate}</TableCell>
                    <TableCell>{item.noPolisi}</TableCell>
                    <TableCell>{item.jenisKendaraan}</TableCell>
                    <TableCell>{item.tanggal}</TableCell>
                    <TableCell>{item.petugas}</TableCell>
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

export default CancelTransaction;
