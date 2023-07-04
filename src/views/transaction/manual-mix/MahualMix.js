import React, {useState} from 'react';
import {Checkbox, FormControlLabel, Grid, TextField, Button, Select, MenuItem, FormControl, InputLabel, FormGroup} from '@mui/material';

const ManualMix = () => {
  const [isManual, setIsManual] = useState(false);
  const [nomorTiket, setNomorTiket] = useState('');
  const [nomorPolisi, setNomorPolisi] = useState('');
  const [kendaraan, setKendaraan] = useState('');
  const [pintuKeluar, setPintuKeluar] = useState('');
  const [petugas, setPetugas] = useState('');
  const [tanggalKeluar, setTanggalKeluar] = useState('');
  const [shift, setShift] = useState('');
  const [denda, setDenda] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Handle form submission logic here
    // You can access the form values using the corresponding state variables

    // Reset the form fields
    setIsManual(false);
    setNomorTiket('');
    setNomorPolisi('');
    setKendaraan('');
    setPintuKeluar('');
    setPetugas('');
    setTanggalKeluar('');
    setShift('');
    setDenda(false);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControlLabel control={<Checkbox checked={isManual} onChange={(e) => setIsManual(e.target.checked)} />} label="Is Manual?" />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Nomor Tiket" value={nomorTiket} onChange={(e) => setNomorTiket(e.target.value)} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Nomor Polisi" value={nomorPolisi} onChange={(e) => setNomorPolisi(e.target.value)} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Kendaraan</InputLabel>
            <Select value={kendaraan} onChange={(e) => setKendaraan(e.target.value)}>
              <MenuItem value="motor">Motor</MenuItem>
              <MenuItem value="mobil">Mobil</MenuItem>
              <MenuItem value="truk">Truk</MenuItem>
              <MenuItem value="taksi">Taksi</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField label="Pintu Keluar" value={pintuKeluar} onChange={(e) => setPintuKeluar(e.target.value)} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Petugas" value={petugas} onChange={(e) => setPetugas(e.target.value)} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Tanggal Keluar" value={tanggalKeluar} onChange={(e) => setTanggalKeluar(e.target.value)} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Shift</InputLabel>
            <Select value={shift} onChange={(e) => setShift(e.target.value)}>
              <MenuItem value="pagi">Pagi</MenuItem>
              <MenuItem value="malam">Malam</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormGroup>
            <FormControlLabel control={<Checkbox checked={denda} onChange={(e) => setDenda(e.target.checked)} />} label="Denda" />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
          <Button type="submit" variant="contained" color="inherit">
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ManualMix;
