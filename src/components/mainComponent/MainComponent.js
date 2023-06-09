import {StyledForm} from "./MainComponent.style";
import FormReport from "./MainComponentV2";
import HeaderComponent from "../headerComponents/HeaderComponent";
import React from "react";
import {Link} from "react-router-dom";



const MainComponent = () => {
    return (
        <div>
            <HeaderComponent/>
            <h2 style={{ display: 'flex', justifyContent: 'center' }}>Учет скота</h2>
            <StyledForm>
                <FormReport/>
            </StyledForm>
            <ul style={{display: "flex", marginLeft: "22%",}}>
                <li style={{display: "inline-block", width: "77px", height: "30px", marginLeft: "12%", lineHeight: "27px", borderRadius: "10px", background: "lightgray", textAlign: "center", letterSpacing: "0.3px"}}><Link to={'/Table'} style={{textDecoration: "none", color: "black"}}>Таблица</Link></li>
                <li style={{display: "inline-block", width: "62px", height: "30px", marginLeft: "12%", lineHeight: "27px", borderRadius: "10px", background: "lightgray", textAlign: "center", letterSpacing: "0.3px"}}><Link to={'/Forma'} style={{textDecoration: "none", color: "black"}}>Форма</Link></li>
                <li style={{display: "inline-block", width: "62px", height: "30px", marginLeft: "12%", lineHeight: "27px", borderRadius: "10px", background: "lightgray", textAlign: "center", letterSpacing: "0.3px"}}><Link to={'/Otchet'} style={{textDecoration: "none", color: "black"}}>Отчет</Link></li>
            </ul>
        </div>
    );
}

export default MainComponent;