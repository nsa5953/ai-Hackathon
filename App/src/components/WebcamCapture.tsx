/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from "react"
import Webcam from "react-webcam"
import { Box, Button, Dialog, DialogActions, DialogContent, Grid } from '@mui/material'

const WebcamCapture = ({isOpen, setCaptureOpen, setShowLoader, setActiveId, setShowWelcomePage}: any) => {
  const webcamRef = useRef(null)
  const [imgSrc, setImgSrc] = useState(null);
  const [imageSaved, setImageSaved] = useState(0);

  const capture = () => {
    const canvasRef = webcamRef.current.getScreenshot()
    setImgSrc(canvasRef)
  }

  useEffect(() => {
    setImgSrc(null)
  },[isOpen])

  const uploadToGCP = () => {
    // await fetch('http://localhost:3001/api/getRecentFile',{
    //   method: 'GET',
    //   headers: {'Content-Type':'application/x-www-form-urlencoded',
    //   'Access-Control-Allow-Origin':'*',
    //   'Access-Control-Allow-Headers': '*',
    //   'Access-Control-Allow-Methods': '*'  },
    //   mode: 'no-cors',
    // })
    fetch('http://localhost:3001/api/getRecentFile')
    .then(response => {
        response.json().then((data) => {
            console.log("image process done",data?.predictions);
            setActiveId(parseInt(data?.predictions));
            setShowLoader(false);
            setShowWelcomePage(false);
        })
      // Process Image here   
    })
    .then(json => console.log("json",json))
  }

  useEffect(() => {
    if(imageSaved > 0){
        uploadToGCP()
    }
  },[imageSaved])


  const downloadImage = () => {    
    setShowLoader(true);
    setCaptureOpen(false);
    const canvas = document.createElement("canvas")
    const image = new Image()
    image.src = imgSrc
    image.onload = () => {
      canvas.width = image.width
      canvas.height = image.height
      const ctx = canvas.getContext("2d")
      ctx.drawImage(image, 0, 0)
      const link = document.createElement("a")
      link.download = "webcam-capture.png"
      link.href = canvas.toDataURL("image/png")
      link.click()
      setImageSaved(prev => prev + 1)
    }
  }

  return (
    <Dialog open={isOpen} onClose={() => setCaptureOpen(false)}>
      <DialogContent>
        <Grid sx={{display:"flex", flexDirection:"row", alignItems:"center", gap: "20px"}}>
          <Box sx={{display:"flex", flexDirection:"column"}}>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="220"
            height="200"
          />
          <Button size="small" variant="contained" onClick={capture}>Capture</Button>  
          </Box>
          <Box sx={{display:"flex", flexDirection:"column", gap: "20px"}}>
            {imgSrc && (
              <>
                <img src={imgSrc} alt="Captured" width={"200"}/>
                <Button size="small" variant="contained" color="success" onClick={downloadImage}>Save</Button>
              </>
            )}
          </Box>
        </Grid>

      </DialogContent>
      <DialogActions>
          <Button onClick={() => setCaptureOpen(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

export default WebcamCapture