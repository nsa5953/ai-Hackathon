/* eslint-disable prettier/prettier */
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import {  useState } from "react";



const AddPeople = ({isOpen, setIsOpen, data, setRefetch}: any) => {
    
    const [updatedData, setUpdatedData] = useState(data);
    
    const handleClose = () => {
        setIsOpen(false)
    }

    const updateGCPResponseFile = async({ newData, imageData, imageID }: { newData: any; imageData: any; imageID: any; }) => {
        const urlencoded = new URLSearchParams();
        urlencoded.append("body", JSON.stringify(newData));
        urlencoded.append("file", imageData?.name);
        urlencoded.append("id", imageID);
        await fetch('http://localhost:3001/api/writeAndUploadFile',{
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': '*'  },
            body: urlencoded,
            mode: 'no-cors',
          })
        .then(response => response)
        .then(json => console.log(json))
            }


    return (
        <>
            <Dialog open={isOpen} onClose={handleClose} PaperProps={{
                component: 'form',
                onSubmit: (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    let newID: any = {id:0};                 
                    if(data.length > 0){
                        newID = data?.reduce((prev: { id: number; }, curr: { id: number; }) => {
                            return prev.id > curr.id ? prev : curr
                          })                        
                    }
                    const imageID = newID.id + 1; 
                    
                    Object.assign(formJson, { id: imageID });
                    Object.assign(formJson, { image: `${`https://storage.cloud.google.com/dementia-image-input/${imageID}.jpg`}` });

                    // update resopnse json to upload on GCP
                    const newData = [...data, formJson];
                    setUpdatedData(newData);
                    const imageData = formJson.imageData
                    updateGCPResponseFile({newData, imageData, imageID});
                    setRefetch(true)
                    handleClose();
                },
                }}>
                <DialogTitle>Add</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email address here. We
                    will send updates occasionally.
                </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="relation"
                        name="relation"
                        label="Relation (Mother/ Father/ Sibling/ Friend)"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="address"
                        name="address"
                        label="Address"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="gender"
                        >
                            <FormControlLabel value="F" control={<Radio />} label="Female" />
                            <FormControlLabel value="M" control={<Radio />} label="Male" />
                            <FormControlLabel value="O" control={<Radio />} label="Other" />
                        </RadioGroup>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="moreInfo"
                        name="moreInfo"
                        label="More Information"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="imageData"
                        name="imageData"
                        label="Image"
                        type="file"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Save</Button>
                </DialogActions>
            </Dialog>
        </>
        )
}

export default AddPeople;