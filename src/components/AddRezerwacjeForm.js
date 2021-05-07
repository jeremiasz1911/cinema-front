import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input} from 'reactstrap';
import axios from 'axios';
import romanize from '../app/helpers/romanize';

const AddRezerwacjeForm = (props) => {
  const { buttonLabel, className} = props;

  const onSubmit = async (e) => {

    e.preventDefault();
    
    const formData = new FormData(document.getElementById('addSalaForm'));

    axios.post('http://localhost:8080/api/rezerwacje/', formData)
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
  };
  
  return (
    <div>

      <Button color="warning" onClick={toggle}>{buttonLabel}</Button>

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Dodaj nową salę</ModalHeader>
        <ModalBody>
         <form id="addSalaForm" onSubmit={(e) => onSubmit(e)}>

          <FormGroup>
              <Label for="name">Nazwa sali</Label>
              <Input required type="text" name="name" id="name" placeholder="Podaj nazwę sali"/>
          </FormGroup>
          
          <hr/> 
          <Label for="rows">Ustaw ile miejsc jest w każdym rzędzie:</Label>
           
        
          
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

export default AddRezerwacjeForm;
