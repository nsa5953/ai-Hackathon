import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import styles from "../dashboard/Dashboard.module.css"
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchGcpBarChartData, fetchGcpChartData, fetchGcpColumnChartData, fetchGcpData, selectBarChartData, selectBarChartXAxisData, selectChartData, selectColumnXChartData, selectColumnYChartData, selectGcpData, selectSeries, selectXAxisData, selectYAxisData, setPieSeries, setXaxisData, setYaxisData } from '../gcp/gcpSlice';
import ChatPlot from './ChatPlot';
import { useEffect } from 'react';
import Charts from './Charts';


const GCPCharts = () => {  
  const dispatch = useAppDispatch();
  
  const GcpData = useAppSelector(selectGcpData)
  
  const chartData = useAppSelector(selectChartData)
  const barChartData = useAppSelector(selectBarChartData);
  const barChartXAxis = useAppSelector(selectBarChartXAxisData);
  const columnXdata = useAppSelector(selectColumnXChartData);  
  const columnYdata = useAppSelector(selectColumnYChartData);

  const handleGCPConnect = () => {

    let xAxis = GcpData.rows?.map((data: { is_garnished: any; }) => data.is_garnished)
    let data = GcpData.rows?.map((ele:  any) => ele.population_male)
    let new_confirmed = GcpData.rows?.map((ele:  any) => ele.new_confirmed)
    
    dispatch(setXaxisData(xAxis))
    dispatch(setYaxisData([{data, name:'population_male'},{data:new_confirmed,name:'new_confirmed'}]))
  }
  const setSeries = () => {
    const series  = chartData?.map((ele: any) => {
      return {'name':ele.IS_GARNISHED, y: ele.cnt}    
    })

    dispatch(setPieSeries(series))
  }

  useEffect(() => {
    dispatch(fetchGcpData())
    dispatch(fetchGcpChartData())
    dispatch(fetchGcpBarChartData())
    dispatch(fetchGcpColumnChartData())
  },[])

// useEffect(() => {
    
//   setSeries()

// },[GcpData])

  const xAxis = useAppSelector(selectXAxisData)
  const yAxis = useAppSelector(selectYAxisData)
  const pieSeries = useAppSelector(selectSeries)
  
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
      categories: ['is_garnished','not'],
      title: {
          text: null
      }
    },
    title: {
      //text: (`${type} chart`),
      text: 'Document Classification'
    },
    yAxis: {
      title: {
        text: 'Values',
      },
    },
    series: [{
      colorByPoint: true,
      data: chartData
  }],
    plotOptions: {
      line: {
          dataLabels: {
              enabled: true
          }
      }
  }
  });

  const getBarOptions = (type: any) => ({
    legend: {
      layout: 'vertical',
      align: 'left',
      verticalAlign: 'top',
      x: 400,
      y: 20,
      floating: true,
      borderWidth: 1,
      backgroundColor: '#FFFFFF'
  },
    chart: {
      type,
      width: 500,
      height: 300,
    },
    subtitle: {
        text: ''
    },
    xAxis: {
      categories: barChartXAxis,
      title: {
          text: null
      }
    },
    title: {
      //text: (`${type} chart`),
      text: 'Classification Accuracy'
    },
    yAxis: {
      title: {
        text: 'Values',
      },
    },
    series: [
      {
        data: barChartData,
      },
    ],
    plotOptions: {
      line: {
          dataLabels: {
              enabled: true
          }
      }
  }
  });

  const getColumnOptions = (type: any) => ({
  //   legend: {
  //     layout: 'vertical',
  //     align: 'left',
  //     verticalAlign: 'top',
  //     x: 900,
  //     y: 20,
  //     floating: true,
  //     borderWidth: 1,
  //     backgroundColor: '#FFFFFF'
  // },
    chart: {
      type,
      width: 1007,
      height: 300,
    },
    subtitle: {
        text: ''
    },
    xAxis: {
      categories: columnXdata,
      title: {
          text: null
      }
    },
    title: {
      //text: (`${type} chart`),
      text: 'Score Accuracy'
    },
    yAxis: {
      title: {
        text: 'Values',
      },
    },
    series: [{
      colorByPoint: true,
      data: columnYdata
  }],
    plotOptions: {
      line: {
          dataLabels: {
              enabled: true
          }
      }
  }
  });

  return (
  <div className={styles.chartOuter}>
    {/* <ChatPlot data={getOptions('area')} /> */}
    <div className={styles.chartInner}>
      <HighchartsReact highcharts={Highcharts} options={getOptions('pie')} containerProps={{ className: styles.highChart }}/>      
      <HighchartsReact highcharts={Highcharts} options={getBarOptions('bar')} containerProps={{ className: styles.highChart }}/>
    </div>
    <div className={styles.chartInner}>      
    <HighchartsReact highcharts={Highcharts} options={getColumnOptions('column')} containerProps={{ className: styles.highChart }}/>
    </div>
  </div>
      
  )
}

export default GCPCharts;