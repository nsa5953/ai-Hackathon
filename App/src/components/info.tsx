/* eslint-disable jsx-a11y/no-distracting-elements */
/* eslint-disable prettier/prettier */
import { Box, Button, FormControlLabel, Grid, Paper, Switch, Zoom } from "@mui/material"
import ImageList from "@mui/material/ImageList"
import ImageListItem from "@mui/material/ImageListItem"
import { useSpeechSynthesis } from "react-speech-kit"
import {
  useEffect,
  useState,
} from "react"
import VolumeUp from "@mui/icons-material/VolumeUp"
import AIVideo from './aiVideo'

const Info = ({ activeId, responseData, showNotification, setShowNotification }: any) => {
  const [voiceIndex, setVoiceIndex] = useState(null)
  const [text, setText] = useState("")
  //const responseData = useAppSelector(selectReadData)

  const { speak, voices } = useSpeechSynthesis()
  const [voice, setVoice] = useState(voices[3])
  const [autoSpeak, setAutoSpeak] = useState(false)

  const data: any = responseData?.find((item: any) => item.id === activeId)

  const startSpeak = (text: any) => speak({ text, voice, rate: 0.7, pitch: 1 })

  useEffect(() => {
    setVoice(voices[3])
  }, [voiceIndex, voices])

  useEffect(() => {
    const textToSpeak = `Image belongs to ${data?.name}. ${
      data?.gender === "F" ? "She" : "He"
    } is your ${data?.relation} who lives in ${data?.address}.${
      data?.description && data?.description
    }${data?.moreInfo && data?.moreInfo}`
    setText(textToSpeak)
    if (autoSpeak) {
      startSpeak(textToSpeak)
    }
  }, [autoSpeak, data, startSpeak])

  const srcset = (image: any, size: any, rows = 1, cols = 1) => {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    }
  }

  const icon = (
    <Paper sx={{ p: 2, width: "50vw", height: 20, justifyContent:"space-between", display: "flex", bgcolor:"#f5eded" }} elevation={4}>
      <Box>Time to take your medicine at 4PM.</Box><Button onClick={() => setShowNotification(false)}>X</Button>
    </Paper>
  );

  return (
    <Grid>
      <Box sx={{ display: showNotification? 'flex' : 'none', justifyContent:"center" }}>
        <Zoom in={showNotification}>{icon}</Zoom>
      </Box>
      <Box
        component="section"
        sx={{ pr: 2, pl:2, border: '1px solid white' }}
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"flex-start"}
          sx={{border: '1px solid white' }}
        >
          {/* <Button 
                      style={{maxWidth: '150px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}} 
                      variant="contained" 
                      startIcon={<VolumeUp />} 
                      onClick={() => speak({ text, voice, rate: 0.7, pitch: 1 })}>
                          Listen
                    </Button> */}
          {/* <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
            <VolumeUp />
            <Switch
              checked={autoSpeak}
              onChange={() => setAutoSpeak((prev) => !prev)}
            />
          </Box> */}

          <span><b>{data?.name}</b></span>
          {/* <span>
            {data?.gender === "F" ? "She" : "He"} is your {data?.relation} who
            lives in {data?.address}.
          </span> */}
          <span>{data?.description && data?.description}</span>
          <span>{data?.moreInfo && data?.moreInfo}</span>
          {data?.events?.length > 0 &&
            data?.events?.map((event: any, index: any) => {
              return (
                <>
                  {event.description}
                  <ImageList
                    sx={{ width: 950, height: 350, border: "2px solid #ddd" }}
                    variant="quilted"
                    cols={3}
                    rowHeight={350}
                  >
                    {event?.gallery?.map((item: any) => (
                      <ImageListItem
                        key={Math.random()}
                        cols={item.cols || 1}
                        rows={item.rows || 1}
                      >
                        <img
                          src={item.img}
                          srcSet={item.img}
                          alt={item.title}
                          loading="lazy"
                          key={index}
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </>
              )
            })}
        </Box>    
        {/* <Box sx={{ m: 2, border: '1px solid white' }}>
        </Box>     */}
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={'start'}
          sx={{ m: 2, border: '1px solid white' }}
        >
          <img
            src={data?.image}
            height={150}
            alt={`${data?.relation?.toUpperCase()} - ${data?.name}`}
          />
          <span
            style={{ fontWeight: "bold" }}
          >{`${data?.relation?.toUpperCase()} - ${data?.name}`}</span>
          
          <AIVideo video={data?.video}/>
        </Box>
        {/* <select
                    id="voice"
                    name="voice"
                    value={voiceIndex || ''}
                    onChange={(event) => {
                        setVoiceIndex(event.target.value);
                    }}
                    >
                    <option value="">Default</option>
                    {voices.map((option, index) => (
                        <option key={option.voiceURI} value={index}>
                        {`${option.lang} - ${option.name}`}
                        </option>
                    ))}
                    </select> */}
      </Box>
    </Grid>
  )
}

export default Info
