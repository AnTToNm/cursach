import {Button, Container, Logo, Myaccount} from "./HeaderComponent.style";
import logo from '../imges/logo.png'
import account from '../imges/account.svg'
import {useState} from "react";
import Modal from "../Modal/Modal";
import {Link} from "react-router-dom";



const HeaderComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpenModal = () => {
        setIsOpen(true);
    }
    const handleCloseModal = () => {
        setIsOpen(false);
    }
    return (
        <div>
            <Container>
                <Logo src={logo}/>
                <ul style={{display: 'flex',
                    justifyContent: 'center',
                    alightItems: 'center'}}>
                    <li style={{listStyleType: 'none', marginLeft: '5%', marginRight: '5%'}}><Link to={'/Forma'} style={{textDecoration: "none", color: "black"}}>Сотрудникам</Link></li>
                    <li style={{listStyleType: 'none', marginLeft: '5%', marginRight: '5%'}}><Link to={'/Table'} style={{textDecoration: "none", color: "black"}}>Руководителям</Link></li>
                    <li style={{listStyleType: 'none', marginLeft: '5%', marginRight: '5%'}}><Link to={'/'} style={{textDecoration: "none", color: "black"}}>Заказчикам</Link></li>
                </ul>
                <Button onClick={handleOpenModal}><Myaccount src={account}/></Button>
                {isOpen && <Modal open={isOpen} onClose={handleCloseModal}/>}
            </Container>
        </div>
    )
}

export default HeaderComponent;