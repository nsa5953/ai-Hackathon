/* eslint-disable prettier/prettier */

import logo from '../Logo.jpg';
import { Grid, Typography } from '@mui/material';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';



const WelcomePage = ({isOpen}: any) => {
  return (
  <>{
    isOpen ? (
    <Grid 
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '80vh' }}>
      <Typography variant="h2" gutterBottom >
        Welcome to dbvolt hacksquad Dementia!!
      </Typography>
      <img src={logo} className="logo" alt="logo" width="250"/>
      {/* <PsychologyAltIcon style={{fontSize: "200"}}/> */}
   </Grid>
   ) : null
    }
  </>
  )
}

export default WelcomePage;