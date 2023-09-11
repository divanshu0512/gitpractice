import { Box, Typography } from '@mui/material'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function FrontPage() {

  const [verification, setVerification] = React.useState("");
  const [userId, setUserid] = React.useState("");

  const navigate = useNavigate();

  const location = window.location.search
  const token = location.replace("?home=", " ")
  console.log("window location : ", token);

  async function getData() {


    try {

      const api = await fetch("http://uat.eezib.in:5000", {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify({ token })
      });
      const respo = await api.json();
      console.log(respo);
      if (respo.data.message === "Unauthenticated.") {
        window.location.replace("http://uat.eezib.in/login")
      }

      const auth = respo.data;
      const jwt = auth.access_token.original.access_token;
      setVerification(jwt);
      const userDetails = auth.access_token.original.user.id;
      setUserid(userDetails);
      const userName = auth.access_token.original.user.name;
      console.log("user name : ", userName)

      console.log("RESPO data : ", respo);

      jwt && userDetails ? navigate("/eezib", { state: { data: [{ "jwt": jwt, "userDetails": userDetails, "userName": userName }] } }) : window.location.replace("http://uat.eezib.in/login");

    } catch (error) {
      location.replace("uat.eezib.in/login");
    } }

  React.useEffect(() => {
    !token ? navigate("/eezib", { state: { data: "fresh_user" } }) : getData()
  }, [])

  return (
    <Box className="welcome" >
      <Typography sx={{ color: "white", fontFamily: 'bangers', fontSize: '10rem' }} >eezib gift cards</Typography>
    </Box>
  )
}

export default FrontPage