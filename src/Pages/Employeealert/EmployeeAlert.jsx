import { useContext, useEffect } from 'react';
import { Link, json, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import '../Addemployee/addemployee.css';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import axios from 'axios';
import Navbars from '../../Ccomponents/Header/Navbar/Navbars';
import Footer from '../../Ccomponents/Footer/Footer';
import './employeealert.css';
import DashNavbar from '../../Ccomponents/Header/DashboardNavbar/DashNavbar';
import { useParams} from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {faListCheck} from '@fortawesome/free-solid-svg-icons';
import {faStreetView} from '@fortawesome/free-solid-svg-icons';


const EmployeeAlert = () => {
    const navigate = useNavigate();
    const [allemployees, setallemployees] = useState([]);
    const [employeeBoolean, setemployeeBoolean] = useState(false);
    const [Delete , setdelete] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [hoverStates, setHoverStates] = useState({});
    const [hoverStatesView, setHoverStatesView] = useState({});
    const [hoverStatesDelete, setHoverStatesDelete] = useState({});
    const [hoverStatesManage, setHoverStatesManage] = useState({});
    const [alertMessage, setAlertMessage] = useState('');
const [Alertedit, setAlertedit] = useState(false);
let alertcount = 0;



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
         boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        marginTop: '15px',
        backgroundColor: '#f9f6ee',
        width: '350px', // Adjust the width as needed
        // background: 'url("https://www.osimo.com.tr/assets/images/media-bg.jpg") center/cover no-repeat',
      };

      //editemployee



      const [alldepartmentss, setalldepartmentss] = useState([]);
      const [departmentBoolean, setdepartmentBoolean] = useState(false);
      const [editboolean, seteditboolean] = useState(false);

      //edit employee

      const [responce  , setResponce] = useState("");
    const [UpdatedbyUser  , setUpdatedbyUser] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [singeemloyee  , setsingeemloyee] = useState("");
    const currDate = new Date().toLocaleDateString();
    const currTime = new Date().toLocaleTimeString();
let datetime = currDate + ' ' + currTime;
    const { id } = useParams();
    function getDate() {
      const today = new Date();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      const date = today.getDate();
      return `${month}/${date}/${year}`;
    }
    const [currentDate, setCurrentDate] = useState(getDate());

    const fetchSingleCustomer = async(id) => {
        const response = await axios.get(`http://localhost:8000/geteditemployee/${id}`);
        console.log("response: ", response);
      console.log(singeemloyee);
      setsingeemloyee(response.data.Product);
            }

    const handlecchange = (ev) => {
        const {value, name} = ev.target;
        setsingeemloyee(()=> {
            return {
                ...singeemloyee, [name]: value
            }
        })

 
    };

    const handleMouseEnter = (id) => {
      setHoverStates({ ...hoverStates, [id]: true }); // Set hover state for specific button
    };
  
    const handleMouseLeave = (id) => {
      setHoverStates({ ...hoverStates, [id]: false }); // Reset hover state for specific button
    };

    const handleMouseEnterView = (id) => {
      setHoverStatesView({ ...hoverStates, [id]: true }); // Set hover state for specific button
    };
  
    const handleMouseLeaveView = (id) => {
      setHoverStatesView({ ...hoverStatesView, [id]: false }); // Reset hover state for specific button
    };

    const handleMouseEnterDelete = (id) => {
      setHoverStatesDelete({ ...hoverStatesDelete, [id]: true }); // Set hover state for specific button
    };
  
    const handleMouseLeaveDelete = (id) => {
      setHoverStatesDelete({ ...hoverStatesDelete, [id]: false }); // Reset hover state for specific button
    };

    const handleMouseEnterManage = (id) => {
      setHoverStatesManage({ ...hoverStatesManage, [id]: true }); // Set hover state for specific button
    };
  
    const handleMouseLeaveManage = (id) => {
      setHoverStatesManage({ ...hoverStatesManage, [id]: false }); // Reset hover state for specific button
    };
    

    const handlesubmit = async (id) => {
      try {
        setsingeemloyee((prevEmployee) => {
          return {
            ...prevEmployee,
            UpdatedbyUser: UpdatedbyUser,
            Updatedtime: datetime,
          };
        });
          const UserData = { ...singeemloyee};
      const response = await axios.put(`http://localhost:8000/editemployee/${id}`, UserData);
      seteditboolean(true)
      
        } catch (error) {
          console.log("error in editing all employee", error);
          navigate("/allEmployee")
          seteditboolean(true)
          setOpenDialog(false);


        }

        setAlertedit(true);
    setTimeout(() => {
      setAlertedit(false);
      //window.location.reload(false);
    }, 3000);

  }

  // all department function
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

    

    
    
    // get employee that is about to leave
      const getAllemployee = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/employeealert`);
          console.log("response: ", response);
          console.log(allemployees);
          setallemployees(response.data.data);
        } catch (error) {
          console.log("error in getting all Departments", error);
        }
      };
      const deleteData = async (id)=>{
        try {
          const response = await axios.get(`http://localhost:8000/deleteemployee/${id}`)
          console.log("response: ", response.data);
          setemployeeBoolean(true);
        } catch (error) {
          console.log("error in deleting employee", error);
        }
        setOpenAlert(true);
    setTimeout(() => {
      setOpenAlert(false);
      //window.location.reload(false);
    }, 3000);
      };

    useEffect(() => {
        console.log('asdasd')
        getAllemployee()
        setemployeeBoolean(false)
        seteditboolean(false)
        // return () => {
        //   console.log('Cleanup Function');
        //  }
    }, [Delete , employeeBoolean , editboolean])

    useEffect(() => {
      console.log('asdasd')
      getAlldepartments()
      // return () => {
      //   console.log('Cleanup Function');
      //  }
  }, [Delete , departmentBoolean ])

