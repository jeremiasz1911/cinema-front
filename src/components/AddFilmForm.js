import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input} from 'reactstrap';
import axios from 'axios';

const AddFilmForm = (props) => {
  const { buttonLabel, className} = props;

  const onSubmit = async (e) => {

    e.preventDefault();
    
    const formData = new FormData(document.getElementById('addMovieForm'));

    axios.post('http://localhost:8080/api/filmy/upload/', formData)
      .then(response => {
        console.log(response);
        props.refresh();
        setModal(!modal);
        
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div>

      <Button color="danger" onClick={toggle}>{buttonLabel}</Button>

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Dodaj nowy film</ModalHeader>
        <ModalBody>
         <form id="addMovieForm" onSubmit={(e) => onSubmit(e)}>

          <FormGroup>
              <Label for="title">Tytuł</Label>
              <Input required type="text" name="title" id="title" placeholder="Podaj tytuł filmu"/>
          </FormGroup>
          <FormGroup>
              <Label for="genre">Gatunek</Label>
              <Input required type="text" name="genre" id="genre" placeholder="Podaj gatunek filmu"/>
          </FormGroup>
          <FormGroup>
              <Label for="description">Opis filmu</Label>
              <Input required type="text" name="description" id="description" placeholder="Opisz film"/>
          </FormGroup>
          <FormGroup>
              <Label for="year">Rok produkcji</Label>
              <Input required type="number" name="year" id="year" placeholder="Podaj rok produkcji filmu"/>
          </FormGroup>
          <FormGroup>
              <Label for="director">Reżyser</Label>
              <Input required type="text" name="director" id="director" placeholder="Podaj imię i nazwisko reżysera"/>
          </FormGroup>
          <FormGroup>
              <Label for="duration">Czas trwania</Label>
              <Input required type="number" name="duration" id="duration" placeholder="Podaj ile minut trwa film" />
          </FormGroup>
          <FormGroup>
              <Label required for="img">Wybierz zdjęcie filmu (PNG) </Label>

          </FormGroup>

              <Input type="file" name="file" required />
                <ModalFooter className="m-2">
                  
                    <input id="submitButton" type="submit" className="btn btn-primary" value="Dodaj film"/>
                    
                  <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
              </form>
            
        </ModalBody>

      </Modal>

    </div>
  );
}

export default AddFilmForm;
