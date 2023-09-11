import { Box, Button, InputAdornment, OutlinedInput, TextField, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';


import React from 'react'

function Login() {
  return (
    <Box className="login" sx={{ display:'flex' , alignItems:'center' ,justifyContent:'center' }}  >
        <Box sx={{ display:"flex" , boxShadow:"0px 0px 10px 0px white" , alignItems:'center' , justifyContent:'center' , flexDirection:'column' , gap:'1.5rem', padding:"2rem", borderRadius:3 , backgroundColor:'white' }} >
            <Typography sx={{fontFamily:'montserrat',fontWeight:500,textTransform:'capitalize',fontSize:"1.2rem"}} >sign in please</Typography>
            <Box component='img' src="./images/login.jpg" sx={{width:'18rem'}} />

            <OutlinedInput  focused placeholder='username' sx={{borderRadius:'10rem' , width:"20rem", fontFamily:"montserrat",fontWeight:500}} startAdornment={
            <InputAdornment position="start">
              <PersonIcon fontSize='large'  />
            </InputAdornment>
          } />
            <OutlinedInput  focused placeholder='password' sx={{borderRadius:'10rem' ,width:"20rem", fontFamily:"montserrat",fontWeight:500}} 
                startAdornment={
                    <InputAdornment position="start">
                      <LockIcon fontSize='medium'  />
                    </InputAdornment>
                  }
            />
            <Button variant='contained' fullWidth sx={{ fontFamily:'montserrat',fontWeight:500 , fontSize:"1rem" }} >Submit details</Button>
        </Box>
    </Box>
  )
}

export default Login