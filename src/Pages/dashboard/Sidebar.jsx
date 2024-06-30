import axios from 'axios';
import React, { useEffect, useState } from 'react'
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
 from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'

function Sidebar({openSidebarToggle, OpenSidebar}) {
    const navigate = useNavigate();
    let [customeruser, setcustomeruser] = useState(false);
    let [customerresponse, setcustomerresponse] = useState("");
    let [customerbring, setcustomerbring] = useState(false);

    useEffect(() => {
        const getProfile = async () => {
          try {
            let response = await axios.get(
              `http://localhost:8000/api/v1/profile`,
              {
                withCredentials: true,
                headers: {
                  "Cache-Control": "no-cache",
                  Pragma: "no-cache",
                  Expires: "0",
                },
              }
            );
    
            // console.log("response: ", response);
            setcustomerresponse(response.data);
            setcustomeruser(true);
            setcustomerbring(customerresponse.firstname);

            console.log("prof",response.data)
    
          } catch (error) {
            console.log("axios error: ", error);
          }
        };
        getProfile();
      }, []);

    const handleLogout = async () => {
        if (!customerresponse.email || !customerresponse.password) {
          console.log('Value is not Given');
          alert("Please enter Missing Fields")
          return
        }
        // https://glorious-hat-bat.cyclic.app      // old url
        else {
          try {
            let response = await axios.post(`http://localhost:8000/logouts`, {
              email: customerresponse.email,
              password: customerresponse.password
            }, {
              withCredentials: true
            })
              console.log("logout successful");
              alert("logout successfull")
              navigate("/")
    
          } catch (error) {
            console.log(error)
            alert("Invalid Email or Password")

          }
        }
      };


  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <h0><b>MENU</b></h0>
                {/* <BsCart3  className='icon_header'/> MENU */}
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
            <Link to="/dashboard">
                    <BsGrid1X2Fill className='icon inline-block'/> Dashboard
                    </Link>                
            </li>
            <li className='sidebar-list-item'>
                <Link to="/dashboard">
                    <BsFillArchiveFill className='icon inline-block'/> Home
                </Link>
            </li>
            <li className='sidebar-list-item'>
            <Link to="/department">
                                    <BsFillGrid3X3GapFill className='icon inline-block'/> Departments
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to={"/Addemployee"}>
                    <BsPeopleFill className='icon inline-block'/> Add Employees
                    </Link>
            </li>
            <li className='sidebar-list-item'>
                <a href={"/Attrition"}>
                    <BsListCheck className='icon inline-block'/> Employee Attrition
                </a>
            </li>
            <li className='sidebar-list-item'>
                <Link to={"/employeealert"}>
                <BsMenuButtonWideFill className='icon inline-block'/> Employee Alerts
                    </Link>
            </li>
        {/*}    
            <li className='sidebar-list-item'>
                <a href="">
                    <BsMenuButtonWideFill className='icon inline-block'/> Retention Strategies
                </a>
  </li> */}
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillGearFill className='icon inline-block'/> Get Mobile App
                </a>
            </li>
            <li className='sidebar-list-item' onClick={handleLogout}>
                <a>
                    <BsFillGearFill className='icon inline-block'/> Logout
                    </a>
                
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar