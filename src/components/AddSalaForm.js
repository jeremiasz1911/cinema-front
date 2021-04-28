import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input} from 'reactstrap';
import axios from 'axios';
import romanize from '../app/helpers/romanize';

const AddSalaForm = (props) => {
  const { buttonLabel, className} = props;

  const onSubmit = async (e) => {

    e.preventDefault();
    
    const formData = new FormData(document.getElementById('addSalaForm'));

    axios.post('http://localhost:8080/api/sale/', formData)
      .then(response => {
        console.log(response);
        setModal(!modal);
        props.refresh();
      })
      .catch(error => {
        console.log(error);
      });
  };

  

  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
    setSeatsRows(0);
  };

  const [seatsRows, setSeatsRows] = useState(2);

  const seatRowsInput= [];
  if(seatsRows<101){
  for (var i = 1; i-1 < seatsRows; i++) {
      seatRowsInput.push(
      <div key={i} className="m-1">
        <div className="text-center">
        <Label for="seat">{romanize(i)}</Label>
        </div>
        <Input  name={"row_" + i} id={"row_" + i} type="number" defaultValue="10" min="0" max="999"className="p-2-2">
           {0}{i}
        </Input>
      </div>
      );
  } 
  }
  
  
  return (
    <div>

      <Button color="primary" onClick={toggle}>{buttonLabel}</Button>

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Dodaj nową salę</ModalHeader>
        <ModalBody>
         <form id="addSalaForm" onSubmit={(e) => onSubmit(e)}>

          <FormGroup>
              <Label for="name">Nazwa sali</Label>
              <Input required type="text" name="name" id="name" placeholder="Podaj nazwę sali"/>
          </FormGroup>
          <FormGroup>
              <Label for="rows">Ilość rzędów (max : 100)</Label>
              <Input required type="number" name="rows" id="rows" placeholder="Podaj ilość rzędów" min="1" max="100" onChange={(e)=>setSeatsRows(e.target.value )}/>
          </FormGroup>
          <hr/> 
          <Label for="rows">Ustaw ile miejsc jest w każdym rzędzie:</Label>
            <div className="d-flex flex-wrap justify-content-center">
              {seatsRows ? ("") : (<h4 className="text-secondary">0 rzędów</h4>)}
            {seatRowsInput}
            </div> 
        
          
                <ModalFooter className="m-2">
                  
                    <input id="submitButton" type="submit" className="btn btn-primary" value="Dodaj salę"/>
                    
                  <Button color="secondary" onClick={toggle}>Anuluj</Button>
                </ModalFooter>
              </form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default AddSalaForm;
