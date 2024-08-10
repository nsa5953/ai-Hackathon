/* eslint-disable prettier/prettier */

const AIVideo = ({video}:any) => {
    return (
        <video autoPlay width="300" controls key={Math.random()}>
            <source src={video} type="video/mp4"/>
        </video>
    )
}

export default AIVideo