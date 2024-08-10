/* eslint-disable prettier/prettier */
import logo from '../Logo.jpg';
import Avatar from '@mui/material/Avatar';
import '../App.css';
import { Badge, BadgeProps, Box, Grid, IconButton, styled } from '@mui/material';
import Divider from '@mui/material/Divider';
import img_1 from '../ganesh_profile.jpg';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import TimeLaps from './TimeLaps';
import { useState } from 'react';
// import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -1,
      top: 5,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '10px 7px',
    },
  }));

const Notification = ({setShowNotification}:any) => {   

    const handleNotificationClick = () => {
        setShowNotification(true);
        console.log('ok bu==');
    }

    return (
        <IconButton aria-label="cart" onClick={() => handleNotificationClick()}>
            <StyledBadge badgeContent={1} color="error">
                <Box sx={{ border:"2px solid #eee", borderRadius: '20px', padding: "0px 2px" }}>
                    <NotificationsNoneIcon color="primary" fontSize='large' onClick={() => {}}/>
                </Box>
            </StyledBadge>
        </IconButton>
    );
  }

const Header = ({setShowNotification}: any) => {    
    const [isTimeLapsOpen, setIsTimeLapsOpen] = useState(false);
    return (
        <Grid container spacing={2} display={"flex"} justifyContent={"space-between"} alignItems={"center"} className='header-container'>
            <Grid item>
                <img src={logo} className="logo" alt="logo" />
                {/* <PsychologyAltIcon style={{marginLeft:"15px", fontSize: "58", color:"#000fa2", border:" 4px solid #000fa2", borderRadius:"6px"}}/> */}
            </Grid>
            <Grid item display={"flex"} justifyContent={"space-between"} alignItems={"center"} gap={2} sx={{ mr: 20}}>
                <Avatar
                    alt="Remy Sharp"
                    src={img_1}
                    sx={{ width: 60, height: 60, boxShadow: '#ccc 5px 5px 5px', border:'1px solid #DDD'}}
                    variant='rounded'
                    onClick={() => setIsTimeLapsOpen(true)}
                    />
                <Divider orientation="vertical" variant="middle" flexItem />
                <span>Welcome Ganesh!</span><Notification setShowNotification={setShowNotification}/>
            </Grid>
            <TimeLaps isOpen={isTimeLapsOpen} setIsTimeLapsOpen={setIsTimeLapsOpen}/>
        </Grid>
        
    )
}

export default Header;