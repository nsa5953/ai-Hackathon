/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import UploadImage from "./uploadImage";
import People from "./people";
import Info from "./info";
import { fetchFileReadData, selectReadData } from "../features/fileUpload/fileReadSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import AIVideo from "./aiVideo";
import { Box } from '@mui/material';
import Loader from "./Loader";
import WelcomePage from './WelcomePage';


const Details = ({showNotification, setShowNotification}:any) => {
    const [showLoader, setShowLoader] = useState(false);
    const [showWelcomePage, setShowWelcomePage] = useState(true);
    const dispatch = useAppDispatch();
    const GcpData = useAppSelector(selectReadData);
    console.log("GcpData",GcpData);
    
    const [refetch, setRefetch] = useState(false);

    useEffect(() => {
        const a = dispatch(fetchFileReadData())
        console.log("GcpData-useEffect",a);
    },[dispatch]);
    
    useEffect(() => {
        if(refetch)
        {
            const a = dispatch(fetchFileReadData())
            console.log("GcpData-useEffect",a);
            setRefetch(false)
        }
    },[dispatch, refetch])
    
    const [activeId, setActiveId] = useState(1);
    return (
        <>  
            <Loader open={showLoader} setOpen={setShowLoader}/>
            <Box sx={{display: "flex" }}>
                <UploadImage setShowLoader={setShowLoader} setActiveId={setActiveId} setShowWelcomePage={setShowWelcomePage}/>
                {!showWelcomePage && <People setActiveId={setActiveId} setRefetch={setRefetch} responseData={GcpData}/> }
            </Box>
            <WelcomePage isOpen={showWelcomePage} />
            {/* <UploadImage />
            <People setActiveId={setActiveId} setRefetch={setRefetch} responseData={GcpData}/> */}
            {!showWelcomePage && <Info activeId={activeId} responseData={GcpData} showNotification={showNotification} setShowNotification={setShowNotification}/>}
        </>
    )
};

export default Details;