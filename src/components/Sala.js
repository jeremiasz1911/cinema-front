import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import axios from 'axios';

const Sala = (props) => {

  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  function delet(id){
    axios.delete("http://localhost:8080/api/sale/" + id)
    .then(res => {
      const data = res.data;
      console.log(data);
      props.refresh();
    }).catch(
      function (error) {
        console.log('Show error notification!')
        return Promise.reject(error)
      }
    ); 
  };

  let seatsNumber = props.seatsRows.split(",");
  

  
  
  function createSeat(numberOfSeats){
    let seats = [];
      for (let i = 1; i <= numberOfSeats; i++) {
        seats.push(
          <Button outline key={i} className="seat">{i}</Button>
        )
      }
    return seats;
  }
    
  console.log(seatsNumber);
  
  return (
    <div className="m-1 d-flex">  
    <Button outline color="danger" className="remove" onClick={()=>delet(props.id)}>X</Button>
    <Button color="primary" className="sala" outline onClick={toggle}>{props.buttonLabel}</Button>
    
    <Modal isOpen={modal} toggle={toggle} className="sale-view-modal">
        
        <ModalHeader toggle={toggle}>Sala {props.buttonLabel} </ModalHeader>
        <ModalBody className="p-3 d-flex justify-content-center flex-wrap">
          {
            seatsNumber.map((i)=>
            <div className="d-block w-100 text-center flex-wrap">
             {createSeat(i)}
            </div>
            
            )
          }
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Sala;
