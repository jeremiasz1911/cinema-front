import { useState } from 'react';
import { Form,FormGroup, Label, Input, Card, CardBody, Col, Row, Button, FormFeedback} from 'reactstrap';
import logo from '../assets/logo/cinema.png';
import Login from '../utilis/api/auth/login';
import axios from 'axios';
import { VFXImg } from 'react-vfx';



const LoginModal = (props) => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [logged, setLoggedStatus] = useState(true);



  return (
    <div>
    {
      logged
      ? false
      : (
      <>
      <div class="bg"></div>
      <div class="bg bg2"></div>
      <div class="bg bg3"></div>
    <div className="back-drop">
      
      <Card className="no-border">
        {/* <CardImg className="cinema-login-logo" top width="100%" src={logo} alt="Card image cap" /> */}
        <VFXImg
        className="align-self-center m-3"
        src={logo}
        width="50%"
        alt="Cinema App"
        shader="glitch"
        />
          <CardBody>
            <Form>
              <FormGroup>
                <Row>
                  <Col md="3"/>
                  <Col>
                  <Label  for="exampleEmail"> - Login - </Label>
                  <Input type="email" name="email" id="exampleEmail" placeholder="Podaj login" onChange={event => setUsername(event.target.value)}/>
                  <Label for="exampleEmail"> - Hasło - </Label>
                  {
                    logged 
                    ? false
                    (<Input type="password" name="password" id="exampleEmail" placeholder="Podaj hasło" onChange={event => setPassword(event.target.value)}/>) 
                    :
                    (
                      <> 
                    <Input invalid type="password" name="password" id="exampleEmail" placeholder="Podaj hasło" onChange={event => setPassword(event.target.value)}/>
                    <FormFeedback>Oh noes! that name is already taken</FormFeedback>
                      </>
                      )
                  }
                  <br></br>
                  <Button className="login-button" >Login</Button>
                  </Col>
                  <Col md="3"/>
                </Row>
              </FormGroup>
              
            </Form>
          </CardBody>
      </Card>
    </div>
    </>
      )}
    </div>
  );
}

export default LoginModal;