//   useEffect (()=> {
//     fetchSingleCustomer()

// },[]);
    
useEffect(() => {

  const getProfile = async () => {
    try {
      let response = await axios.get(`http://localhost:8000/api/v1/profile`,
        {
          withCredentials: true,
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
          }
        });
        console.log("response: ", response.data);
        setResponce(response.data)
        setUpdatedbyUser(responce.email);
        console.log("res",responce.email);
                      console.log("xx",UpdatedbyUser);


    } catch (error) {
      console.log("axios error: ", error);


    }

  }
  getProfile();

}, [])

    return (
        <>
        <DashNavbar/>



        <div className='rootcontainer2' style={{ backgroundColor: 'white' }}>
                <h2 className="heado">Alerts</h2>
            </div>
            <div className='flex  justify-evenly flex-wrap my-4' >
            {allemployees.map((value) => (
                    <div style={containerStyle}>
        <div className="divss">
        <h1 className="headoo "> {value.emloyeename}</h1>
        <hr className='color-black'/>
</div>
        <span className="text-center inline mt-2 text-red-500 font-bold">This employee details are below par, check Employee Attrition through our model for more certain predictions.</span>


        <div className="flex mt-4 space-x-3 md:mt-6 justify-center">

        <button
      onClick={() => {
        navigate(`/Employeedetails/${value._id}`, { replace: true });
      }}
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
    </button>
       



    {/*   <button onClick={()=>{navigate(`/Manage/${value._id}`) }}  className="inline-flex bg-black text-green-500 items-center px-4 py-2 text-sm font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-green-700 hover:text-black focus:ring-4 focus:outline-none focus:ring-gray-200 "><FontAwesomeIcon icon={faListCheck}/></button> 
         */}
         </div>
        {/*onClick={()=>{navigate(`/Employeedetails/${value._id}`, { replace: true }) }} */}

      </div>
           ))}



           {/* Material-UI Snackbar for delete warning */}

      {/* Existing code */}

               </div>

               <div className='rootcontainer2' style={{ backgroundColor: 'white' }}>
            <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary" style={{ marginBottom: '20px' }}>
                        Your Dashboard
                    </Button>
                </Link>
            </div>

            <Footer/>
        </>
    );
}

export default EmployeeAlert