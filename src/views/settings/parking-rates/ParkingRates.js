import React from 'react';
import {Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button, Card, CardContent} from '@mui/material';

const ParkingRates = () => {
  const data = [
    {
      No: 1,
      Kendaraan: 'Car',
      'Grace Periode': '30 minutes',
      'Rotasi Pertama': '1 hour',
      'Rotasi Kedua': '2 hours',
      'Rotasi Seterusnya': '1 hour',
      'Tarif Maksimal': '$10',
      'Tanggal Update': '2023-07-01',
      Pegawai: 'John Doe'
    },
    {
      No: 2,
      Kendaraan: 'Motorcycle',
      'Grace Periode': '20 minutes',
      'Rotasi Pertama': '45 minutes',
      'Rotasi Kedua': '1 hour',
      'Rotasi Seterusnya': '30 minutes',
      'Tarif Maksimal': '$5',
      'Tanggal Update': '2023-07-02',
      Pegawai: 'Jane Smith'
    },
    {
      No: 3,
      Kendaraan: 'Truck',
      'Grace Periode': '45 minutes',
      'Rotasi Pertama': '2 hours',
      'Rotasi Kedua': '3 hours',
      'Rotasi Seterusnya': '1 hour',
      'Tarif Maksimal': '$20',
      'Tanggal Update': '2023-07-03',
      Pegawai: 'Robert Johnson'
    },
    {
      No: 4,
      Kendaraan: 'Taxi',
      'Grace Periode': '15 minutes',
      'Rotasi Pertama': '30 minutes',
      'Rotasi Kedua': '45 minutes',
      'Rotasi Seterusnya': '15 minutes',
      'Tarif Maksimal': '$8',
      'Tanggal Update': '2023-07-04',
      Pegawai: 'Emily Davis'
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
                <TableCell>Grace Periode</TableCell>
                <TableCell>Rotasi Pertama</TableCell>
                <TableCell>Rotasi Kedua</TableCell>
                <TableCell>Rotasi Seterusnya</TableCell>
                <TableCell>Tarif Maksimal</TableCell>
                <TableCell>Tanggal Update</TableCell>
                <TableCell>Pegawai</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.No}>
                  <TableCell>{row.No}</TableCell>
                  <TableCell>{row.Kendaraan}</TableCell>
                  <TableCell>{row['Grace Periode']}</TableCell>
                  <TableCell>{row['Rotasi Pertama']}</TableCell>
                  <TableCell>{row['Rotasi Kedua']}</TableCell>
                  <TableCell>{row['Rotasi Seterusnya']}</TableCell>
                  <TableCell>{row['Tarif Maksimal']}</TableCell>
                  <TableCell>{row['Tanggal Update']}</TableCell>
                  <TableCell>{row.Pegawai}</TableCell>
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

export default ParkingRates;
