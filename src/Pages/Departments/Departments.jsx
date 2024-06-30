import { useContext, useEffect } from 'react';
import { Link, json, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import LinearProgress from '@mui/material/CircularProgress';
import React, { useState } from 'react';
import axios from 'axios';
import Navbars from '../../Ccomponents/Header/Navbar/Navbars';
import Footer from '../../Ccomponents/Footer/Footer';
import './department.css';
import DashNavbar from '../../Ccomponents/Header/DashboardNavbar/DashNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faChartLine}  from '@fortawesome/free-solid-svg-icons';
import {faPersonArrowDownToLine} from '@fortawesome/free-solid-svg-icons';
import {faStreetView} from '@fortawesome/free-solid-svg-icons';

const Department = () => {
    const navigate = useNavigate();
    const [departmentname, setdepartmentname] = useState("");
    const [alldepartmentss, setalldepartmentss] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [departmentBoolean, setdepartmentBoolean] = useState(false);
    const [Delete , setdelete] = useState(false);
    const [contact, setEmail] = React.useState('');
    const [departmentmanager, setdeptman] = React.useState('');
    const [description, setdeptdes] = React.useState('');
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [SingleDepartment, setSingleDepartment] = useState([]);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [active, setactive] = useState(false);
    const [inactive, setinactive] = useState(false);
    const [editbool, seteditbool] = useState(false);
    const [adddepbool, setadddepbool] = useState(false);
    const [hoverStates, setHoverStates] = useState({});
    const [hoverStatesView, setHoverStatesView] = useState({});
    const [hoverStatesActive, setHoverStatesActive] = useState({});
    const [hoverStatesInActive, setHoverStatesInActive] = useState({});
    const [olddepartmentname, setolddepartmentname] = useState("");


// single department function
    const fetchSingleDepartment = async(id) => {
        const response = await axios.get(`http://localhost:8000/geteditdepaprtment/${id}`);
        console.log("response: ", response);
      console.log(SingleDepartment);
      setSingleDepartment(response.data.Product);
            }

            //hanle department change function
    const handlecchange = (ev) => {
        const {value, name} = ev.target;
        setSingleDepartment(()=> {
            return {
                ...SingleDepartment, [name]: value
            }
        })

 
    };

  

    const handleOpenAlert = (message) => {
      setAlertMessage(message);
      setOpenAlert(true);
    };

    const buttonStyle = {
        background: '#EC0C36',
        color: 'white',
        fontWeight: 'bold',
        padding: '8px 16px',
        borderRadius: '8px',
        marginTop: '12px',
        cursor: 'pointer',
      };
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        justifyContent: 'start',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        marginTop: '15px',
        width: '500px', 
        // background: 'url("https://www.osimo.com.tr/assets/images/media-bg.jpg") center/cover no-repeat',
      };

      const handleMouseEnterActive = (id) => {
        setHoverStatesActive({ ...hoverStatesActive, [id]: true }); // Set hover state for specific button
      };
    
      const handleMouseLeaveActive = (id) => {
        setHoverStatesActive({ ...hoverStatesActive, [id]: false }); // Reset hover state for specific button
      };

      const handleMouseEnterView = (id) => {
        setHoverStatesView({ ...hoverStates, [id]: true }); // Set hover state for specific button
      };
    
      const handleMouseLeaveView = (id) => {
        setHoverStatesView({ ...hoverStatesView, [id]: false }); // Reset hover state for specific button
      };

      const handleMouseEnter = (id) => {
        setHoverStates({ ...hoverStates, [id]: true }); // Set hover state for specific button
      };
    
      const handleMouseLeave = (id) => {
        setHoverStates({ ...hoverStates, [id]: false }); // Reset hover state for specific button
      };
      const handleMouseEnterInActive = (id) => {
        setHoverStatesInActive({ ...hoverStatesInActive, [id]: true }); // Set hover state for specific button
      };
    
      const handleMouseLeaveInActive = (id) => {
        setHoverStatesInActive({ ...hoverStatesInActive, [id]: false }); // Reset hover state for specific button
      };
    

    
      const handleDialogOpen = () => {
        setOpenDialog(true);
      };
    
      const handleDialogClose = () => {
        setOpenDialog(false);
      };

      //disapprove department function
      const deleteData = async (id, name)=>{
        try {
          const response = await axios.get(`http://localhost:8000/deletedepartment/${id}/${name}`)
          console.log("response: ", response.data);
        } catch (error) {
          console.log("error in deleting department", error);
        }
        handleOpenAlert('Department Inactivated');
        setinactive(true)
        setactive(false)
        //window.location.reload(false);
      };

      //approve department function
      const approveData = async (id, name)=>{
        try {
          const response = await axios.get(`http://localhost:8000/activedepartment/${id}/${name}`)
          console.log("response: ", response.data);
        } catch (error) {
          console.log("error in active department", error);
        }
        handleOpenAlert('Department Activated');
        setactive(true)
        setinactive(false)
       // window.location.reload(false);
      };
      const handleSubscribe = () => {
        
        console.log('Department Name:', departmentname);
        console.log('Email/Contact:', contact);
        console.log('Department Manager  :', departmentmanager);
        console.log('Department Description  :', description);
    
        handleDialogClose();
      };
    
    //all dep function
      const getAlldepartments = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/alldepartments`);
          console.log("response: ", response);
          console.log(alldepartmentss);
          setalldepartmentss(response.data.data);
        } catch (error) {
          console.log("error in getting all Departments", error);
        }
      };

      // add dep function
    const AddDepartment = async () => {
      if (departmentname && contact && departmentmanager) {

          try {
            setLoading(true);
            
            const response = await axios.post('http://localhost:8000/adddepartments', {
                departmentname,
                contact,
                departmentmanager,
                description
                
            });
    
          
            if (response.status === 201) {
              console.log('Signup successful');
              handleOpenAlert('Department successfully added!');
              setadddepbool(true)
              setOpenDialog(false);

                        } else {
              console.log('Department addition failed');
            }
          } catch (error) {
            console.error(error);
          }
          finally {
            setLoading(false); // Hide loader after operation completes
          }
        }
        else {alert("fill all fields")}
          
    
      };

     // Function to handle opening the dialog for editing
    const handleEditDialogOpen = () => {
      setOpenEditDialog(true);
  };
  // Function to handle closing the edit dialog
  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
};

//edit department funcction
 const handleEdit = async (id , name) => {
        const UserData = { ...SingleDepartment};
        const response = await axios.put(`http://localhost:8000/editdepartment/${id}/${name}/${olddepartmentname}`, UserData);
        seteditbool(true)
        handleOpenAlert('Department successfully Editted!');
        setOpenEditDialog(false);


    }
    

    useEffect(() => {
        console.log('asdasd')
        getAlldepartments()
        seteditbool(false)
        setinactive(false)
        setactive(false)
        setadddepbool(false)
        // return () => {
        //   console.log('Cleanup Function');
        //  }
    }, [active , inactive, editbool, adddepbool ])
    
    return (
        <>
        <DashNavbar/>

        <div className='rootcontainer2' style={{ backgroundColor: 'white'  }} >
                <h2 className="heado">Departments</h2>
                <Divider sx={{ margin: '10px 0', backgroundColor: 'black' }} />
            </div>
            <div className='flex  justify-evenly flex-wrap my-4' ></div>



        {/* <div className='rootcontainer'>
                <h2>Add Department</h2>
                <TextField fullWidth value={departmentname}  onChange={(event) => { setdepartmentname(event.target.value); }} name="departmentname" label="department Name" variant="outlined" />
        <Button fullWidth onClick={AddDepartment} variant="contained">Add Department</Button>
            </div> */}
            {/* Material-UI Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}  >
        <DialogTitle>Add Department</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Department Name'
              type='text'
              fullWidth
              value={departmentname}
              onChange={(event) => setdepartmentname(event.target.value)}
            />
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Email/Contact'
              type='text'
              fullWidth
              value={contact}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Department Manager'
              type='text'
              fullWidth
              value={departmentmanager}
              onChange={(event) => setdeptman(event.target.value)}
            />
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Department Description'
              type='text'
              fullWidth
              value={description}
              onChange={(event) => setdeptdes(event.target.value)}
            />
            
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color='primary'>
            Cancel
          </Button>
          <div style={{ position: 'relative' }}>
        <Button
          onClick={AddDepartment}
          color="primary"
          disabled={loading}
        >
          {loading && (
            <LinearProgress size={24} sx={{ position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px' }} />
          )}
          Add
        </Button>
      </div>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditDialog} onClose={handleEditDialogClose}  >
        <DialogTitle>Edit Department</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              autoFocus
              margin='dense'
              id='departmentname'
              placeholder='Department Name'
              name='departmentname'
              type='text'
              fullWidth
              value={SingleDepartment.departmentname} onChange={handlecchange} 
            />
            <TextField
              autoFocus
              margin='dense'
              id='contact'
              placeholder='Email/Contact'
              type='text'
                            name='contact'
              fullWidth
              value={SingleDepartment.contact} onChange={handlecchange} 
            />
            <TextField
              autoFocus
              margin='dense'
              id='departmentmanager'
              placeholder='Department Manager'
              type='text'
              name='departmentmanager'
              fullWidth
              value={SingleDepartment.departmentmanager} onChange={handlecchange} 
            />
            <TextField
              autoFocus
              margin='dense'
              id='description'
              placeholder='Department Description'
              type='text'
              name='description'
              fullWidth
              value={SingleDepartment.description} onChange={handlecchange} 
            />
            
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={() => {handleEdit(SingleDepartment._id, SingleDepartment.departmentname)}}
          // onClick={AddDepartment} 
          color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <div style={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center', 
  paddingTop: '20px'
}}>
  <Button
    variant='outlined'
    onClick={handleDialogOpen}
    sx={{
      color: 'rgb(236, 116, 12)',
      backgroundColor: 'Black', 
      fontWeight: 'bold',
      padding: '8px 16px',
      borderRadius: '8px',
      cursor: 'pointer',
      '&:hover': {
        color: 'Black',
        backgroundColor: 'rgb(236, 116, 12)',
      },
     
    }}
  >
    Add Department
  </Button>
</div>
            {/* <div className='rootcontainer2' style={{ backgroundColor: 'white' }} >
                <h2 className="heado">Departments</h2>
            </div> */}
            <div className='flex  justify-evenly flex-wrap my-4' >

               {alldepartmentss.map((value) => (

      <div style={containerStyle}>
        <h1 className="headoo">{value.departmentname}</h1>
        <p className="headoos">{value.departmentmanager}</p>
        <p className="headoos">{value.contact}</p>
        {value.executive == "0" && (<><p className="headoos text-red-500 font-bold">Status: Inactive</p></>)}

        <div className="flex mt-4 space-x-3 md:mt-6 justify-center">
        {value.executive == "0" ? (<>
        </>): (<>
          <div style={{ position: 'relative' }}>
             <button>   
              <a 
              onClick={()=>{navigate(`/departmentEmployee/${value.departmentname}`, { replace: true }) }}
              className="relative inline-flex items-center bg-black text-yellow-500 px-4 py-2 text-sm font-medium text-center text-white rounded-lg hover:bg-yellow-500 hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300"
              onMouseEnter={() => handleMouseEnterView(value._id)}
               onMouseLeave={() => handleMouseLeaveView(value._id)}
               >
                <FontAwesomeIcon icon={faStreetView} />
                      {hoverStatesView[value._id] && (
                        <span className="absolute top-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white py-1 px-2 rounded-md text-xs">
                          View
                        </span>
                      )}
               </a>
              </button>

              </div>

        </>)}
        {/* <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">Edit</a>  */}
{/* Edit Button */}
<div style={{ position: 'relative' }}>
                            <a
                                onClick={() => {
                                    // Open the edit dialog on clicking "Edit"
                                    handleEditDialogOpen(); fetchSingleDepartment(value._id)
                                }}
                                className="relative inline-flex bg-black text-violet-500 items-center px-4 py-2 text-sm font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-violet-700 hover:text-black focus:ring-4 focus:outline-none focus:ring-gray-200"
      onMouseEnter={() => {handleMouseEnter(value._id); setolddepartmentname(value.departmentname)}}
                                onMouseLeave={() => handleMouseLeave(value._id)}    
                                >
                                <FontAwesomeIcon icon={faPen} />
      {hoverStates[value._id] && (
        <span className="absolute top-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white py-1 px-2 rounded-md text-xs">
          Edit
        </span>
      )}
                            </a>
                            </div>

                            {/* <button
                                onClick={() => {
                                    // Open the edit dialog on clicking "Edit"
                                    handleEditDialogOpen(); fetchSingleDepartment(value._id)
                                }}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300" >
                                Edit
                            </button> */}
                            <div style={{ position: 'relative' }}>
  <button 
    onClick={() => approveData(value._id, value.departmentname)}
    className="inline-flex bg-black text-green-500 items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 "
    onMouseEnter={() => handleMouseEnterActive(value._id)}
    onMouseLeave={() => handleMouseLeaveActive(value._id)}
  >
    <FontAwesomeIcon icon={faChartLine} />
    {hoverStatesActive[value._id] && (
      <span className="absolute top-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white py-1 px-2 rounded-md text-xs">
        Activate Department
      </span>
    )}
  </button>
  </div>
  <div style={{ position: 'relative' }}>
       <button 
       onClick={()=>{deleteData(value._id, value.departmentname)}} 
       className="inline-flex bg-black text-red-500 items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 "
       onMouseEnter={() => handleMouseEnterInActive(value._id)}
       onMouseLeave={() => handleMouseLeaveInActive(value._id)}
       >
        <FontAwesomeIcon icon={faPersonArrowDownToLine} />
    {hoverStatesInActive[value._id] && (
      <span className="absolute top-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white py-1 px-2 rounded-md text-xs">
        InActivate Department
      </span>
    )}
        
        </button>
        </div>

        </div>

      </div>
               ))}
               </div>

               {/* Material-UI Snackbar for alerts */}
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => setOpenAlert(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setOpenAlert(false)}
          severity="success"
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          {alertMessage}
        </MuiAlert>
      </Snackbar>

      <div className='rootcontainer2' style={{ backgroundColor: 'white' }}>
            <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary" style={{ marginBottom: '20px' }}>
                        Your Dashboard
                    </Button>
                </Link>
            </div>
                
    </>
        
    );
}

export default Department;