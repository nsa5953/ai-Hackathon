import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import styles from "../dashboard/Dashboard.module.css"
import { useAppSelector } from '../../app/hooks';
import { selectXAxisData, selectYAxisData } from '../hack/hackSlice';
import ChatPlot from './ChatPlot';


const ChartMain = () => {
  const xAxis = useAppSelector(selectXAxisData)
  const yAxis = useAppSelector(selectYAxisData)
  
  const getOptions = (type: any) => ({
    chart: {
      type,
      width: 500,
      height: 300,
    },
    subtitle: {
        text: ''
    },
    xAxis: {
      categories: xAxis,
      title: {
          text: null
      }
    },
    title: {
      //text: (`${type} chart`),
      text: 'Performance'
    },
    yAxis: {
      title: {
        text: 'Values',
      },
    },
    series: yAxis,
  });

  return (
  <>
    <ChatPlot data={getOptions('area')} />
    <HighchartsReact highcharts={Highcharts} options={getOptions('bar')} containerProps={{ className: styles.highChart }}/>
  </>
      
  )
}

export default ChartMain;