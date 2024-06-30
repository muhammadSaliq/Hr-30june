import { useContext, useEffect } from 'react';
import { Link, json, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import axios from 'axios';
import Navbars from '../../../Ccomponents/Header/Navbar/Navbars';
import Footer from '../../../Ccomponents/Footer/Footer';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Negativeattrition = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [randomStrategies, setRandomStrategies] = useState([]);
  const [EnvironmentSatisfaction, setEnvironmentSatisfaction] = useState();
  const [JobInvolvement, setJobInvolvement] = useState();
  const [JobSatisfaction, setJobSatisfaction] = useState();
  const [message, setmessage] = useState('');


  const retentionstrategy = () => {
    if (EnvironmentSatisfaction === '2' && JobInvolvement === '2') {
      setmessage(' Competitive Compensation and Benefits  Remote Work Options  Career Path Planning  Employee Engagement Surveys  Professional Development Opportunities')
    }
    else if (EnvironmentSatisfaction === '1' && JobInvolvement === '1' && JobSatisfaction === '2') {
      setmessage("Team Building Activities  Work-Life Balance Support  Inclusive and Diverse Work Environment  Recognition of Achievements  Family-Friendly Policies")
    }

    else {
      setmessage([' Competitive Compensation and Benefits',
      'Professional Development Opportunities',
      'Flexible Work Schedules',
      'Remote Work Options',
      'Employee Recognition Programs',
      'Health and Wellness Programs',
      'Career Path Planning',
      'Regular Feedback and Performance Reviews',
      'Team Building Activities',
      'Employee Assistance Programs (EAP)',
      'Clear Communication Channels',
      'Work-Life Balance Support',
      'Mentoring and Coaching Programs',
      'Inclusive and Diverse Work Environment',
      'Opportunities for Skill Enhancement',
      'Employee Engagement Surveys',
      'Transparent Leadership',
      'Recognition of Achievements',
      'Family-Friendly Policies',
      'Social Events and Gatherings',
      'Continuous Learning Opportunities',
      'Tuition Reimbursement',
      'Financial Education Programs',
      'Employee Resource Groups (ERGs)',
      'Volunteer and Community Engagement Initiatives',
      'Health Insurance Benefits',
      'Flexible Spending Accounts (FSAs)',
      'Compressed Workweeks',
      'Cross-Training and Job Rotation',
      'Fun and Relaxation Spaces in the Workplace',
      'Employee Stock Ownership Plans (ESOPs)',
      'Generous Paid Time Off (PTO)',
      'Regular Team Building Retreats',
      'Leadership Development Programs',
      'Open-door Policy for Communication',
      'Employee of the Month Recognition',
      'Casual Dress Code Days',
      'Adoption Assistance Programs',
      'Sabbatical Leave Options',
      'Opportunities for Internal Mobility',
      'Recognition for Years of Service',
      'Childcare Assistance Programs',
      'Wellness Challenges and Competitions',
      'Employee Loans and Financial Support',
      'Professional Memberships and Associations',
      'Technology and Equipment Allowances',
      'Extended Maternity and Paternity Leave',
      'Employee Discount Programs',
      'Continuous Employee Training',
      'Collaborative and Supportive Team Culture'])
    }
  }
  const allRetentionStrategies = [
   ' Competitive Compensation and Benefits',
'Professional Development Opportunities',
'Flexible Work Schedules',
'Remote Work Options',
'Employee Recognition Programs',
'Health and Wellness Programs',
'Career Path Planning',
'Regular Feedback and Performance Reviews',
'Team Building Activities',
'Employee Assistance Programs (EAP)',
'Clear Communication Channels',
'Work-Life Balance Support',
'Mentoring and Coaching Programs',
'Inclusive and Diverse Work Environment',
'Opportunities for Skill Enhancement',
'Employee Engagement Surveys',
'Transparent Leadership',
'Recognition of Achievements',
'Family-Friendly Policies',
'Social Events and Gatherings',
'Continuous Learning Opportunities',
'Tuition Reimbursement',
'Financial Education Programs',
'Employee Resource Groups (ERGs)',
'Volunteer and Community Engagement Initiatives',
'Health Insurance Benefits',
'Flexible Spending Accounts (FSAs)',
'Compressed Workweeks',
'Cross-Training and Job Rotation',
'Fun and Relaxation Spaces in the Workplace',
'Employee Stock Ownership Plans (ESOPs)',
'Generous Paid Time Off (PTO)',
'Regular Team Building Retreats',
'Leadership Development Programs',
'Open-door Policy for Communication',
'Employee of the Month Recognition',
'Casual Dress Code Days',
'Adoption Assistance Programs',
'Sabbatical Leave Options',
'Opportunities for Internal Mobility',
'Recognition for Years of Service',
'Childcare Assistance Programs',
'Wellness Challenges and Competitions',
'Employee Loans and Financial Support',
'Professional Memberships and Associations',
'Technology and Equipment Allowances',
'Extended Maternity and Paternity Leave',
'Employee Discount Programs',
'Continuous Employee Training',
'Collaborative and Supportive Team Culture'
  ];

  const getRandomStrategies = () => {
    const totalStrategies = 50;
    const numberOfStrategiesToShow = 5;

    const allIndices = Array.from({ length: totalStrategies }, (_, index) => index);

    const shuffledIndices = allIndices.sort(() => Math.random() - 0.5);

    const selectedIndices = shuffledIndices.slice(0, numberOfStrategiesToShow);

    const selectedStrategies = selectedIndices.map((index) => allRetentionStrategies[index]);

    setRandomStrategies(selectedStrategies);
  };

  useEffect(() => {
    getRandomStrategies();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(to bottom, red, white)',
  };
      const handleDialogOpen = () => {
        setOpenDialog(true);
      };
    
      const handleDialogClose = () => {
        setOpenDialog(false);
      };
    
      const divStyle = {
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        backgroundColor: '#f44336', 
        color: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        width: '80%',
        maxWidth: '600px',
        fontSize: '50px',
        animation: 'shake 1s infinite',
      };
    
      const animationKeyframes = `
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-5px) rotate(-5deg); }
          50% { transform: translateX(5px) rotate(5deg); }
          75% { transform: translateX(-5px) rotate(-5deg); }
          100% { transform: translateX(0); }
        }
      `;
    
      const mediaQuery = `
        @media (max-width: 768px) {
          ${divStyle} {
            fontSize: '40px';
            padding: '10px';
            maxWidth: '80%';
          }
        }
    
        @media (max-width: 480px) {
          ${divStyle} {
            fontSize: '30px';
          }
        }
      `;

  return (
    <>
      <Navbars />
      <div style={containerStyle}>
        <style>{animationKeyframes}</style>
        <style>{mediaQuery}</style>
        <div style={divStyle}>
          <p>Upss... Seems like your employee is about to switch!!</p>
        </div>
      </div>

      <div className='rootcontainer2' style={{
          background: 'white',
          padding: '20px 0',
          textAlign: 'center',
        }}>
      
      <Button
  variant="contained"
  color="primary"
  style={{
    marginBottom: '20px',
    backgroundColor: '#4CAF50',
    color: 'white', 
    borderRadius: '25px', 
    padding: '12px 24px', 
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
    transition: 'background-color 0.3s ease-in-out',
    fontWeight: 'bold',
  }}
  onClick={handleDialogOpen}
>
  Show Retention Strategies
</Button>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Random Retention Strategies</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              {randomStrategies.map((strategy, index) => (
                <li key={index}>{strategy}</li>
              ))}
            </ul>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Link to="/Attrition" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary" style={{ marginBottom: '20px' }}>
                        Get back
                    </Button>
                </Link>
            </div>
      <Footer />
    </>
  );
};

export default Negativeattrition;