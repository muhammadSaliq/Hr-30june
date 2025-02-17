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
import './allemployee.css';
import DashNavbar from '../../Ccomponents/Header/DashboardNavbar/DashNavbar';
import { useParams} from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {faListCheck} from '@fortawesome/free-solid-svg-icons';
import {faStreetView} from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


const AllEmployee = () => {
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
const [results, setResults] = useState([]);
const [resultbool, setresultbool] = useState(false);
const [showbool, setshowbool] = useState(false);
const [dialogOpen, setDialogOpen] = useState(false);

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

      const [ageerror, setageerror] = useState();
      const [nameError, setnameError] = useState();
      const [businessTravelerror, setBusinessTravelerror] = useState();
      const [dailyRateerror, setDailyRateerror] = useState();
      const [departmenterror, setDepartmenterror] = useState();
      const [distanceFromHomeerror, setDistanceFromHomeerror] = useState();
      const [educationerror, seteducationerror] = useState();
      const [educationFielderror, seteducationFielderror] = useState();
      const [employeeNumbererror, setEmployeeNumbererror] = useState();
      const [environmentSatisfactionerror, setenvironmentSatisfactionerror] = useState();
      const [hourlyRateerror, setHourlyRateerror] = useState();
      const [jobInvolvementerror, setJobInvolvementerror] = useState();
      const [jobLevelerror, setJobLevelerror] = useState();
      const [jobRoleerror, setJobRoleerror] = useState();
      const [jobSatisfactionerror, setJobSatisfactionerror] = useState();
      const [monthlyIncomeerror, setMonthlyIncomeerror] = useState();
      const [monthlyRateerror, setMonthlyRateerror] = useState();
      const [numCompaniesWorkederror, setNumCompaniesWorkederror] = useState();
      const [percentSalaryHikeerror, setPercentSalaryHikeerror] = useState();
      const [performanceRatingerror, setPerformanceRatingerror] = useState();
      const [relationshipSatisfactionerror, setRelationshipSatisfactionerror] = useState();
      const [standardHourserror, setStandardHourserror] = useState();
      const [stockOptionLevelerror, setStockOptionLevelerror] = useState();
      const [totalWorkingYearserror, setTotalWorkingYearserror] = useState();
      const [trainingTimesLastYearerror, setTrainingTimesLastYearerror] = useState();
      const [workLifeBalanceerror, setWorkLifeBalanceerror] = useState();
      const [yearsAtCompanyerror, setYearsAtCompanyerror] = useState();
      const [yearsInCurrentRoleerror, setYearsInCurrentRoleerror] = useState();
      const [yearsSinceLastPromotionerror, setYearsSinceLastPromotionerror] = useState();
      const [yearsWithCurrManagererror, setYearsWithCurrManagererror] = useState();
      
      const [gendererror, setgendererror] = useState("");
      const [over18error, setover18error] = useState("");
      const [overTimeerror, setOverTimeerror] = useState("");
      const [maritalStatuserror, setMaritalStatuserror] = useState("");

      const [alldepartmentss, setalldepartmentss] = useState([]);
      const [departmentBoolean, setdepartmentBoolean] = useState(false);
      const [editboolean, seteditboolean] = useState(false);

      //Search filter
      const [searchInput, setSearchInput] = useState('');
      const [selectedOption, setSelectedOption] = useState('');
      const [selectedOptionposition, setSelectedOptionposition] = useState('');
      const [selectedOptiongender, setSelectedOptiongender] = useState('');
      const [ageValue, setageValue] = useState('');
      const [empIdValue, setempIDValue] = useState('');

      


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

    // single employee data
    const fetchSingleCustomer = async(id) => {
        const response = await axios.get(`https://hr-forcast-backend-main.vercel.app/geteditemployee/${id}`);
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

    //searchfilter
    // Event handler for input change
      const handleInputChange = (event) => {
        setSearchInput(event.target.value);
      };

      // Event handler for select change
      const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
      };

      const handleSelectpositionChange = (event) => {
        setSelectedOptionposition(event.target.value);
      };
      const handleSelectgenderChange = (event) => {
        setSelectedOptiongender(event.target.value);
      };

      const handleAgeChange = (event) => {
        setageValue(event.target.value);
      };

      const handleempIdChange = (event) => {
        setempIDValue(event.target.value)
      }

      const handleClearFilters = () => {

        setempIDValue('');
        setageValue('');
        setSelectedOption('');
        setSelectedOptiongender('');
        setSelectedOptionposition('');
    

      };



    // hover funccctions for display
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
    
//edit employee api integration
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
      const response = await axios.put(`https://hr-forcast-backend-main.vercel.app/editemployee/${id}`, UserData);
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

  // get all dep to edit employee deppartment
  const getAlldepartments = async () => {

    try {
      const response = await axios.get(`https://hr-forcast-backend-main.vercel.app/alldepartments`);
      console.log("response: ", response);
      console.log(alldepartmentss);
      setalldepartmentss(response.data.data);
    } catch (error) {
      console.log("error in getting all Departments", error);
    }
  };

  const imageStyle = {
    width: '50px',
    height: '50px',
    marginLeft: '210px',
    backgroundColor: '#f2f2f2',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '10px',
    borderRadius: '5px',
  };
    const handleImageClick = () => {
      setDialogOpen(true);
  };

  const handleCloseDialog = () => {
      setDialogOpen(false);
  };

    

    
    
    //all employee 
      const getAllemployee = async () => {
        try {
          const response = await axios.get(`https://hr-forcast-backend-main.vercel.app/allemployees`);
          console.log("response: ", response);
          console.log(allemployees);
          setallemployees(response.data.data);
        } catch (error) {
          console.log("error in getting all Departments", error);
        }
      };
      const deleteData = async (id)=>{
        try {
          const response = await axios.get(`https://hr-forcast-backend-main.vercel.app/deleteemployee/${id}`)
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

//display all employee on page load
    useEffect(() => {
        console.log('asdasd')
        getAllemployee()
        setemployeeBoolean(false)
        seteditboolean(false)

    }, [Delete , employeeBoolean , editboolean])
// get all department on load
    useEffect(() => {
      console.log('asdasd')
      getAlldepartments()

  }, [Delete , departmentBoolean ])

// get user profile on load


    
useEffect(() => {

  const getProfile = async () => {
    try {
      let response = await axios.get(`https://hr-forcast-backend-main.vercel.app/api/v1/profile`,
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

const performSearch = async () => {
  if (selectedOption === "Any Department") {
    setSelectedOption("")

    setDialogOpen(false)
  }



  try {
    const response = await axios.get(
      `https://hr-forcast-backend-main.vercel.app/api/searchlist?EmployeeNumber=${empIdValue}&Age=${ageValue}&JobRole=${selectedOptionposition}&Gender=${selectedOptiongender}&Department=${selectedOption}`
    );
    console.log("Search results: ", response.data);
    setResults(response.data);
    console.log("res", results);
    setresultbool(true);
    setshowbool(true);
  } catch (error) {
    console.log("Error in performing search: ", error);
  }
};



    return (
        <>
        <DashNavbar/>

       



        <div  >
      {/* Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} >
        <DialogTitle>Edit Employee</DialogTitle>
        <DialogContent>
          {/* Fields */}
          <TextField
            fullWidth
            value={singeemloyee.emloyeename || ''}
            onChange={handlecchange}
            name="emloyeename"
            placeholder="Employee Name"
            variant="outlined"
            sx={{ marginBottom: '1rem' }}
          />
          {nameError && <p className="error-message">{nameError}</p>} 
          <TextField fullWidth value={singeemloyee.Age} onChange={handlecchange} type = "number" name="Age" placeholder="Age" variant="outlined" sx={{ marginBottom: '1rem'}}/>
                {ageerror && <p className="error-message">{ageerror}</p>}
                <select id="businessTravel" onChange={handlecchange} name='BusinessTravel' className=" border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 0   " sx={{ marginBottom: '1rem' }}>
        <option sx={{ marginBottom: '1rem' }}>Select an option</option>
        <option value="Travel_Frequently" >Travel_Frequently</option>
        <option value="Travel_Rarely">Travel_Rarely</option>
</select>
                {businessTravelerror && <p className="error-message">{businessTravelerror}</p>} 
                <TextField fullWidth value={singeemloyee.DailyRate} onChange={handlecchange} type = "number" name="DailyRate" placeholder="Daily Rate ($)" variant="outlined" sx={{ marginBottom: '1rem' , marginTop: '1rem' }} />
                {dailyRateerror && <p className="error-message">{dailyRateerror}</p>} 

                <select id="department" name='Department' onChange={handlecchange} className=" border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 0   " sx={{ marginBottom: '1rem' }}>
                <option>Enter Department</option>

                {alldepartmentss.map((value) => (
                            <option value={value.departmentname} >{value.departmentname}</option>

                ))}
                </select>
                {/*<TextField fullWidth value={department} onChange={handleInputChange} name="department" placeholder="Department" variant="outlined" />
                */}
                                {departmenterror && <p className="error-message">{departmenterror}</p>} 
                <TextField fullWidth value={singeemloyee.DistanceFromHome}onChange={handlecchange} type = "number" name="DistanceFromHome" placeholder="Distance From Home (KM)" variant="outlined" sx={{ marginBottom: '1rem' , marginTop: '1rem' }} />
                {distanceFromHomeerror && <p className="error-message">{distanceFromHomeerror}</p>} 
                <TextField fullWidth value={singeemloyee.Education} onChange={handlecchange} type = "number" name="Education" placeholder="Education" variant="outlined" sx={{ marginBottom: '1rem' }} />
                {educationerror && <p className="error-message">{educationerror}</p>} 
                <TextField fullWidth value={singeemloyee.EducationField} onChange={handlecchange} name="EducationField" placeholder="Education Field" variant="outlined" sx={{ marginBottom: '1rem' }}/>
                {educationFielderror && <p className="error-message">{educationFielderror}</p>}
                <TextField fullWidth value={singeemloyee.EmployeeNumber}  onChange={handlecchange} type = "number" name="EmployeeNumber" placeholder="Employee Number" variant="outlined" sx={{ marginBottom: '1rem' }}/>
                {employeeNumbererror && <p className="error-message">{employeeNumbererror}</p>}
                <TextField fullWidth value={singeemloyee.EnvironmentSatisfaction} onChange={handlecchange} type = "number" name="EnvironmentSatisfaction" placeholder="Environment Satisfaction" variant="outlined" sx={{ marginBottom: '1rem' }}/>
                {environmentSatisfactionerror && <p className="error-message">{environmentSatisfactionerror}</p>}
                <select id="gender" onChange={handlecchange} name='Gender' className=" border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 0   "sx={{ marginBottom: '1rem' }}>
        <option>Select Gender</option>
        <option value="Male" >Male</option>
        <option value="Female">Female</option>
</select>
{gendererror && <p className="error-message">{gendererror}</p>}

                <TextField fullWidth value={singeemloyee.HourlyRate} onChange={handlecchange} type = "number" name="HourlyRate" placeholder="Hourly Rate ($)" variant="outlined" sx={{ marginBottom: '1rem' , marginTop: '1rem'}}/>
                {hourlyRateerror && <p className="error-message">{hourlyRateerror}</p>}
                <TextField fullWidth value={singeemloyee.JobInvolvement} onChange={handlecchange} type = "number" name="JobInvolvement" placeholder="Job Involvement" variant="outlined" sx={{ marginBottom: '1rem' }}/>
                {jobInvolvementerror && <p className="error-message">{jobInvolvementerror}</p>}
                <TextField fullWidth value={singeemloyee.JobLevel} onChange={handlecchange} type = "number" name="JobLevel" placeholder="Job Level" variant="outlined" sx={{ marginBottom: '1rem' }}/>
                {jobLevelerror && <p className="error-message">{jobLevelerror}</p>}
                <TextField fullWidth value={singeemloyee.JobRole} onChange={handlecchange} name="JobRole" placeholder="Job Role" variant="outlined" sx={{ marginBottom: '1rem' }}/>
                {jobRoleerror && <p className="error-message">{jobRoleerror}</p>}
                <TextField fullWidth value={singeemloyee.JobSatisfaction} onChange={handlecchange} type = "number" name="JobSatisfaction" placeholder="Job Satisfaction" variant="outlined" sx={{ marginBottom: '1rem' }}/>
                {jobSatisfactionerror && <p className="error-message">{jobSatisfactionerror}</p>}
                <select id="maritalStatus" name='MaritalStatus'onChange={handlecchange} className=" border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 0   "sx={{ marginBottom: '1rem' }}>
        <option>Enter Marital Status</option>
        <option value="Single" >Single</option>
        <option value="Married">Married</option>
        <option value="Divorced">Divorced</option>
</select>
{maritalStatuserror && <p className="error-message">{maritalStatuserror}</p>}

                <TextField fullWidth value={singeemloyee.MonthlyIncome} onChange={handlecchange} type = "number" name="MonthlyIncome" placeholder="Monthly Income" variant="outlined" sx={{ marginBottom: '1rem' , marginTop: '1rem' }} />
                {monthlyIncomeerror && <p className="error-message">{monthlyIncomeerror}</p>}
                <TextField fullWidth value={singeemloyee.MonthlyRate} onChange={handlecchange} type = "number" name="MonthlyRate" placeholder="Monthly Rate" variant="outlined" sx={{ marginBottom: '1rem' }}/>
                {monthlyRateerror && <p className="error-message">{monthlyRateerror}</p>}
                <TextField fullWidth value={singeemloyee.NumCompaniesWorked} onChange={handlecchange} type = "number" name="NumCompaniesWorked" placeholder="Num Companies Worked" variant="outlined" sx={{ marginBottom: '1rem' }}/>
                {numCompaniesWorkederror && <p className="error-message">{numCompaniesWorkederror}</p>}
                <select id="over18" name='Over18' onChange={handlecchange} className=" border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 0   "sx={{ marginBottom: '1rem' }}>
        <option>Over 18</option>
        <option value="Yes" >Yes</option>
        <option value="No">No</option>
</select>
{over18error && <p className="error-message">{over18error}</p>}

<select
  id="overTime"
  name="OverTime"
  onChange={handlecchange}
  className="border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
  style={{ marginBottom: '1rem' , marginTop: '1rem' }} // Applying margin bottom using inline style
>
  <option>Over Time</option>
  <option value="Yes">Yes</option>
  <option value="No">No</option>
</select>
                {overTimeerror && <p className="error-message">{overTimeerror}</p>}

                <TextField fullWidth value={singeemloyee.PercentSalaryHike} onChange={handlecchange} type = "number" name="PercentSalaryHike" placeholder="Percent Salary Hike" variant="outlined" sx={{ marginBottom: '1rem' , marginTop: '1rem' }} />
                {percentSalaryHikeerror && <p className="error-message">{percentSalaryHikeerror}</p>}
                <TextField fullWidth value={singeemloyee.PerformanceRating} onChange={handlecchange} type = "number" name="PerformanceRating" placeholder="Performance Rating" variant="outlined" sx={{ marginBottom: '1rem' }}/>
                {performanceRatingerror && <p className="error-message">{performanceRatingerror}</p>}
                <TextField fullWidth value={singeemloyee.RelationshipSatisfaction} onChange={handlecchange} type = "number" name="RelationshipSatisfaction" placeholder="Relationship Satisfaction" variant="outlined" sx={{ marginBottom: '1rem' }}/>
                {relationshipSatisfactionerror && <p className="error-message">{relationshipSatisfactionerror}</p>}
                <TextField fullWidth value={singeemloyee.StandardHours} onChange={handlecchange} type = "number" name="StandardHours" placeholder="Standard Hours" variant="outlined" sx={{ marginBottom: '1rem' }}/>
                {standardHourserror && <p className="error-message">{standardHourserror}</p>}
                <TextField fullWidth value={singeemloyee.StockOptionLevel} onChange={handlecchange} type = "number" name="StockOptionLevel" placeholder="Stock Option Level" variant="outlined" sx={{ marginBottom: '1rem' }}/>
                
                {stockOptionLevelerror && <p className="error-message">{stockOptionLevelerror}</p>}
                <TextField fullWidth value={singeemloyee.TotalWorkingYears} onChange={handlecchange} type = "number" name="TotalWorkingYears" placeholder="Total Working Years" variant="outlined" sx={{ marginBottom: '1rem' }}/>
                {totalWorkingYearserror && <p className="error-message">{totalWorkingYearserror}</p>}
                <TextField fullWidth value={singeemloyee.TrainingTimesLastYear} onChange={handlecchange} type = "number" name="TrainingTimesLastYear" placeholder="Training Times Last Year" variant="outlined" sx={{ marginBottom: '1rem' }}/>
                {trainingTimesLastYearerror && <p className="error-message">{trainingTimesLastYearerror}</p>}
                <TextField fullWidth value={singeemloyee.WorkLifeBalance} onChange={handlecchange} type = "number" name="WorkLifeBalance" placeholder="Work Life Balance" variant="outlined" sx={{ marginBottom: '1rem' }}/>
                {workLifeBalanceerror && <p className="error-message">{workLifeBalanceerror}</p>}
                <TextField fullWidth value={singeemloyee.YearsAtCompany} onChange={handlecchange} type = "number" name="YearsAtCompany" placeholder="Years at Company" variant="outlined" sx={{ marginBottom: '1rem' }}/>
                {yearsAtCompanyerror && <p className="error-message">{yearsAtCompanyerror}</p>}
                <TextField fullWidth value={singeemloyee.YearsInCurrentRole} onChange={handlecchange} type = "number" name="YearsInCurrentRole" placeholder="Years in Current Role" variant="outlined" sx={{ marginBottom: '1rem' }}/>
                {yearsInCurrentRoleerror && <p className="error-message">{yearsInCurrentRoleerror}</p>}
                <TextField fullWidth value={singeemloyee.YearsSinceLastPromotion} onChange={handlecchange} type = "number" name="YearsSinceLastPromotion" placeholder="Years Since Last Promotion" variant="outlined" sx={{ marginBottom: '1rem' }}/>
                {yearsSinceLastPromotionerror && <p className="error-message">{yearsSinceLastPromotionerror}</p>}
                <TextField fullWidth value={singeemloyee.YearsWithCurrManager} onChange={handlecchange} type = "number" name="YearsWithCurrManager
                " placeholder="Years with Current Manager" variant="outlined" sx={{ marginBottom: '1rem' }}/>
                {yearsWithCurrManagererror && <p className="error-message">{yearsWithCurrManagererror}</p>}
 {/*}               <p>updated by user</p>
                <TextField fullWidth value={responce.email} onMouseEnter={handlecchange}  name="UpdatedbyUser" placeholder="Years with Current Manager" variant="outlined" sx={{ marginBottom: '1rem' }}/>
                <p>updated time</p>
                <TextField fullWidth value={datetime} onMouseEnter={handlecchange}  name="updatedtime" placeholder="Years with Current Manager" variant="outlined" sx={{ marginBottom: '1rem' }}/>
              */}
          {/* Other fields similarly */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onTouchStart={() => { setsingeemloyee((prevEmployee) => {
    return {
      ...prevEmployee,
      UpdatedbyUser: responce.email,
      updatedtime: datetime,
    };
  });}} onMouseEnter={() => { setsingeemloyee((prevEmployee) => {
    return {
      ...prevEmployee,
      UpdatedbyUser: responce.email,
      updatedtime: datetime,
    };
  });}} onClick={()=> {handlesubmit(singeemloyee._id)}}>Save</Button>
        </DialogActions>
      </Dialog>
      </div>

        <div className='rootcontainer2' style={{ backgroundColor: 'white' }}>
                <h2 className="heado">Employees</h2>
            </div>
            {/* <div onClick={handleImageClick}>
                <img src={filterimaage} alt="Filter" style={imageStyle} />
            </div> */}
            <div onClick={handleImageClick} style={{ display: 'flex', justifyContent: 'center', paddingRight: 'sm' }}>
    <Button 
        variant="contained" 
        style={{
          width: 'auto',
          height: '50px',
          borderRadius: '20%', // Makes the button fully rounded
          backgroundColor: '#f0f0f0', // Light grey background color
          color: '#000', // Black text color
          marginBottom: '2%'
      }}
      
      
        onClick={handleImageClick}
    >
        Apply Filter
    </Button>
</div>

<Dialog open={dialogOpen} onClose={handleCloseDialog}style={{ borderRadius: '20%' }}>
            <DialogContent style={{ borderRadius: '20%' }}>
    <h6 style={{ fontWeight: 'bold', marginBottom: '30px' }}>Apply Filters</h6>

    <div className="relative z-0 w-full mb-6 group">
    <div className="relative z-0 w-full mb-6 group">
    <input
        type="text"
        id="emp-id"
        name="emp-id"
        placeholder="Employee ID"
        value={empIdValue}
        onChange={handleempIdChange}
        style={{ 
            width: '250px', 
            height: '30px', 
            margin: '0 auto',
            border: '1px solid #333', // Dark grey border
            borderRadius: '5px', // Rounded corners
            fontSize: '14px', // Adjust font size
      paddingLeft: '5px', // Add padding for the text
        }}
    />
</div>

<div className="relative z-0 w-full mb-6 group">
    <input
        type="text"
        id="age"
        name="age"
        placeholder="Age"
        value={ageValue}
        onChange={handleAgeChange}
        style={{ 
            width: '250px', 
            height: '30px', 
            margin: '0 auto',
            border: '1px solid #333', // Dark grey border
            borderRadius: '5px', // Rounded corners
            fontSize: '14px', // Adjust font size
      paddingLeft: '5px', // Add padding for the text
        }}
    />
</div>



</div>
    <div className="relative z-0 w-full mb-6 group">
        <select
            id="department"
            name="department"
            className="bg-gray-200 text-black text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 0"
            style={{ maxWidth: '300px', margin: '0 auto' }}
            value={selectedOption}
            onChange={handleSelectChange}
        >
            <option>Department</option>
            {alldepartmentss.map((value) => (
                <option value={value.departmentname}>{value.departmentname}</option>
            ))}
        </select>
    </div>
    <div className="relative z-0 w-full mb-6 group">
    <select id="position"
            name="position"
            className="bg-gray-200 text-black text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 0"
            style={{ maxWidth: '300px', margin: '0 auto' }}
            value={selectedOptionposition}
            onChange={handleSelectpositionChange}>
        <option>Enter Job Role</option>
        <option value="Sales Executive" >Sales Executive</option>
        <option value="Research Scientist">Research Scientist</option>
        <option value="Laboratory Technician">Laboratory Technician</option>
        <option value="Manufacturing Director" >Manufacturing Director</option>
        <option value="Healthcare Representative">Healthcare Representative</option>
        <option value="Manager">Manager</option>
        <option value="Sales Representative">Sales Representative</option>
        <option value="Research Director">Research Director</option>
        <option value="Human Resources">Human Resources</option>


</select>

    </div>
    <div className="relative z-0 w-full mb-6 group">
        <select
            id="gender"
            name="gender"
            className="bg-gray-200 text-black text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 0"
            style={{ maxWidth: '300px', margin: '0 auto' }}
            value={selectedOptiongender}
            onChange={handleSelectgenderChange}
        >
            <option>Gender</option>
            <option>Male</option>
            <option>Female</option>
        </select>
    </div>
  


</DialogContent>

                <button
          className="btnstylo ml-5 w-32 h-10 mb-2 text-sm bg-orange-500 text-white border border-black rounded-lg transition-colors duration-300 hover:bg-orange-600 focus:outline-none flex justify-center items-center"
          style={{ margin: '0 auto', marginBottom: '5%' }}
          onClick={performSearch}
          
        >
          <FontAwesomeIcon icon={faSearch} className="mr-2" size="sm" />
          Search
        </button>
        <button
          className="btnstylo ml-5 w-32 h-10 mb-2 text-sm bg-orange-500 text-white border border-black rounded-lg transition-colors duration-300 hover:bg-orange-600 focus:outline-none flex justify-center items-center"
          style={{ margin: '0 auto', marginBottom: '5%' }}
          onClick={handleClearFilters} // Call the clear filters function on button click
        >
          {/* <FontAwesomeIcon icon={faSearch} className="mr-2" size="sm" /> */}
          Clear
        </button>
            </Dialog>

            
 <div className='pr-12 pl-12 md:pl-40 md:pr-40'>
 {results !== 0 ? (
          <ul className={`PrdouctSerchUl ${showbool ? "block" : "hidden"}`}>
          {results.map((item) => (
            <li
              key={item._id}

              className="itemHoverEffect cursor-pointer flex items-center p-2 hover:bg-gray-100"
            >
              <Link to={`/Employeedetails/${item._id}`}>

              <div className=''>
                <span className="text-md font-bold">Name: {item.emloyeename}</span>
                <span className="text-gray-600 ml-4">Age: {item.Age}</span>
                <span className="text-orange-600 ml-4">Department: {item.Department}</span>
              </div>
              </Link>
            </li>
          ))}
        </ul>        ) : (
          <>Employee with this name does not exsist</>

        )}
        </div>
            <div className='flex  justify-evenly flex-wrap my-4' >
            {allemployees.map((value) => (
                    <div style={containerStyle}>
        <div className="divss">
        <h1 className="headoo ">{value.emloyeename}</h1>
        <h3 className="text-center mt-2 mb-2 h3head">{value.JobRole}</h3>
        <hr className='color-black'/>
</div>
        <span className="text-center inline mt-2">Department: {value.Department}</span>
        <span className="text-center inline mt-2">Age: {value.Age}</span>
        <span className="text-center inline mt-2">Gender: {value.Gender}</span>
        <span className="text-center inline mt-2">Working Hours: {value.StandardHours}</span> 
        <span className="text-center inline mt-2">Years in the Company: {value.YearsAtCompany}</span>

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
       
        {/* <button onClick={()=>{navigate(`/editemployee/${value._id}`, { replace: true }) }} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">Edit</button>  */}
        {/* <Button variant="contained" onClick={() => {setOpenDialog(true); fetchSingleCustomer(value._id)}} >
        <FontAwesomeIcon icon={faPen}/> 
      Edit
      </Button> */}

<button
      onClick={() => {
        setOpenDialog(true);
        fetchSingleCustomer(value._id);
      }}
      className="relative inline-flex bg-black text-violet-500 items-center px-4 py-2 text-sm font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-violet-700 hover:text-black focus:ring-4 focus:outline-none focus:ring-gray-200"
      onMouseEnter={() => handleMouseEnter(value._id)}
      onMouseLeave={() => handleMouseLeave(value._id)}
    >
      <FontAwesomeIcon icon={faPen} />
      {hoverStates[value._id] && (
        <span className="absolute top-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white py-1 px-2 rounded-md text-xs">
          Edit
        </span>
      )}
    </button>
      

    <button
      onClick={() => {
        deleteData(value._id);
      }}
      className="relative inline-flex bg-black text-red-500 items-center px-4 py-2 text-sm font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-red-700 hover:text-black focus:ring-4 focus:outline-none focus:ring-gray-200"
      onMouseEnter={() => handleMouseEnterDelete(value._id)}
      onMouseLeave={() => handleMouseLeaveDelete(value._id)}
    >
      <FontAwesomeIcon icon={faTrashAlt} />
      {hoverStatesDelete[value._id] && (
        <span className="absolute top-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white py-1 px-2 rounded-md text-xs">
          Delete
        </span>
      )}
    </button>
     {/* <Link to="/Manage" style={{ textDecoration: 'none' }}>  <button  className="inline-flex bg-black text-red-500 items-center px-4 py-2 text-sm font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-red-700 hover:text-black focus:ring-4 focus:outline-none focus:ring-gray-200 ">Manage</button></Link> */}
     
     <button
      onClick={() => {
        navigate(`/Manage/${value._id}`, { replace: true });
      }}
      className="relative inline-flex bg-black text-green-500 items-center px-4 py-2 text-sm font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-green-700 hover:text-black focus:ring-4 focus:outline-none focus:ring-gray-200"
      onMouseEnter={() => handleMouseEnterManage(value._id)}
      onMouseLeave={() => handleMouseLeaveManage(value._id)}
    >
      <FontAwesomeIcon icon={faListCheck} />
      {hoverStatesManage[value._id] && (
        <span className="absolute top-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white py-1 px-2 rounded-md text-xs">
          Manage
        </span>
      )}
    </button>

    {/*   <button onClick={()=>{navigate(`/Manage/${value._id}`) }}  className="inline-flex bg-black text-green-500 items-center px-4 py-2 text-sm font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-green-700 hover:text-black focus:ring-4 focus:outline-none focus:ring-gray-200 "><FontAwesomeIcon icon={faListCheck}/></button> 
         */}
         </div>
        {/*onClick={()=>{navigate(`/Employeedetails/${value._id}`, { replace: true }) }} */}

      </div>
           ))}


      <Snackbar
        open={Alertedit}
        autoHideDuration={3000}
        onClose={() => setAlertedit(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setAlertedit(false)}
          severity="success" // You might want to adjust the severity based on your design
        >
         Employee Updated!
        </MuiAlert>
      </Snackbar>

           {/* Material-UI Snackbar for delete warning */}

      
      <Snackbar
        open={openAlert}
        autoHideDuration={3000} // Adjust the time duration for the alert
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setOpenAlert(false)}
          severity="warning"
        >
          Employee deleted!
        </MuiAlert>
      </Snackbar>

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

export default AllEmployee