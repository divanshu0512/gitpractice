import { Accordion, AccordionDetails, AccordionSummary, AppBar, Box, Button, CircularProgress, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Paper, Select, TextField, Toolbar, Tooltip, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import * as XLSX from 'xlsx';
import { useDropzone } from 'react-dropzone';
import { saveAs } from 'file-saver';
import DownloadIcon from '@mui/icons-material/Download';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import image from "../images/eezib2.png";
import CancelIcon from '@mui/icons-material/Cancel';



function Voucher() {

    const [data, setData] = React.useState([]);
    const [menuData, setMenuData] = React.useState();
    const [denomination, setSelectedMenu] = React.useState("");
    const [quantity, setQuantity] = React.useState(null);
    const [user, setUser] = React.useState([]);
    const [user_id, setUserId] = React.useState("");
    const [productId, setProductId] = React.useState("");
    const [file, setFile] = React.useState(null)
    const [jsonData, setJsonData] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [base, setBase] = React.useState(null);
    const [respo, setRespo] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [process, setProcess] = React.useState(false);
    const [excelFile, setExcelFile] = React.useState(null);
  const [base64Content, setBase64Content] = React.useState('');
  const [duplicateContactsDetected, setDuplicateContactsDetected] = React.useState(false);
  const [totalQuantity , setTotalQuantity] = React.useState(null)
  const [value , setValue] = React.useState(false);
  const [totalAmount , setTotalAmount] = React.useState("");
  const [newOpen , setNewOpen] = React.useState(false);
  const [discountMargin , setDiscountMargin] = React.useState("");
  const [discountNum , setDiscountNum] = React.useState("");
  const [totalDiscount , setTotalDiscount] = React.useState("");
 



    const location = useLocation();

    async function callData() {
        const values = location.state.data.row;
        const user = location.state.data.auth;
        const uid = location.state.data.id;

        console.log("values : ",values)

        setData([values]);
        setUser(user)
        setUserId(uid);
    }

    // bnvrfwer weyfgjkhgf u weyg wewf wefg oe foeg

    React.useState(() => {
        callData()
    }, [data])

    const handleClose = () => {
        setOpen(false);
        window.location.reload()
        // window.location.replace("http://uat.eezib.in/login")
    };





    const menuItemData = () => {

        return data.map((a) => {
            const properdata = a.valueDenominations;
            const data1 = properdata.split(",");
            console.log("impoper data : ", data1);
            setMenuData(data1)
            return data1

        })

    }

    const handleDenominationChange = (e) => {
        setSelectedMenu(e.target.value);
    }

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value)
    }

    function handleAmount() {
        return data?.map((e) => {
            const discValue = !value ? quantity * denomination * (e.discount/100) : totalQuantity * denomination * (e.discount/100)
            setDiscountMargin(discValue);
            console.log("discValue : ",discValue)
            // const total = quantity * denomination - discValue;
            const total = !value ?  quantity * denomination - discValue : totalQuantity * denomination - discValue;
            setTotalDiscount(total);
            console.log("total :",total);
            console.log("discount num : ",e.discount)
            setTotalAmount(total)
            setDiscountNum(e.discount);
            return total
        })
        
    }

    React.useEffect(() => {
        
        menuItemData()
        window.scroll(0, 0)
    }, [])


    // *************************************** API FOR MAKING ORDER PURCHASE **********************************

    async function purchaseOrder() {
        setOpen(true);
        setProcess(true);
        handleAmount();

    }

    const placeOrder = async() => {

        try {

            const data1 = data?.map(x => x.productId);
            const productID = data1[0];
            const productId = String(productID)
            console.log("productID : ", productId)
            // setProductId(productID);
            const fetchApi = await fetch("https://uat.eezib.in/api/orders", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${user}`
                },
                body: JSON.stringify({ "user_id": user_id, "productId": productId, "quantity": quantity || totalQuantity, "denomination": denomination, "json": base64Content , "discount_amt":discountMargin ? discountMargin : 0 , "discount":discountNum ? discountNum : 0, "final_amt":totalDiscount ? totalDiscount :0 })
            })
            const respo = await fetchApi.json();
            setRespo([respo]);
            setProcess(false);     
            console.log("respo data is : ", respo);

            if(respo.msg === "Successfully placed order."){
                setOpen(false);
                setNewOpen(true);
            }else if(respo.message === "Unauthenticated."){
                window.alert("session timeout");
                window.location.replace("https://uat.eezib.in/login");
            }else if(respo.message){
                setOpen(false);
                setNewOpen(true);
            }

        } catch (error) {
            console.log("error");
            navigate("/eezib")
        }

    }

    // *************************************** DOWNLOAD EXCEL LOGIC *******************************************
    

    const handleDownload = () => {
        const data = [
            ['contact', 'email' , 'quantity'],
            ['999556651', 'divanshu@gmail.com', 5],
            ['9996522115', 'sapna@gmail.com', 3],
            ['8884411444', 'sandey', 4],
        ];

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(data);

        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        const excelBuffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        saveAs(blob, 'sample.xlsx');
    };


    // ************************************************** VALIDATING EXCEL LOGIC ******************************************

    const validateExcelContent = (base64Data) => {
        const data = atob(base64Data);
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        let isValid = true;
        setValue(true)
        let sumQuantity = 0;
    
        const expectedHeaders = ['contact', 'email', 'quantity'];
        const headers = Object.keys(sheet)
          .filter((key) => /^[A-Z]+1$/.test(key))
          .map((key) => sheet[key].v);
    
        if (JSON.stringify(headers) !== JSON.stringify(expectedHeaders)) {
          alert('Invalid headers in the uploaded Excel file.');
          return;
        }
    
        for (const cellAddress in sheet) {
          if (sheet.hasOwnProperty(cellAddress)) {
            if (/^[A]+[2-9]\d*$/.test(cellAddress)) {
              const contactCellValue = sheet[cellAddress].v;
    
              if (!/^\d{10}$/.test(contactCellValue)) {
                alert(`Invalid contact number format in ${cellAddress}. Contact number must be 10 digits long.`);
                window.location.reload();
                isValid = false;
                setValue(false)
                break;
              }
            } else if (/^[C]+[2-9]\d*$/.test(cellAddress)) {
              const quantityCellValue = sheet[cellAddress].v;
    
              if (isNaN(quantityCellValue) || quantityCellValue > 10) {
                alert(`Invalid quantity in ${cellAddress}. Quantity cannot exceed 10.`);
                window.location.reload();
                isValid = false;
                setValue(false)
                break;
              }
    
              sumQuantity += quantityCellValue;
            }
          }
        }
    
        if (isValid) {
          alert('Excel uploded successfully');
          setTotalQuantity(sumQuantity);
        }
      };
    

      // ********************************************  ACCEPTING EXCEL FILE *********************************************

      const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
    
        if (selectedFile) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const base64Data = e.target.result.split(',')[1];
    
            // Validate the Excel content
            validateExcelContent(base64Data);
          };
          reader.readAsDataURL(selectedFile);
        }
      };
    


    const navigate = useNavigate();

    return (
        <Box>
            {
                data?.map((row) => {
                    return (
                        <Box sx={{ backgroundColor: "#f0f0f0", minHeight: "100vh" }} >
                            <AppBar position='static' sx={{ backgroundColor: 'black' }} >
                                <Toolbar>
                                        <Box component="img" sx={{width:"8rem"}} src={image} />
                                        <Typography sx={{  fontFamily: 'montserrat', marginLeft:"auto" ,cursor: "pointer", fontWeight: 500, fontSize: { lg: "1.5rem", xs: "0.9rem" }, color: 'orange' }} >{row.name}</Typography>
                                    
                                </Toolbar>
                            </AppBar>

                            <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center', flexDirection: { lg: "row", xs: "column" } }} >

                                <Box sx={{ margin: { lg: "2rem", xs: "0rem" }, marginTop: { xs: "2rem", lg: "2rem" }, width: { lg: "40%", xs: "100%" }, display: 'flex', alignItems: 'center', flexDirection: 'column' }} >


                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                        <Typography sx={{ fontFamily: 'montserrat', fontWeight: 500 }} >Validity :&nbsp; </Typography>
                                        <Typography sx={{ fontFamily: 'montserrat', fontWeight: 500 }} dangerouslySetInnerHTML={{ __html: row?.expiryAndValidity.replace("&nbsp;", " ") }}></Typography>

                                    </Box>

                                    <Paper elevation={18} component='img' src={row.imageUrl} sx={{ borderRadius: 3, marginTop: 1, marginBottom:"0.5rem" ,width: { xs: "20rem", lg: "23rem" } }} />

                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} >

                                        <Accordion sx={{ width: { lg: "25rem", xs: "21rem" }, marginTop: "1.6rem" }} >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography sx={{ fontFamily: "montserrat", fontWeight: 500 }} >Description</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails sx={{ maxHeight:"200px" , overflowY:"auto" }} >
                                                <Typography sx={{ fontFamily: "montserrat", fontWeight: 500 }} dangerouslySetInnerHTML={{ __html: row?.description }} />
                                            </AccordionDetails>
                                        </Accordion>

                                        <Accordion sx={{ width: { lg: "25rem", xs: "21rem" }, marginTop: { lg: "1rem", xs: "0.9rem" } }} >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                                
                                            >
                                                <Typography sx={{ fontFamily: "montserrat", fontWeight: 500 }} >Terms and Conditions</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails sx={{ maxHeight:"200px" , overflowY:"auto" }} >
                                                <Typography sx={{ fontFamily: "montserrat", fontWeight: 500, margin: '0.8rem' }} dangerouslySetInnerHTML={{ __html: row?.termsAndConditionsInstructions }} />

                                            </AccordionDetails>
                                        </Accordion>

                                        <Accordion sx={{ width: { lg: "25rem", xs: "21rem" }, marginTop: { lg: "1rem", xs: "0.9rem" } }} >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography sx={{ fontFamily: "montserrat", fontWeight: 500 }} >Redemption Instructions</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails sx={{ maxHeight:"200px" , overflowY:"auto" }} >
                                                <Typography sx={{ fontFamily: "montserrat", fontWeight: 500, margin: '0.8rem' }} dangerouslySetInnerHTML={{ __html: row?.redemptionInstructions }} />

                                            </AccordionDetails>
                                        </Accordion>

                                    </Box>


                                    <Box sx={{ display: 'flex', alignItems:'center' , justifyContent:'space-between'  , marginTop: '1rem' , flexDirection:'column' }} >

                                        <Box sx={{ display: 'flex' , alignItems:'center' , justifyContent:'center'}} >
                                            <Typography sx={{ fontFamily: "montserrat", fontWeight: 450, fontSize: "1rem" }} >Delivery : </Typography> &nbsp;
                                            <Typography sx={{ fontFamily: "montserrat", fontWeight: 450, fontSize: "1rem" }}  >{row.deliveryType}</Typography>
                                        </Box>
                                        &nbsp;
                                        <Box>
                                            {
                                                data?.map((e) => {
                                                    return (
                                                        <Typography sx={{fontFamily:'montserrat' , fontWeight:500}} >current discount : {e.discount}%</Typography>
                                                    )
                                                })
                                            }
                                        </Box>
                                    </Box>


                                </Box>

                                <Box sx={{ height: 'auto', width: { lg: "60%", xs: "100%" }, display: 'flex', alignItems: 'center', flexDirection: 'column' }} >

                                    <Box sx={{ marginTop: { lg: "5rem", xs: "2rem" }, backgroundColor: 'white', display: 'flex', flexDirection: 'column', borderRadius: 3, gap: '2rem', padding: { lg: "2.5rem", xs: "0.9rem" } }} >

                                       

   {/* ******************************************************* DENOMINATION FIELD ******************************************************* */}

                                        <FormControl sx={{ width: "20rem" }} >
                                            <InputLabel id="demo-simple-select-label" sx={{ fontFamily: 'montserrat', fontWeight: 500 }} >Enter Denomination</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                // value={row.valueDenominations.split(",")}
                                                label="Enter Denomination"
                                                sx={{ fontFamily: 'montserrat', fontWeight: 500, }}
                                                onChange={handleDenominationChange}
                                                key={row.productId}

                                            >
                                                {
                                                    menuData?.map((e) => {
                                                        return (
                                                            <MenuItem sx={{ fontFamily: 'montserrat', fontWeight: 500 }} value={e} >{e}</MenuItem>
                                                        )
                                                    })
                                                }


                                            </Select>
                                        </FormControl>

                
                            
{/* *********************************************************** QUANTITY FIELDN *************************************************** */}

                            {
                                value ? <TextField label="Quantity" focused value={totalQuantity} inputProps={{ style: { fontFamily: 'montserrat', fontWeight: 500 } }} /> :  <TextField label="Quantity" onChange={(e) => totalQuantity ? setQuantity(null) :  setQuantity(e.target.value)} inputProps={{ style: { fontFamily: 'montserrat', fontWeight: 500 } }} />
                            }

                                        {/* <TextField label="Quantity" onChange={(e) => setQuantity(e.target.value)} inputProps={{ style: { fontFamily: 'montserrat', fontWeight: 500 } }} /> */}

                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >

                                            {
                                                row.usageType ? <Box sx={{ display: 'flex', float: 'left' }} >
                                                    
                                                    <Typography sx={{ fontFamily: "montserrat", fontWeight: 450, fontSize: "1rem" }} >usage : </Typography>&nbsp;
                                                    <Typography sx={{ fontFamily: "montserrat", fontWeight: 500, color: 'blue' }} >{row.usageType}</Typography>
                                                </Box> : null
                                            }


                                            <Box sx={{ display: 'flex', alignItems: 'center' }} >
                                                <Typography sx={{ fontFamily: "montserrat", fontWeight: 450, fontSize: "1rem" }} >Fee :</Typography>&nbsp;
                                                <Typography sx={{ fontFamily: "montserrat", fontWeight: 450, fontSize: "1rem", color: 'red' }} >{row.fee}</Typography>
                                            </Box>
                                        </Box>



                                        < hr />

                                        {/* {
                                menuData && quantity ?<Button onClick={() => navigate("/login")} variant='contained' sx={{fontFamily:'montserrat' , fontWeight:500 }} > Purchase </Button> : 
                                <Button disabled variant='contained' sx={{fontFamily:'montserrat' , fontWeight:500 }} > Purchase </Button>
                            } */}

                                        {
                                            user ? denomination && quantity || value ? <Button onClick={() => purchaseOrder()} variant='contained' sx={{ fontFamily: 'montserrat', fontWeight: 500 }} > Purchase @ ₹{ totalQuantity ?  denomination*totalQuantity : denomination *quantity }</Button> : <Button disabled variant='contained' sx={{ fontFamily: 'montserrat', fontWeight: 500 }} > Purchase </Button> :
                                                <Button onClick={() => window.location.replace("https://eezib.in/login")} variant='contained' sx={{ fontFamily: 'montserrat', fontWeight: 500 }} > login </Button>
                                        }


                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' , flexDirection:'column' , margin:'0.5rem' }} >
                                        {/* <Box {...getRootProps()} sx={{ cursor: 'pointer', margin: '0.5rem', padding: '12px', textAlign: 'center' }}>
                                            <input {...getInputProps()} accept=".xlsx" />
                                            {isDragActive ? (
                                                <Typography  >Drop the Excel file here...</Typography>
                                            ) : (
                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "center", fontSize: { lg: "1rem", md: "0.7rem", xs: "0.8rem" } }} > <UploadFileIcon sx={{}} />click to drop excel </Box>
                                            )}
                                        </Box> */}
                                        

                                        <Box>

                                        </Box>

                                        <Box sx={{ display:'flex' , alignItems:'center' , justifyContent:'center'    }} >
                                            <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
                                            {/* <button onClick={() => handleUpload(base64Content)} disabled={!base64Content}>
                                                    Upload File
                                                </button> */}
                                        </Box>


                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' , marginTop:'0.6rem' }} >
                                            <DownloadIcon sx={{ color: '#066bd6' }} />
                                            <Button size='small' sx={{ fontFamily: 'montserrat', fontSize: { lg: "0.9rem", md: "0.7rem", xs: "0.7rem" } }} onClick={handleDownload} >download sample</Button>
                                        </Box>
                                    </Box>

                                </Box>

                            </Box>

                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                               
                            >
                                {/* <DialogTitle sx={{fontFamily:'montserrat' , fontSize:"1rem"}} id="alert-dialog-title">
                    {"Eezib brand vouchers"}
                    </DialogTitle> */}
                                <DialogContent sx={{ padding: "2rem 2.5rem" }} >
                            
                                        {
                                            data?.map((e) => {
                                                return(
                                                    <Box>
                                                    <Typography sx={{fontFamily:'montserrat' , fontWeight:500 , fontSize:"1.2rem"}} >Order Summary</Typography>
                                                    <br/>

                                                    <Box>
                                                    <Typography sx={{ fontFamily:'montserrat' , fontWeight:500 , fontSize:"1.1rem" }} >denomination value : {denomination} </Typography>
                                                    <Typography sx={{ fontFamily:'montserrat' , fontWeight:500 , fontSize:"1.1rem" , }} > quantity : {value ? totalQuantity : quantity} </Typography>
                                                    {
                                                        e.discount > 0 ?  <Typography sx={{ fontFamily:'montserrat' , fontWeight:500 , fontSize:"1.1rem" }} >discount : {e.discount}%</Typography> : null
                                                    }
                                                    <hr/>
                                                    <Typography sx={{ fontFamily:'montserrat' , fontWeight:500 , fontSize:"1.1rem" }} >total price : { !value ?  denomination * quantity : denomination * totalQuantity}</Typography>
                                                    {
                                                        e.discount > 0 ? <Typography sx={{ fontFamily:'montserrat' , fontWeight:500 , fontSize:"1.1rem" }} >eezib discount price : ₹ {totalAmount}</Typography> : null
                                                    }
                                                    
                                                    <hr/>
                                                    &nbsp;
                                                   
                                                    <Button size='small' fullWidth variant='contained' sx={{fontFamily:'montserrat' , fontWeight:500 , fontSize:'0.8rem'}} onClick={placeOrder} >Place Order</Button>
                                                </Box>
                                                 </Box>
                                                )
                                            })
                                        }

                                    
                                   

                                </DialogContent>
                                
                            </Dialog>
                            

                            <Dialog
                                open={newOpen}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                
                                <DialogContent>
                                 {
                                        process ? <CircularProgress /> :
                                            respo?.map((e) => {
                                                return (
                                                    <Box>
                                                        
                                                        <Typography sx={{ fontFamily: 'montserrat', fontWeight: 500 }} >{e.msg}</Typography>
                                                        &nbsp;
                                                        {
                                                            e.msg === "Successfully placed order." ? 
                                                            <Box>
                                                             <Box sx={{ display: 'flex', alignItems: 'center' }} >
                                                            <Typography sx={{ fontFamily: 'montserrat', fontWeight: 500 }} >Quantity :&nbsp;</Typography>
                                                            <Typography sx={{ fontFamily: 'montserrat', fontWeight: 500 }} >{ e.quantity}</Typography>

                                                        </Box>

                                                        <Box sx={{ display: 'flex', alignItems: 'center' }} >
                                                            <Typography sx={{ fontFamily: 'montserrat', fontWeight: 500 }} >Order ID :&nbsp;</Typography>
                                                            <Typography sx={{ fontFamily: 'montserrat', fontWeight: 500, color: '#3881ff' }} >{e.order_id}</Typography>
                                                        </Box>

                                                        <Box sx={{ display: 'flex', alignItems: 'center' }} >
                                                            <Typography sx={{ fontFamily: 'montserrat', fontWeight: 500 }} >Total Amount :&nbsp;</Typography>
                                                            <Typography sx={{ fontFamily: 'montserrat', fontWeight: 500 }} >{e.total_amount}</Typography>
                                                        </Box> 
                                                        <Typography sx={{color:'gray' , fontFamily:'montserrat' , fontWeight:400 , fontSize:"0.9rem" , marginTop:"1rem" , textAlign:'center'}} >Thanks for contacting eezib</Typography>
                                                            </Box> : <Typography sx={{ fontFamily:'montserrat', fontWeight:500 , textTransform:"capitalize" }} >{e.message}</Typography>
                                                        }
                                                        
                                                    </Box>

                                                )
                                            })

                                    } 
                                </DialogContent>
                                
                            </Dialog>

                             

                        </Box>
                    )
                })
            }
        </Box>
    )
}

export default Voucher