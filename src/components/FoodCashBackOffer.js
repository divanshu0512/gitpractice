import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, CircularProgress, Pagination, Paper, TextField, Typography } from '@mui/material'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';



function CashBackOffer({ someData }) {

    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [page, setPage] = React.useState(1);
    const [auth, setAuth] = React.useState("");
    const [id, setId] = React.useState("");
    const [userName  , setUserName] = React.useState('');

    const location = useLocation();

    async function tokenData() {
        const res = location.state.data;
        const resp = res[0];
        console.log("resp : ",resp)
        {
            if (resp !== "fresh_user") {
                const token = resp.jwt
                console.log("TOKEN data : ", token)
                setAuth(token)

                const userId = resp.userDetails;
                console.log("USER ID IS : ", userId)
                setId(userId);

                const userName = resp.userName;
                console.log("userName : ",userName);
                setUserName(userName)
            }
        }


        setLoading(true);

        // const api = await fetch("http://192.168.0.187/api_portal/public/api/xoxoday/EEZIB/XoxoGetvoucher" , {
        //     method:"POST",
        //     headers:{
        //         "Authorization":`Bearer ${"eyJ0b2tlbkNvbnRlbnQiOnsiaXNzdWVkRm9yIjoidGVzdCIsInNjb3BlIjoiIiwiaXNzdWVkQXQiOjE2ODg2NDM1NzcwMzcsImV4cGlyZXNBdCI6IjIwMjMtMDctMjFUMTE6Mzk6MzcuMDM3WiIsInRva2VuX3R5cGUiOiJVU0VSIn0sImFfdCI6ImV5SmxibU1pT2lKQk1USTRRMEpETFVoVE1qVTJJaXdpWVd4bklqb2lSVU5FU0MxRlV5SXNJbXRwWkNJNkltVnVZeUlzSW1Wd2F5STZleUpyZEhraU9pSkZReUlzSW1OeWRpSTZJbEF0TWpVMklpd2llQ0k2SW5aSFVESjRjMlZXYjJkVVEyTlhhR2xZUVRNeU5IaFpXbVpQVlV4TlJqbFhlVlJHVmpaSlRuZHJjbmNpTENKNUlqb2lVMmN6VDI1dlNrYzVWSE5zUVcxTldYRkZiVXRaWTJOT05qRnFkbGgyYTFWUFNXdGlVRmhUYXpoM1l5SjlmUS4ueF81QXZvU0ZjUnVzQmpGUlRhVTR1QS5MQUEwTW85OURJT2tqdFZjRDYxR2dGWkNCaDh1YWxzeXl6MkxVMEZaNy12YkM2aVpJM2psNjlWRFNnQzhDTnc1Q3VSX3Ria1BWU3pQQU5Icm5YM3dLMWpkX3lMNnA4Zm1VRUhQdzZiRlkxZTgyLTNfNFdIR2ZLSWpaNnJRMHhmd1JUejU3X2lSM3J6UXFvbkI5NXBoQWNwbk0xZ0NXTlRPNVZsM25OUmJ2cTg0QngtVHBsbXJucExUamFMb3ZmSU5YTVhlQ3U2SURHdnBLV0N2QVdWU1d2QzhRZHZ3dDVlMTNjbHFnR3ozOEtqUjRRR0Zsb0tfOHQ4Z1doSVFsZTdIT0NtM1JaOGJFVkJRaElqZm16a1JDYkUtSnJva1dTRVdqN1pUQ3I4ZnNIY2NqZU9KczJCOXIwNmZueG1NRHFuR1lZbGlBQ01zblZhOTdTSnFEV05DdzhDWUtSb3NfMTRhY1A4S1JWRGNsMzM3Nm85RG4tWHBfenl1eURLUzgxZUhfZ3VqczV0azU4clVCdVh0X1ZEbS1EMmRhY29FalkwTGZaOS1aam1Yb1p2b2xwR0dkZU1sQzNZLTRBX2dZWEtYU3JRdjZsVXEzNXNjN25jejFpLWI0VGd4b3lFRU56dmZ2cDd2Y2tSNFdKelRROFZxeDdQTUZfU0d2YVpTUmJWWTFFWEpEWlJldkpXMko2SEtVMGF6ZmI0NHBKN1pLX01FcWZVZlcydkprYWhzM0hlUEJtNzgxSmladG5UQVRDQjBaZmQ4TVR0anJRTWtRd0ZBblBpVXBpM0lFR2hFTXJiNXNaMnBMaGZVNFFhMTZlQUJ2S00wb3hPTmxsQ0FqTkIzNk0wc2l4Uy1lMjBtZzJ3cDJDUEROeWtnOWljeFBvTklLdE1ORmpCYzZFcXo0S21WSWxIeWhhUEZWVFNmVVd5TmFjUmJqbGRWR1FiMTlualcyVzhBUTZLOUw2QndseldjMmhHMVd6SXNsVjBBamc1YzZoRG9oYWRwZ2dXQUJfX3dmc044Y1JxTlRxR1ZnRVNxS0VfaHVabXpoTS14dU1pN2VOMXZFaXkxekF1NG9FUUxxVWpOeVZzUFJPRFVadGhWc3BaWW5wRmNnODRWZmI5X1lMNnR3TUJDaDlZOThCa09rLXJ0dkdHTE93ZXM2ZGNFS3lUemhPSF9kYXNBUTVIT3JlaUNIQmhXel9RMkgxUC0tdFZOdHEyOWV4TlVHSUxCWWhsVTQ0LXg5NlkuTEpMdnRzT3ZrNHBnb2h0SUVRdVFqUSJ9"}`
        //     },
        //     body:JSON.stringify({
        //         "query": "plumProAPI.mutation.getVouchers",
        //         "tag": "plumProAPI",
        //         "variables": {
        //             "data":{
        //                 "limit": 12,
        //                 "page": 1,
        //                 "includeProducts": "",
        //                 "excludeProducts": "",
        //                 "sort": {
        //                     "field":"name",
        //                     "order":"ASC"
        //                 },
        //                 "filters":[
        //                     {
        //                         "key": "country",
        //                         "value": "India"
        //                     },{
        //                         "key": "price",
        //                         "value": ""
        //                     },{
        //                         "key": "productName",
        //                         "value": ""
        //                     }
        //                 ]
        //             }
        //         }
        //     }
        //     )
        // })

        const api = await fetch("http://uat.eezib.in:5000/cards");
        const respo = await api.json();
        console.log("responce : ",respo[0].data.getVouchers.data)
        setData(respo[0].data.getVouchers.data);

        setLoading(false);

    }




    const handleSearch = () => {
        return data.filter((data) =>
            data.name.toLowerCase().includes(search) ||
            data.name.toUpperCase().includes(search)
        )
    }

    const handleCategory = () => {
        return data.filter((data) =>
            data.categories.toLowerCase().includes(someData) ||
            data.categories.toUpperCase().includes(someData)
        )
    }

    React.useEffect(() => {
        tokenData()
    }, [])

    const navigate = useNavigate();


    return (
        <Box className="back" sx={{ padding: '0.1rem', marginTop: '4rem', borderRadius: { lg: "5rem 5rem 0rem 0rem", sm: "3rem 3rem 0rem 0rem ", xs: "1.5rem 1.5rem 0rem 0rem" } }} >
            <Box sx={{ margin: '2rem' }} >


                {
                    !someData ? null :
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} >
                            <Typography sx={{ fontFamily: 'montserrat', fontWeight: 550, textAlign: 'center', fontSize: { lg: "2.4rem", md: "2rem", xs: "1.5rem" } }} >Top Picks For You</Typography>


                            <Box sx={{ marginTop: "2rem", display: 'grid', gridTemplateColumns: { lg: "repeat(4,1fr)", sm: "repeat(2,1fr)", md: "repeat(2,1fr)", xs: "repeat(2,1fr)" }, gridColumnGap: { lg: '1.6rem', sm: "2rem", md: '2rem', xs: '1.3rem' }, gridRowGap: '1rem' }} >


                                {handleCategory()?.slice((page - 1) * 16, (page - 1) * 16 + 16).map((row) => {
                                    return (
                                        <Box sx={{ marginTop: { lg: "3rem", md: "1.8rem", xs: "0rem" } }} >

                                            <Paper onClick={() => navigate(`/voucher`, { state: { data: { row, auth , id} } })} key={row.name} className='scale' elevation={8} sx={{ width: { lg: 280, md: 280, xs: 150 }, height: { lg: 170, md: 170, xs: 90 }, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} >
                                                <Box key={row.productId} component="img" src={row.imageUrl} sx={{ width: { lg: 280, md: 280, xs: 150 }, borderRadius: 2 }} />
                                            </Paper>
                                            <Typography sx={{ textAlign: 'center', color: '#575555', marginTop: '1rem', fontFamily: 'montserrat', fontWeight: 500, fontSize: { lg: "1rem", md: "1rem", xs: "0.6rem" } }} >{row.name}</Typography>

                                        </Box>
                                    )
                                })
                                }



                            </Box>

                            <Pagination
                                size='small'
                                style={{
                                    width: 'auto',
                                    padding: 50,
                                    display: 'flex',
                                    alignContent: 'center',
                                    justifyContent: 'center'
                                }}
                                variant='outlined'
                                color='warning'
                                count={(handleCategory()?.length / 12).toFixed(0)}
                                onChange={(_, value) => {
                                    setPage(value);
                                    window.scroll(0, 730)
                                }}
                            />
                        </Box>
                }




                <Box sx={{ marginTop: { lg: "2rem", xs: "0rem" } }} >
                    <Typography sx={{ textAlign: 'center', fontFamily: 'crimson text', textShadow: "0px 0px 2px white", color: "white", fontSize: { lg: "3.5rem", sm: "2.5rem", xs: "1.35rem" }, fontWeight: 600 }} >Trending Eezib Cashback Cards</Typography>

                </Box>

                <Box sx={{ marginTop: '1rem' }} >
                    <TextField variant='outlined' color='primary' value={search} onChange={(e) => setSearch(e.target.value.toLowerCase())} fullWidth label="get your favourite voucher" sx={{ marginTop: "0.9rem" }} />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 'rem' }} >



                    {
                        loading ? <CircularProgress size="15rem" thickness={1.5} sx={{ color: '#ff9a42', marginTop: "3rem" }} /> :

                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} >



                                <Box sx={{ marginTop: "2rem", display: 'grid', gridTemplateColumns: { lg: "repeat(4,1fr)", sm: "repeat(2,1fr)", md: "repeat(3,1fr)", xs: "repeat(2,1fr)" }, gridColumnGap: { lg: '1.5rem', sm: "2rem", md: '4rem', xs: '1rem' }, gridRowGap: '2.5rem' }} >


                                    {handleSearch()?.slice((page - 1) * 16, (page - 1) * 16 + 16).map((row) => {
                                        return (

                                                
                                                <Paper onClick={() => navigate(`/voucher`, { state: { data: { row, auth, id } } })} elevation={8} sx={{ marginTop: { lg: "2rem", md: "1.8rem", xs: "0rem" }, width: { lg: 270, md: 250, sm: 230, xs: 140 }, position:'relative' , display:'inline-block' ,padding: "0.6rem", borderRadius: 2 }} >
                                                    {
                                                        row.discount > 0 ? 
                                                        <Typography sx={{ position:"absolute" , right:0 , border:{lg:'2px solid white' , xs:"1px solid white"} , padding:{lg:"0rem 1.2rem" , xs:"0rem 0.6rem"} , borderRadius:'0.3rem'  , fontFamily:"montserrat" , fontWeight:500 ,background: 'linear-gradient(230deg, #08C8F6, #4D5DFB)' , color:'#fffb00' , fontSize:{lg:"16px" , xs:"12px"} }} >{row.discount}% off</Typography> :
                                                        null

                                                    }
                                                <Paper key={row.name} className='scale' elevation={8} sx={{ overflow: "hidden", width: { lg: 270, md: 250, sm: 230, xs: 140 }, height: { lg: 170, md: 170, sm: 130, xs: 85 }, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} >
                                                    <Box key={row.productId} component="img" src={row.imageUrl} sx={{ width: { lg: 270, md: 250, sm: 230, xs: 140 }, borderRadius: 2 }} />
                                                </Paper>
                                                <hr />
                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Typography sx={{ textAlign: 'center', color: '#575555', marginTop: '0.5rem', fontFamily: 'montserrat', fontWeight: 500, fontSize: { lg: "1rem", md: "1rem", xs: "0.6rem" } }} >{row.name}</Typography>
                                                    <NavigateNextIcon sx={{ marginLeft: 'auto', marginTop: '0.8rem', fontSize:{xs:"1rem"} }} />
                                                </Box>


                                            </Paper> 
                                         )
                                    })
                                    }



                                </Box>
                            </Box>

                   
                    }
                </Box>

                <Pagination
                    size="small"
                    sx={{
                        // padding:50,
                        width: "auto",
                        display: 'flex',
                        alignContent: 'center',
                        justifyContent: 'center',
                        marginTop: { lg: "4rem", md: "3rem", xs: "1.5rem" }
                    }}
                    variant='outlined'
                    color='secondary'
                    count={(handleSearch()?.length / 16).toFixed(0)}

                    onChange={(_, value) => {
                        setPage(value);
                        window.scroll(0, 730)
                    }}
                />


            </Box>
        </Box>
    )
}

export default CashBackOffer