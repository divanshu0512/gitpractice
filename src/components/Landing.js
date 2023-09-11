import React from 'react'
import { AppBar, Box, FormControl, IconButton, InputLabel, MenuItem, Select, Toolbar, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import LandingMode from './LandingMode';
import BestOffers from './BestOffers';
import CashBackOffer from './FoodCashBackOffer';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import image from '../images/eezib2.png';
import image2 from "../images/eezib.png"




function Landing() {

  const [dialog, setDialog] = React.useState(false);
  const [tkn, settkn] = React.useState('');
  const [id, setId] = React.useState('');
  const [name, setName] = React.useState();
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const [appBarStyle, setAppBarStyle] = React.useState({
    background: 'linear-gradient(20deg, rgb(0, 149, 255), rgb(30, 255, 240))',
    height: "4.9rem",
    transition: "all 0.3rem"
  })
  const [imageSource, setImageSource] = React.useState(image);
  const [scrolling, setScrolling] = React.useState(false);

  const location = useLocation();

  React.useEffect(() => {
    const respo = location.state.data[0];
    const tkn = respo.jwt;
    const userId = respo.userDetails;
    const userName = respo.userName;
    setName(userName)
    console.log("user name is : ", userName);
    setId(userId)
    settkn(tkn);
  }, []);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
    const threshold = 550;
    if (window.scrollY > threshold) {
      setAppBarStyle({
        background: "white",
        height: "4rem",
        transition: "all 0.3s"
      });
      setScrolling(true)
      setImageSource(image2)
    } else {
      setAppBarStyle({
        background: 'linear-gradient(20deg, rgb(0, 149, 255), rgb(30, 255, 240))',
        height: "4.9rem",
        transition: "all 0.3s"
      });
      setImageSource(image);
      setScrolling(false)
    }
  }

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])





  function handleClose() {
    setDialog(false)
  }

  const data = [
    {
      index: 1,
      name: "jewelry and lifestyle",
      value: "lifestyle"
    },
    {
      index: 2,
      name: "Books_Magazines & Subscriptions",
      value: "subscriptions"
    },
    {
      index: 3,
      name: "beauty_health",
      value: "health"
    },
    {
      index: 4,
      name: "wellness",
      value: "wellness"
    }, {
      index: 5,
      name: "sports",
      value: "sports"
    },
    {
      index: 6,
      name: "Travel",
      value: "tourism"
    },
    {
      index: 7,
      name: "Beauty_Health & Wellness",
      value: "wellness"
    },

    {
      index: 9,
      name: "Grocery and Retail",
      value: "grocery"
    },
    {
      index: 10,
      name: "Home & Living",
      value: "living"
    },
    {
      index: 11,
      name: "Deals & Subscriptions",
      value: "deals"
    },
    {
      index: 12,
      name: "Mobile Recharge",
      value: "recharges"
    },
    {
      index: 13,
      name: "Restaurants Foods and Drinks",
      value: "restaurants"
    },
    {
      index: 14,
      name: "Music Movies and Entertainment",
      value: "entertainment",
    },
    {
      index: 15,
      name: "Electronics",
      value: "electronics"
    },
    {
      index: 16,
      name: "Cash Cards",
      value: "cash cards"
    },

    {
      index: 18,
      name: "Baby & Kids",
      value: "kids"
    },
    {
      index: 19,
      name: "Apparel_Fashion & Accessories",
      value: "accessories"
    },
    {
      index: 20,
      name: "Sports and Fitness",
      value: "fitness"
    },
    {
      index: 21,
      name: "Automobile",
      value: "automobile"
    },
    {
      index: 22,
      name: "Beauty_Health & Wellness,Sports and Fitness",
      value: "health"
    }
  ]


  const navigate = useNavigate();

  return (
    <Box className="landing" >
      <Box >

        <AppBar position='sticky' className={scrolling ? 'scrolling' : null} style={appBarStyle} >
          <Toolbar >
            {/* <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}>
            </IconButton> */}
            <Box sx={{ width: { lg: "10rem", xs: "8rem" } ,padding: { lg: "0.6rem 0rem 0.6rem 0rem", xs: "0.3rem 0rem 0.3rem 0rem" } }} component='img' src={imageSource} />
            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', cursor: 'pointer' }} id="cursor" >
              {/* <Typography sx={{ fontFamily:'montserrat',fontWeight:500,fontSize:"1.1rem" }} > {name}</Typography> */}

              <FormControl size='small' sx={{ width:{lg:"12rem" , xs:"7rem"} }}>
                <InputLabel id="demo-simple-select-label" sx={{ fontFamily: "montserrat", fontWeight: 500 }}> {!name ? "Guest" : name} </InputLabel>
                <Select
                  value={name}
                  label="Age"
                >
                  <MenuItem onClick={() => setDialog(true)}>categories</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Toolbar>
        </AppBar>

        <BestOffers />

        <LandingMode />
        {/* <LandingMode /> */}
      </Box>


      <Dialog
        open={dialog}
        // onMouseEnter={dialog}
        onMouseLeave={handleClose}
        sx={{ top: 0 }}
      >
        <CancelIcon id="cross" onClick={handleClose} sx={{ position: "relative", marginLeft: "auto", color: '#e05c53', cursor: 'pointer' }} />
        <DialogTitle id="alert-dialog-title">
          {"Unveil Your Inner Choice.."}
        </DialogTitle>
        <DialogContent>

          <Box sx={{ display: 'grid', marginTop: "1rem", gridTemplateColumns: { lg: "repeat(4,1fr)", sm: "repeat(2,1fr)", md: "repeat(3,1fr)" }, gridColumnGap: { lg: '2.5rem', sm: "2rem", md: '4rem', xs: '1rem' }, gridRowGap: '0.5rem' }} >

            {
              data?.map((row) => {
                return (
                  <Typography sx={{ cursor: 'pointer', fontFamily: 'montserrat' }} onClick={() => navigate(`/categories/${row.value}`, { state: { data: [{ "value": row.value, "token": tkn, "id": id }] } })} >{row.value}</Typography>
                )
              })
            }
          </Box>
        </DialogContent>
        <DialogActions >

          <Button onClick={handleClose} >
            Agree
          </Button>
        </DialogActions>
      </Dialog>


    </Box>
  )
}

export default Landing

//onMouseEnter={()=>setDialog(true)}