import TableReports from "../components/tableReports/TableReports";
import HeaderComponent from "../components/headerComponents/HeaderComponent";
import {Link} from "react-router-dom";

const Table = () => {
    return (
        <div>
            <HeaderComponent/>
            <TableReports/>
            <ul style={{display: "flex", marginLeft: "22%",}}>
                <li style={{display: "inline-block", width: "77px", height: "30px", marginLeft: "12%", lineHeight: "27px", borderRadius: "10px", background: "lightgray", textAlign: "center", letterSpacing: "0.3px"}}><Link to={'/Table'} style={{textDecoration: "none", color: "black"}}>Таблица</Link></li>
                <li style={{display: "inline-block", width: "62px", height: "30px", marginLeft: "12%", lineHeight: "27px", borderRadius: "10px", background: "lightgray", textAlign: "center", letterSpacing: "0.3px"}}><Link to={'/Forma'} style={{textDecoration: "none", color: "black"}}>Форма</Link></li>
                <li style={{display: "inline-block", width: "62px", height: "30px", marginLeft: "12%", lineHeight: "27px", borderRadius: "10px", background: "lightgray", textAlign: "center", letterSpacing: "0.3px"}}><Link to={'/Otchet'} style={{textDecoration: "none", color: "black"}}>Отчет</Link></li>
            </ul>
        </div>
    )
}
export default Table