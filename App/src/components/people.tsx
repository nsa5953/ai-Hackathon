import { Box, Grid, Tooltip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import img_1 from '../static/images/avatar/1.jpg';
import img_2 from '../static/images/avatar/2.jpg';
import img_3 from '../static/images/avatar/3.jpg';
import { useState } from 'react';
import AddPeople from './AddPeople';
import { selectReadData } from '../features/fileUpload/fileReadSlice';
import { useAppSelector } from '../app/hooks';
import React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';

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

const People = ({setActiveId, setRefetch, responseData}: any) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    //const responseData = useAppSelector(selectReadData);

    return (
        <Grid>
            <Box component="section" sx={{ pb:1, pt:1 }} display={'flex'} flexDirection={'row'} justifyContent={"start"} alignItems={'center'} gap={2}>
                <Stack direction="row" spacing={2}>
                    {responseData?.map((item: any) => {
                        return (
                            <Box key={item.id}>
                                <Tooltip title={`${item.relation.toUpperCase()} - ${item.name}`}>
                                    <Avatar 
                                    alt={item.name} 
                                    src={item.image}  
                                    sx={{ width: 50, height: 50, boxShadow: '#ccc 5px 5px 5px', border:'1px solid #DDD'}}
                                    onClick={() => setActiveId(item.id)}
                                    />
                                </Tooltip>
                            </Box>
                            
                        )
                    })}
                    
                </Stack>
                <Tooltip title={`Add more people`}><AddCircleIcon color='action' fontSize='large' onClick={() => setIsOpen(true)} titleAccess='Add more people'/></Tooltip>
                {/* <Button
                {/* <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    onClick={() => setIsOpen(true)}
                    >
                        Upload More People
                    <VisuallyHiddenInput type="" />
                </Button> */}
                <AddPeople isOpen={isOpen} setIsOpen={setIsOpen} data={responseData} setRefetch={setRefetch}/>
            </Box>
        </Grid>
    )
}

export default React.memo(People);
