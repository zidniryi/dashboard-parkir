import React, {useState} from 'react';
import {Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TextField, Button, Card, CardContent} from '@mui/material';
import {Link} from 'react-router-dom';

const Membershipt = () => {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState([
    {
      id: '001',
      name: 'John Doe',
      location: 'RT 02 Alam Sutera',
      date: '2023-06-30',
      totalGateParking: 5,
      rfcId: 'ABC123',
      qrLink: 'https://example.com/qr-link',
      officer: 'Mark Johnson'
    },
    {
      id: '002',
      name: 'Alice Johnson',
      location: 'RT 04 Sentul City',
      date: '2023-06-29',
      totalGateParking: 4,
      rfcId: 'DEF456',
      qrLink: 'https://example.com/qr-link',
      officer: 'Laura Davis'
    },
    {
      id: '003',
      name: 'Michael Brown',
      location: 'RT 01 BSD City',
      date: '2023-06-28',
      totalGateParking: 3,
      rfcId: 'GHI789',
      qrLink: 'https://example.com/qr-link',
      officer: 'Robert Wilson'
    },
    {
      id: '004',
      name: 'Emily Davis',
      location: 'RT 05 Pantai Indah Kapuk',
      date: '2023-06-27',
      totalGateParking: 6,
      rfcId: 'JKL012',
      qrLink: 'https://example.com/qr-link',
      officer: 'Sophia Clark'
    },
    {
      id: '005',
      name: 'Sophia Clark',
      location: 'RT 03 Pluit',
      date: '2023-06-26',
      totalGateParking: 5,
      rfcId: 'MNO345',
      qrLink: 'https://example.com/qr-link',
      officer: 'Ethan Anderson'
    },
    {
      id: '006',
      name: 'Emma Harris',
      location: 'RT 06 Kebon Jeruk',
      date: '2023-06-25',
      totalGateParking: 4,
      rfcId: 'PQR678',
      qrLink: 'https://example.com/qr-link',
      officer: 'Liam Martinez'
    },
    {
      id: '007',
      name: 'William Wilson',
      location: 'RT 07 Grogol',
      date: '2023-06-24',
      totalGateParking: 3,
      rfcId: 'STU901',
      qrLink: 'https://example.com/qr-link',
      officer: 'Ava Moore'
    },
    {
      id: '008',
      name: 'Oliver Lee',
      location: 'RT 09 Kemang',
      date: '2023-06-23',
      totalGateParking: 4,
      rfcId: 'VWX234',
      qrLink: 'https://example.com/qr-link',
      officer: 'Mia Hernandez'
    },
    {
      id: '009',
      name: 'Isabella Taylor',
      location: 'RT 08 Kelapa Gading',
      date: '2023-06-22',
      totalGateParking: 6,
      rfcId: 'YZA567',
      qrLink: 'https://example.com/qr-link',
      officer: 'Noah Lewis'
    },
    {
      id: '010',
      name: 'James Brown',
      location: 'RT 10 Sudirman',
      date: '2023-06-21',
      totalGateParking: 5,
      rfcId: 'BCD890',
      qrLink: 'https://example.com/qr-link',
      officer: 'Sophia Garcia'
    }
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
                Tambah Member
              </Button>
            </Link>
          </div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Nama</TableCell>
                  <TableCell>Alamat</TableCell>
                  <TableCell>Tanggal Daftar</TableCell>
                  <TableCell>RFC ID</TableCell>
                  <TableCell>QR Link</TableCell>
                  <TableCell>Petugas</TableCell>
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
                    <TableCell>{item.rfcId}</TableCell>
                    <TableCell>{item.qrLink}</TableCell>
                    <TableCell>{item.officer}</TableCell>
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

export default Membershipt;
