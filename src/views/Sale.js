import { useState, useEffect } from 'react';
import AddSalaForm from '../components/AddSalaForm';
import Sala from '../components/Sala';
import axios from 'axios';

const Sale = (props) => {
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
          <AddSalaForm buttonLabel="Dodaj nową salę" refresh={refresh}/>
          <hr/>
          <div className="d-flex flex-wrap">
          {
          (sale.length<1) ? 
          (<h2>Nie ma żadnych sali w bazie danych!</h2>) : 
          (
            sale.map((sala,index) => 
              <Sala buttonLabel={sala.name} rows={sala.rows} seatsRows={sala.seatsRows} id={sala.id} refresh={refresh}/>
            )
          )
          }
         </div>
        </div>
      )
}
export default Sale;