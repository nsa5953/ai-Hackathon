/* eslint-disable prettier/prettier */
import * as React from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Box, Button, Grid, styled } from '@mui/material';
import { fetchFileUploadData } from '../features/fileUpload/fileUploadSlice';
import { useAppDispatch } from '../app/hooks';
import { useState } from 'react';
import WebcamCapture from './WebcamCapture';

// const videoConstraints = {
//     width: 220,
//     height: 200,
//     facingMode: "user"
// };

// const CapturePhoto = () => {
//     const [image,setImage]=useState('');
//     const webcamRef = React.useRef(null);
//     const capture = React.useCallback(
//         () => {
//         const imageSrc = webcamRef.current.getScreenshot();
//         setImage(imageSrc)
//         });
//     return (
//         <div className="webcam-container">
//             <div className="webcam-img">

//                 {image == '' ? <Webcam
//                     audio={false}
//                     height={200}
//                     ref={webcamRef}
//                     screenshotFormat="image/jpeg"
//                     width={220}
//                     videoConstraints={videoConstraints}
//                 /> : <img src={image} />}
//             </div>
//             <div>
//                 {image != '' ?
//                     <button onClick={(e) => {
//                         e.preventDefault();
//                         setImage('')
//                     }}
//                         className="webcam-btn">
//                         Retake Image</button> :
//                     <button onClick={(e) => {
//                         e.preventDefault();
//                         capture();
//                     }}
//                         className="webcam-btn">Capture</button>
//                 }
//             </div>
//         </div>
//     );
// }

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });


const UploadImage = ({setShowLoader, setActiveId, setShowWelcomePage}: any) => {
    const dispatch = useAppDispatch();

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [captureOpen, setCaptureOpen] = useState(false);

    const onFileChange = (e: any) =>{
    setShowLoader(true)
    let files : any = selectedFiles;
    const uploadedFiles = [...e.target.files];
    uploadedFiles.forEach((file: { name: any; }) => {
        return files.push(file.name);
    })
    setSelectedFiles(files);
    dispatch(fetchFileUploadData({files})).then(
        (res) => {
            // active image code
            fetch('http://localhost:3001/api/getPredictionId')
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
    )
    }

    return (
        <Grid>
            <Box component="section" sx={{ pt: 2, pr: 2 , pl:2,  gap: "15px", display: "flex", justifyContent:"center"}}>
                <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CameraAltIcon />}
                onChange={onFileChange}
                >
                    <VisuallyHiddenInput type="file" />
                </Button>

                <Button variant="contained" onClick={() => setCaptureOpen(true)}>Capture Photo</Button>
                <WebcamCapture isOpen={captureOpen} setCaptureOpen={setCaptureOpen} setShowLoader={setShowLoader} setActiveId={setActiveId} setShowWelcomePage={setShowWelcomePage}/>
            </Box>
        </Grid>
        )
}

export default UploadImage;