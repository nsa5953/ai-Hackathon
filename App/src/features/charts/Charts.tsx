import Highcharts from 'highcharts';
import Highchart from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import Highcharts3D from 'highcharts/highcharts-3d';
HighchartsExporting(Highcharts);
Highcharts3D(Highcharts);

const Charts = () => {
  const options = {
    chart: {
      type: 'spline'
    },
    title: {
      text: 'My chart'
    },
    series: [
      {
        data: [1, 2, 1, 4, 3, 6]
      }
    ]
  };

  const options2 = {
    title: {
      text: 'My stock chart'
    },
    series: [
      {
        data: [1, 2, 1, 4, 3, 6, 7, 3, 8, 6, 9]
      }
    ]
  };

  const options3 = {
    title: {
      text: 'My stock chart'
    },
      
    series: [{
      data: [[Date.UTC(2013,5,2),0.7695],
  [Date.UTC(2013,5,3),0.7648],
  ...
  [Date.UTC(2013,5,24),0.7623],]
    }]
  }

  const getOptions = (type: any) => ({
    chart: {
      type,
      width: 500,
      height: 300,
    },
    title: {
      text: (`${type} chart`),
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

  const get3DOptions = (type: any) => ({
    chart: {
      type,
      options3d: {
        enabled: true,
        alpha: 15,
        beta: 30,
        depth: 300,
      },
    },
    title: {
      text: (`${type} chart`),
    },
    yAxis: {
      title: {
        text: 'Values',
      },
    },
    xAxis: [
      {
        visible: false,
      },
      {
        visible: false,
      },
      {
        visible: false,
      },
    ],
    plotOptions: {
      [type]: {
        depth: 100,
      },
    },
    series: [
      {
        xAxis: 0,
        data: [2, 2, 1, 4, 3, 2],
      },
      {
        xAxis: 1,
        data: [4, 3, 6, 5, 4, 6],
      },
      {
        xAxis: 2,
        data: [5, 7, 7, 6, 7, 7],
      },
    ],
    credits: {
      enabled: false,
    },
  });

  return (
    <> 
      <HighchartsReact 
        highcharts={Highcharts} 
        options={options} />    
      <HighchartsReact
        highcharts={Highchart}
        constructorType={'stockChart'}
        options={options2}
      /> 
      <HighchartsReact
      highcharts={Highchart}
      constructorType={'stockChart'}
      options={options3}
      />
      <HighchartsReact highcharts={Highcharts} options={getOptions('line')} />
      <HighchartsReact highcharts={Highcharts} options={getOptions('spline')} />
      <HighchartsReact highcharts={Highcharts} options={getOptions('area')} />
      <HighchartsReact highcharts={Highcharts} options={getOptions('areaspline')} />
      <HighchartsReact highcharts={Highcharts} options={getOptions('column')} />
      <HighchartsReact highcharts={Highcharts} options={getOptions('bar')} />
      <HighchartsReact highcharts={Highcharts} options={getOptions('pie')} />
      <HighchartsReact highcharts={Highcharts} options={getOptions('scatter')} />
      <HighchartsReact highcharts={Highcharts} options={get3DOptions('line')} />
      <HighchartsReact highcharts={Highcharts} options={get3DOptions('spline')} />
      <HighchartsReact highcharts={Highcharts} options={get3DOptions('area')} />
      <HighchartsReact highcharts={Highcharts} options={get3DOptions('areaspline')} />
      <HighchartsReact highcharts={Highcharts} options={get3DOptions('column')} />
      <HighchartsReact highcharts={Highcharts} options={get3DOptions('bar')} />
      <HighchartsReact highcharts={Highcharts} options={get3DOptions('pie')} />
      <HighchartsReact highcharts={Highcharts} options={get3DOptions('scatter')} />
    </>
  )

}
//test commit
export default Charts;