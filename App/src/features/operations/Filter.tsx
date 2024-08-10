import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { applyBrandFilter, selectHackData, selectBackupData} from "../hack/hackSlice";
import styles from "../dashboard/Dashboard.module.css"

const Filter = () => {
  const dispatch = useAppDispatch()  
  const backupProducts = useAppSelector(selectBackupData) 
  const brandFilters = [...new Set(backupProducts?.map((product:any) => product?.brand)),'All']

  const handleClick = (e: any) => {    
    if(e.target.value === 'All'){
      dispatch(applyBrandFilter(backupProducts));
      return;
    }
    const newProducts = backupProducts.filter((product:any) => {
      if(product?.brand === e.target.value){
        return {
          ...product
        }
      }
    })
    dispatch(applyBrandFilter(newProducts));
  }
  return (
    <div className={styles.filter_container}>
      <div className={styles.filterBrand}>Brand &nbsp;</div> 
      <select className={styles.filter} onClick={handleClick}>
        {brandFilters?.map((brand:any) => {
          return (<option key={brand}>{brand}</option>)
        })}
      </select>
    </div>

  )
}

export default Filter;
