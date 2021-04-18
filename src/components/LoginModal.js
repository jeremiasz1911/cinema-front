import { useState } from 'react';
import { Form,FormGroup, Label, Input, Card, CardImg, CardBody, Col, Row, Button, FormFeedback} from 'reactstrap';
import logo from '../assets/logo/cinema.png';
import Login from '../utilis/api/auth/login';
import axios from 'axios';


const LoginModal = (props) => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [logged, setLoggedStatus] = useState('');

  function Submit(){
    setLoggedStatus('');
    axios.get(`http://localhost:8080/users/login/user/?` + "login=" + username + "&password=" + password)
    .then(res => {
      const data = res.data;
      setLoggedStatus(true);
    }).catch(
      function (error) {
        setLoggedStatus(false);
        console.log('Show error notification!')
        return Promise.reject(error)
      }
    ); 
    
  }

  return (
    <div>
    {
      logged
      ? false
      : (
    <div className="back-drop">
      <Card className="no-border">
        <CardImg className="cinema-login-logo" top width="100%" src={logo} alt="Card image cap" />
          <CardBody>
            <Form>
              <FormGroup>
                <Row>
                  <Col md="3"/>
                  <Col>
                  <Label  for="exampleEmail"> - Login - </Label>
                  <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" onChange={event => setUsername(event.target.value)}/>
                  <Label for="exampleEmail"> - Hasło - </Label>
                  {
                    logged 
                    ? false
                    (<Input type="password" name="password" id="exampleEmail" placeholder="with a placeholder" onChange={event => setPassword(event.target.value)}/>) 
                    :
                    (
                      <> 
                    <Input invalid type="password" name="password" id="exampleEmail" placeholder="with a placeholder" onChange={event => setPassword(event.target.value)}/>
                    <FormFeedback>Oh noes! that name is already taken</FormFeedback>
                      </>
                      )
                  }
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