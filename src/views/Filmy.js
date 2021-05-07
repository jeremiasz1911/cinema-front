import React, { useState, useEffect} from 'react';
import {Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, Spinner} from 'reactstrap';
import axios from 'axios';
import AddFilmForm from '../components/AddFilmForm';
import loadingSpinner from '../components/loadingSpinner';


const Filmy = (props) => {
  const [filmy, setFilmy] = useState([]);

useEffect(() => {
    refresh();
  },[]);

  function refresh(){
    axios.get("http://localhost:8080/api/filmy")
    .then(res => {
      const data = res.data;
      console.log(data);
      setFilmy(data.data);
    }).catch(
      function (error) {
        console.log('Show error notification!')
        return Promise.reject(error)
      }
    ); 
  };

    return(
        <div>
          <AddFilmForm refresh={refresh} buttonLabel="Dodaj nowy film"/>
          <hr/>
          <div className="d-flex flex-wrap justify-content-left">
          {
            (filmy.length<1) ? 
            (<loadingSpinner/>) :
            (
              filmy.map((film,index) => 
                  <Card key={index} className="d-block cube m-2">
                    <CardImg className="image-height" top width="50%" src={"http://localhost:8080/img/filmy/" + film.picture} alt="Film picture" />
                    <CardBody>
                      <CardTitle tag="h5">{film.title}</CardTitle>
                      <CardSubtitle tag="h6" className="mb-2 text-muted">{film.genre}</CardSubtitle>
                      <CardText>{film.description}</CardText>
                      <CardSubtitle tag="h6" className="mb-2 text-muted">{film.year}</CardSubtitle>
                    </CardBody>
                  </Card>  
              ) 
            )
          }
          </div>
      </div>

    )
}
export default Filmy;