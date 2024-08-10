import { useAppDispatch, useAppSelector } from "../../app/hooks"
import styles from "../dashboard/Dashboard.module.css"
import { applyBrandFilter, selectBackupData } from "../hack/hackSlice"

const Search = () => {
  const dispatch = useAppDispatch()  
  const backupProducts = useAppSelector(selectBackupData)
  
  const handleSearch = (e: any) => {
    const searchString = e.target.value;
    if(searchString === ''){
      dispatch(applyBrandFilter(backupProducts));
      return;
    }
    const newProducts = backupProducts.filter((product: any) => 
      product.title.toLowerCase().includes(searchString.toLowerCase())
    )
    dispatch(applyBrandFilter(newProducts));
  }

  return (<input type="text" placeholder='Search' className={styles.search} onKeyUp={handleSearch}/>)
}

export default Search;