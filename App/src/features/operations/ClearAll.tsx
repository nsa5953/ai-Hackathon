import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { applyBrandFilter, selectBackupData } from "../hack/hackSlice";
import styles from "../dashboard/Dashboard.module.css"

const ClearAll = () => {
  const dispatch = useAppDispatch()  
  const backupProducts = useAppSelector(selectBackupData) 
  
  const handleReset = () => {
    dispatch(applyBrandFilter(backupProducts));
  }

  return (<button onClick={handleReset} className={styles.reset}>Reset</button>)
}

export default ClearAll;