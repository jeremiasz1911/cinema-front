import axios from 'axios';


const Login = (login,password) => { 
axios.get(`http://localhost:8080/users/login/user/?` + "login=" + login + "&password=" + password)
      .then(res => {
        const data = res.data;
        return true;
      }); 
};

export default Login;