import Filter from "./Filter";
import Search from "./Search";
import ClearAll from "./ClearAll";
import styles from "../dashboard/Dashboard.module.css"
import FileUpload from "../fileUpload/FileUpload";
import Documents from "../storage/Documents";

const Operations = () => {
  return (
    <div className={styles.operations}>
      {/* <Search/> */}
      {/* <Filter/> */}
      {/* <ClearAll/> */}
      <FileUpload />
      <Documents />
    </div>

  );
}

export default Operations;