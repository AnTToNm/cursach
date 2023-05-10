import {Button, ButtonContainer, Container, Logo, Myaccount} from "./HeaderComponent.style";
import logo from '../imges/logo.png'
import account from '../imges/account.svg'
import {useState} from "react";
import Modal from "../Modal/Modal";

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
                <ButtonContainer>
                    <Button>Сотрудникам</Button>
                    <Button>Руководителям</Button>
                    <Button>Заказчикам</Button>
                </ButtonContainer>
                <Button onClick={handleOpenModal}><Myaccount src={account}/></Button>
                {isOpen && <Modal open={isOpen} onClose={handleCloseModal}/>}
            </Container>
        </div>
    )
}

export default HeaderComponent;