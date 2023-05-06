import {Button, ButtonContainer, Container, Logo, Myaccount} from "./HeaderComponent.style";
import logo from '../imges/logo.png'
import account from '../imges/account.svg'
const HeaderComponent = () => {
    return(
        <div>
            <Container>
                <Logo src={logo}/>
                <ButtonContainer>
                    <Button>Сотрудникам</Button>
                    <Button>Руководителям</Button>
                    <Button>Заказчикам</Button>
                </ButtonContainer>
                    <Button><Myaccount src={account}/></Button>
            </Container>
        </div>
    )
}

export default HeaderComponent;