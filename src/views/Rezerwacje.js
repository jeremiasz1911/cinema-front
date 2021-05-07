import { useState, useEffect } from 'react';
import AddRezerwacjeForm from '../components/AddRezerwacjeForm';
import axios from 'axios';
import loadingSpinner from '../components/loadingSpinner';

const Rezerwacje = (props) => {
  const [sale, setSale] = useState([]);
  function refresh(){
    console.log('s');
    axios.get("http://localhost:8080/api/sale/")
    .then(res => {
      const data = res.data;
      console.log(data);
      setSale(data.data);
    }).catch(
      function (error) {
        console.log('Show error notification!');
        return Promise.reject(error);
      }
    ); 
  }

  useEffect(()=>{
    refresh(); 
  },[]);

    return(
        <div>
          <AddRezerwacjeForm buttonLabel="Dodaj nową rezerwację" refresh={refresh}/>
          <hr/>
          <div className="d-flex flex-wrap">
          sss
         </div>
        </div>
      )
}
export default Rezerwacje;