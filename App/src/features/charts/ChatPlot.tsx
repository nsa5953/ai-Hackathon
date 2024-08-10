
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import styles from "../dashboard/Dashboard.module.css"

const ChatPlot = ({data}:{data:any}) => {
  return (
    <HighchartsReact highcharts={Highcharts} options={data} containerProps={{ className: styles.highChart }}/>
  )
}

export default ChatPlot;