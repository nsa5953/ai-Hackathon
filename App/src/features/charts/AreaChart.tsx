import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import styles from "../dashboard/Dashboard.module.css"

// import HighchartsExporting from 'highcharts/modules/exporting';
// import Highcharts3D from 'highcharts/highcharts-3d';
// HighchartsExporting(Highcharts);
// Highcharts3D(Highcharts);

const AreaChart = () => {
  const getOptions = (type: any) => ({
    chart: {
      type,
      width: 500,
      height: 300,
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
    series: [
      {
        data: [1, 2, 1, 4, 3, 6],
      },
      {
        data: [2, 7, 0, 4, 6, 2],
      },
    ],
  });

  return (
  <>
    <HighchartsReact highcharts={Highcharts} options={getOptions('area')} containerProps={{ className: styles.highChart }}/>
    <HighchartsReact highcharts={Highcharts} options={getOptions('bar')} containerProps={{ className: styles.highChart }}/>
  </>
      
  )
}

export default AreaChart;