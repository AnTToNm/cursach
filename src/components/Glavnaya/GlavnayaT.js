import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.css';


function ResponsiveExample() {
    return (

        <Container>
            <hr style={{marginTop: '3%', marginBottom: '3%'}}/>
            <Row>
                <Col xs={12} md={8}>
                    <h style={{fontSize: '20px'}}><b>О нас</b></h>
                    <br/>
                        <br/>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            <p>Metus aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices. Morbi tristique senectus et netus et malesuada. Ac felis donec et odio pellentesque diam volutpat commodo sed. Pulvinar etiam non quam lacus suspendisse faucibus. Volutpat sed cras ornare arcu dui vivamus arcu. In hendrerit gravida rutrum quisque non tellus orci. Purus sit amet volutpat consequat mauris. Justo eget magna fermentum iaculis eu non diam phasellus vestibulum. Justo nec ultrices dui sapien eget mi. Ridiculus mus mauris vitae ultricies leo integer malesuada. Vitae aliquet nec ullamcorper sit amet risus nullam. Ac turpis egestas maecenas pharetra. Erat pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. Nullam eget felis eget nunc lobortis mattis. Placerat vestibulum lectus mauris ultrices eros in cursus turpis massa. Vel facilisis volutpat est velit. Mi eget mauris pharetra et ultrices neque ornare.</p>
                </Col>
                <Col xs={6} md={4}>
                    <h style={{fontSize: '20px'}}><b>Расписание</b></h>
                    <br/>
                    <br/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <h style={{fontSize: '20px'}}><b>Контакты</b></h>
                    <br/>
                    <br/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </Col>
            </Row>
            <hr style={{marginTop: '3%', marginBottom: '3%'}}/>
        </Container>
    );
}

export default ResponsiveExample;