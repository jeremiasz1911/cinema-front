import {Card,Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem ,CardBody, CardTitle, CardSubtitle, Button, CardImg} from 'reactstrap';
import AddSeansForm from '../components/AddSeansForm';
import loadingSpinner from '../components/loadingSpinner';
import React, { useState, useEffect} from 'react';
import { toDate, toTime } from '../app/helpers/toDate';
import axios from 'axios';
//http://data.fixer.io/api/latest?access_key=2d648400e8b13e4d0fb213ef517beebf&format=1 api zewnetrzne
const Seanse = (props) => {

  const [seanse, setSeanse] = useState([]);
  const [films, setFilms] = useState([]);
  const [sale, setSale] = useState([]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  const [lastClicked, setLastClicked] = useState("Dzień tygodnia");
  const [filmId, setFilmId] = useState(null);

  let filmy = "http://localhost:8080/api/filmy";
  let sales = "http://localhost:8080/api/sale";

  const requestOne = axios.get(filmy);
  const requestTwo = axios.get(sales);
  


  useEffect(() => {
    refresh();
  },[]);
  
  function refresh(){
    axios.all([requestOne, requestTwo])
    .then(
    axios.spread((...responses) => {
      const responseOne = responses[0];
      const responseTwo = responses[1];

     
      setFilms(responseOne.data.data)
      setSale(responseTwo.data.data)
      doFilterTodayFuture();
      // use/access the results
    })
  ).catch(
      function (error) {
        console.log('Show error notification!');
        return Promise.reject(error)
      }
    ); 
  }

  function doFilterNextDays(day,zero){
    axios.get("http://localhost:8080/api/seanseNextDays?one=" + (day-1) +  "&two=" + day + "&filmId=" + filmId)
    .then(res => {
      console.log(filmId);
      setSeanse(res.data.data);
      if(zero===true){setLastClicked(getDay(day-1))}
      else {setLastClicked("Dzień tygodnia")}

    }).catch(
      function (error) {
        console.log('Show error notification!');
        return Promise.reject(error);
      }
    ); 
  }
  
  function doFilterTodayFuture(){
    axios.get("http://localhost:8080/api/seanseTodayFuture?filmId=" + filmId)
    .then(res => {
      setLastClicked("Dzień tygodnia");
      setSeanse(res.data.data)
    }).catch(
      function (error) {
        console.log('Show error notification!')
        return Promise.reject(error)
      }
    ); 
  }
  function getDay(n){
    let today = new Date();
    let tomorrow = new Date();

    tomorrow.setDate(today.getDate() + n);
    let day = tomorrow.toString().substring(8,10);
    tomorrow = tomorrow.toString().substring(0,3);
    

    console.log(day);

    switch(tomorrow) {
      case "Mon":
        return "Poniedziałek " + day;
      case "Tue":
        return "Wtorek " + day;
      case "Wed":
        return "Środa " + day;
      case "Thu":
        return "Czwartek " + day;
      case "Fri":
        return "Piątek " + day;
      case "Sat":
        return "Sobota " + day;
      case "Sun":
        return "Niedziela " + day;
      default:
        return "XXX";
    }
  }

    return(
        <div>
          <div className="d-flex w-100">
          <AddSeansForm buttonLabel="Dodaj nowy seans" films={films} sale={sale} refresh={refresh}/>
          
            <div className="d-flex ml-auto " data-toggle="buttons">
            <Input className="width-auto mr-1 text-info"type="select" name="film" id="film" onChangeCapture={(event)=>setFilmId(event.target.value)} onClick={(event)=>setFilmId(event.target.value)}>
                      <option value={null}>Żaden</option>
                  {
                    films.map((i) => 
                      <option value={i.id}>{i.title}</option>
                    )
                  }
              </Input>
              <Button outline color="info" className="mr-1" onClick={() => doFilterTodayFuture()}>Aktualnie</Button>
              <Button outline color="info" className="mr-1" onClick={() => doFilterNextDays(1)}>Dzisiaj</Button>
              <Button outline color="info" className="mr-1" onClick={() => doFilterNextDays(2)}>Jutro</Button>
              
              <Dropdown isOpen={dropdownOpen} toggle={toggle} >
                <DropdownToggle color="info" className="width10em" outline>
                  {lastClicked || null}
                </DropdownToggle>
                <DropdownMenu className="mr-3">
                  <DropdownItem header>Dni tygodnia</DropdownItem>
                  <DropdownItem onClick={()=>doFilterNextDays(3,true)}>{getDay(2)}</DropdownItem>
                  <DropdownItem onClick={()=>doFilterNextDays(4,true)}>{getDay(3)}</DropdownItem>
                  <DropdownItem onClick={()=>doFilterNextDays(5,true)}>{getDay(4)}</DropdownItem>
                  <DropdownItem onClick={()=>doFilterNextDays(6,true)}>{getDay(5)}</DropdownItem>
                  <DropdownItem onClick={()=>doFilterNextDays(7,true)}>{getDay(6)}</DropdownItem>
                </DropdownMenu>
              </Dropdown>

              
            </div>
          </div>
        <hr/>
        {
          seanse.length<1 ? 
          (<loadingSpinner/>) :
          (seanse.map((seans) =>
              <Card>
              <CardBody className="d-flex align-items-center list-seans">
              <CardImg className="image-seans" src={"http://localhost:8080/img/filmy/" + films[seans.filmId-1].picture} alt="Card image cap" />
              <div className="d-flex m-1 w-100">
                <div>
                  <CardTitle tag="h5" className="text-nowrap">{films[seans.filmId-1].title}</CardTitle>
                  <h6 className="text-nowrap" outline color="info">{seans.price.toFixed(2)} PLN</h6>
                </div>
                <div className="w-100">
                  <CardSubtitle tag="h6" className="mb-2 font-weight-bold text-right">{toDate(seans.dataSeansu)}</CardSubtitle>
                  <CardSubtitle tag="h3" className="mb-2 font-weight-bold text-right">{toTime(seans.dataSeansu)}</CardSubtitle>
                  <CardSubtitle tag="h6" className="text-muted text-right m-2">{sale[seans.salaId-1].name}</CardSubtitle>
                </div>
              </div>
              </CardBody>
            </Card>
          ))
        }
          
        </div>
    )
}
export default Seanse;