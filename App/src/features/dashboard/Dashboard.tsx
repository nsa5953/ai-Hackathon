import { useAppDispatch, useAppSelector } from "../../app/hooks";
import AreaChart from "../charts/AreaChart";
import ChartMain from "../charts/ChartMain";
import Charts from "../charts/Charts";
import GCPCharts from "../charts/GCPCharts";
import FileUpload from "../fileUpload/FileUpload";
import Gcp from "../gcp/Gcp";
import { selectHackData, setActiveCard, toggleCards } from "../hack/hackSlice";
import Search from "../operations/Search";
import Card from "./Card";
import styles from "./Dashboard.module.css"

const Dashboard = () => {
  const dispatch = useAppDispatch()
  
  const products = useAppSelector(selectHackData)

  const setToggleCards = (id: any) => {
    const newProducts = products.map((product:any) => {
      if(product?.id === id){
        return {
          ...product,
          active: !product?.active
        }
      }
      return {
        ...product
      }
    })
    dispatch(toggleCards(newProducts))
  }


  return (
  <div className={styles.container}>
    <div className={styles.card_container}>
      {products && products.map((product:any) => {
      return(
        <div 
        key={product?.id} 
        onClick={() => setToggleCards(product?.id)} 
        className={`${styles.card} ${product?.active ? styles.card_opened : styles.card_closed}`}>
            <Card product={product}/>
            {/* <button onClick={() => dispatch(setActiveCard({product}))}>
              Open
            </button> */}
        </div>)
      })}
    </div>
    <div className={styles.chart}>
      <ChartMain/>
      {/* <Charts/> */}
    </div> 
    <Gcp/>
    
    <GCPCharts/>
  </div>
  )
};

export default Dashboard;