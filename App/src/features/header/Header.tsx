import styles from "../dashboard/Dashboard.module.css"
import Search from "../operations/Search";
//import img from "../../../src/logo.svg";
import img from "../../../src/dblogo.png";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectActivePage, setActivePage } from "../hack/hackSlice";
import { useEffect, useState } from "react";

const Header = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);

  const handleClick = (page: number) => {
    setPage(page)
    dispatch(setActivePage(page))
  }
  
  useEffect(() => {
    if(window.location.pathname === '/documents'){
      setPage(2)
    }
  },[]);
  
  return (
    <div className={styles.header}>
      {/* <span className={styles.logo}>&there4;</span> */}
      <img className={styles.img} src={img}/>
      <span className={styles.nav}><a className={page===1 ? styles.nav_active : styles.nav_a} href="/" onClick={() => handleClick(1)}>Document</a></span>
      <span className={styles.nav}><a className={page===2 ? styles.nav_active : styles.nav_a} href="/documents" onClick={() => handleClick(2)}>Dashboard</a></span>
      {/* <Search/> */}
    </div>
  )
}
export default Header;
