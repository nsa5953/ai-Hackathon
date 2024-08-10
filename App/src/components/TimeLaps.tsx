/* eslint-disable prettier/prettier */
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, ImageList, ImageListItem } from '@mui/material'
import { useEffect, useState } from 'react';

const TimeLaps = ({isOpen, setIsTimeLapsOpen}: any) => {

  const [timeLapseImages, setTimeLapseImages] = useState([])

  const fetchTimeLaps = () => {
    fetch('http://localhost:3001/api/getTimeLaps')
    .then(response => {
        response.json().then((data) => {
            console.log("Timelaps Images",data);
            setTimeLapseImages(data);
        })
      // Process Image here   
    })
    .then(json => console.log("json",json))
  }

  useEffect(() => {
    if(isOpen){
      fetchTimeLaps()
    }
  },[isOpen])


  return (
    <Dialog open={isOpen}  maxWidth={'xl'} >
      <DialogTitle>{'Timelapse'}</DialogTitle>
    <DialogContent>
    <ImageList
      sx={{ width: "80vw", height: 300, border: "2px solid #ddd" }}
      variant="quilted"
      cols={3}
      rowHeight={300}
    >
      {timeLapseImages?.map((item: any) => (
        <ImageListItem
          key={Math.random()}
        >
          <img
            src={item}
            alt={item}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setIsTimeLapsOpen(false)}>Close</Button>
    </DialogActions>
  </Dialog>
  )
}

export default TimeLaps;
