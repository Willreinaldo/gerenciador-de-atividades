import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, Box } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Logo from '../../../assets/two-tickets.svg'
export default function Login() {
    const paperStyle = { padding: 20, height: '75vh', width: 280, margin: '30px auto', fontFamily: "Roboto" }
    const avatarStyle = { backgroundColor: "purple" }
    const logoStyle = { width: '255px', height: '130px', display: 'block'}
    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                <img src={Logo} style={logoStyle}/>
                    <Avatar style={avatarStyle}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <h4>Faça Login para continuar </h4>
                </Grid>
                <TextField label="email" placeholder="e-mail" variant="standard" fullWidth />
                <TextField label="password" placeholder="password" variant="standard" type="password" fullWidth />
                <Box mt={5}>
                <Button type='submit' color="secondary"  variant="contained" fullWidth>Entrar</Button>
                </Box>
                <Typography> Não possui uma conta? <Link href="#">Criar </Link> </Typography>            
            </Paper>
        </Grid>
    );
}
