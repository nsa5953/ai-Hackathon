import { useEffect } from "react";
import { fetchHackData } from "./hackSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectActiveCard, selectHackData } from "./hackSlice";
import Dashboard from "../dashboard/Dashboard";
import Operations from "../operations/Operations";
import styles from "./../dashboard/Dashboard.module.css"
import Header from "../header/Header";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Review from "../review/Review";
import Documents from "../storage/Documents";
import Gcp from "../gcp/Gcp";
import GCPCharts from "../charts/GCPCharts";

const Hack = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Gcp/>,
    },
    {
      path: "/documents",
      element: <GCPCharts />,
    },
  ]);

  const dispatch = useAppDispatch()  
  const activeCard = useAppSelector(selectActiveCard)

  useEffect(() => {
    dispatch(fetchHackData())
  },[]);
  return(
    <div className={styles.main}>    
      <Header />
      <div className={styles.hack}>
        <Operations />
        <RouterProvider router={router} />
      </div>

    </div>    
  )

}

export default Hack;