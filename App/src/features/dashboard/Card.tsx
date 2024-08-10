import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectYAxisData, setYaxisData } from "../hack/hackSlice";
import styles from "./Dashboard.module.css"

const Card = ({product}:{product:any}) => {
  const dispatch = useAppDispatch()
  const yAxis = useAppSelector(selectYAxisData)
  
  const manageGraph = (e: any,product:any) => {
    debugger
    e.stopPropagation();
    const data = yAxis;
    const discount = product.discountPercentage;
    const price = product.price;
    const stock = product.stock;
    const rating = product.rating;
    dispatch(setYaxisData([...data,{data: [discount, price,  stock, rating],
    }]))
  }

  return (
    <>
      <div className={styles.title}>{product?.title}</div>
      <div>Price: {product?.price}</div>
      <div className={styles.discount}>{product?.discountPercentage}%</div>
      <span className={styles.graph} onClick={(e) => manageGraph(e,product)}>&#8694;</span>
      <div className={product?.active ? styles.card_active : styles.card_inactive}>brand: {product?.brand}</div>
      <div className={product?.active ? styles.card_active : styles.card_inactive}>stock: {product?.stock}</div>
      {/* <img src={product.thumbnail}/> */}
    </>
  )
}

export default Card;