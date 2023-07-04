import React from 'react';
import {Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button, Card, CardContent, Chip} from '@mui/material';

const FineRates = () => {
  const data = [
    {
      No: 1,
      Kendaraan: 'Mobil',
      'Tarif Denda Tiket': '$20',
      'Tarif Denda STNK': '$30',
      'Denda Untuk Member': 'Y',
      Status: 'Active'
    },
    {
      No: 2,
      Kendaraan: 'Motor',
      'Tarif Denda Tiket': '$25',
      'Tarif Denda STNK': '$35',
      'Denda Untuk Member': 'Y',
      Status: 'Active'
    },
    {
      No: 3,
      Kendaraan: 'Truck',
      'Tarif Denda Tiket': '$50',
      'Tarif Denda STNK': '$75',
      'Denda Untuk Member': 'Y',
      Status: 'Inactive'
    },
    {
      No: 4,
      Kendaraan: 'Taksi',
      'Tarif Denda Tiket': '$40',
      'Tarif Denda STNK': '$60',
      'Denda Untuk Member': 'N',
      Status: 'Active'
    }
    // Add more data rows here...
  ];

  return (
    <Card>
      <CardContent>
        <Button variant="contained" color="primary" style={{marginBottom: '1rem', marginRight: '1rem'}}>
          Print
        </Button>
        <Button variant="contained" color="error" style={{marginBottom: '1rem', marginRight: '1rem'}}>
          PDF
        </Button>
        <Button variant="contained" color="success" style={{marginBottom: '1rem', marginRight: '1rem'}}>
          CSV
        </Button>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Kendaraan</TableCell>
                <TableCell>Tarif Denda Tiket</TableCell>
                <TableCell>Tarif Denda STNK</TableCell>
                <TableCell>Denda Untuk Member</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.No}>
                  <TableCell>{row.No}</TableCell>
                  <TableCell>{row.Kendaraan}</TableCell>
                  <TableCell>{row['Tarif Denda Tiket']}</TableCell>
                  <TableCell>{row['Tarif Denda STNK']}</TableCell>
                  <TableCell>
                    <Chip
                      label={row['Denda Untuk Member'] === 'Y' ? 'Y' : 'N'}
                      color={row['Denda Untuk Member'] === 'Y' ? 'primary' : 'error'}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip label={row.Status} color={row.Status === 'Active' ? 'primary' : 'error'} />
                  </TableCell>
                  <TableCell>
                    <Button variant="outlined">Edit</Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="outlined">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default FineRates;
