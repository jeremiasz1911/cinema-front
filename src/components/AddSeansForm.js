import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, InputGroup, InputGroupAddon} from 'reactstrap';
import axios from 'axios';

const AddSeansForm = (props) => {
  const { buttonLabel, className} = props;

  const onSubmit = async (e) => {

    e.preventDefault();
    
    const formData = new FormData(document.getElementById('addMovieForm'));

    axios.post('http://localhost:8080/api/seanse/', formData)
      .then(response => {
        console.log(response);
        props.refresh();
        setModal(!modal);
        toggle();
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div>

      <Button color="info" onClick={toggle}>{buttonLabel}</Button>

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Dodaj nowy film</ModalHeader>
        <ModalBody>
         <form id="addMovieForm" onSubmit={(e) => onSubmit(e)}>

          <FormGroup>
              <Label for="film">Film</Label>
              <Input required type="select" name="film" id="film">
                {
                  props.films.map((i) => 
                    <option value={i.id}>{i.title}</option>
                  )
                }
              </Input>
          </FormGroup>
          <FormGroup>
              <Label for="sala">Sala</Label>
              <Input required type="select" name="sala" id="sala">
                {
                  props.sale.map((i) => 
                    <option value={i.id}>{i.name}</option>
                  )
                }
              </Input>
          </FormGroup>
          <FormGroup>
              <Label for="data">Data</Label>
              <Input required type="datetime-local" name="data" id="data" placeholder="Data"/>
          </FormGroup>
          <FormGroup>
              <Label for="price">Cena <span className="text-secondary"> - np 12.99</span></Label>
               
              <InputGroup>
                <InputGroupAddon addonType="prepend">PLN</InputGroupAddon>
                <Input id="price" name="price" placeholder="0.00" min={0}type="number" step="0.01" />
              </InputGroup>
          </FormGroup>
                <ModalFooter className="m-2">
                  
                    <input id="submitButton" type="submit" className="btn btn-primary" value="Dodaj seans"/>
                    
                  <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
              </form>
            
        </ModalBody>

      </Modal>

    </div>
  );
}

export default AddSeansForm;
