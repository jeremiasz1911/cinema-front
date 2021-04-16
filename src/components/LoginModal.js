import { useState } from 'react';
import { Form,FormGroup, Label, Input, Card, CardImg, CardBody, Col, Row, Button} from 'reactstrap';
import logo from '../assets/logo/cinema.png';
import Login from '../utilis/api/auth/login';
import axios from 'axios';


const LoginModal = (props) => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [logged, setLoggedStatus] = useState(false);

  const [modal, setModal] = useState(false);

  function Submit(){
    axios.get(`http://localhost:8080/users/login/user/?` + "login=" + username + "&password=" + password)
    .then(res => {
      const data = res.data;
      setLoggedStatus(true);
    }); 
    
  }

  return (
    <div>
    {
      logged
      ? false
      : (
    <div className="back-drop">
      <Card className="no-border">
        <CardImg top width="100%" src={logo} alt="Card image cap" />
          <CardBody>
            <Form>
              <FormGroup>
                <Row>
                  <Col md="3"/>
                  <Col>
                  <Label  for="exampleEmail"> - Login - </Label>
                  <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" onChange={event => setUsername(event.target.value)}/>
                  <Label for="exampleEmail"> - Hasło - </Label>
                  <Input type="password" name="password" id="exampleEmail" placeholder="with a placeholder" onChange={event => setPassword(event.target.value)}/>
                  <br></br>
                  <Button className="login-button" onClick={()=>Submit()}>Login</Button>
                  </Col>
                  <Col md="3"/>
                </Row>
              </FormGroup>
              
            </Form>
          </CardBody>
      </Card>
    </div>
      )}
    </div>
  );
}

export default LoginModal;