import HeaderComponent from "../components/headerComponents/HeaderComponent";
import OotchetTable from "../components/tableReports/TableOtchet";
import {Link} from "react-router-dom";

const Otchet = () => {
    return (
        <div>
            <HeaderComponent/>
            <OotchetTable/>
            <ul style={{display: "flex", marginLeft: "22%",}}>
                <li style={{display: "inline-block", width: "77px", height: "30px", marginLeft: "12%", lineHeight: "27px", borderRadius: "10px", background: "lightgray", textAlign: "center", letterSpacing: "0.3px"}}><Link to={'/Table'} style={{textDecoration: "none", color: "black"}}>Таблица</Link></li>
                <li style={{display: "inline-block", width: "62px", height: "30px", marginLeft: "12%", lineHeight: "27px", borderRadius: "10px", background: "lightgray", textAlign: "center", letterSpacing: "0.3px"}}><Link to={'/Forma'} style={{textDecoration: "none", color: "black"}}>Форма</Link></li>
                <li style={{display: "inline-block", width: "62px", height: "30px", marginLeft: "12%", lineHeight: "27px", borderRadius: "10px", background: "lightgray", textAlign: "center", letterSpacing: "0.3px"}}><Link to={'/Otchet'} style={{textDecoration: "none", color: "black"}}>Отчет</Link></li>
            </ul>
        </div>
    )
}
export default Otchet