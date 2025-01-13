import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService  from './services/persons'

const {getAll,create,deletePer, update} = personService ;

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    //console.log('effect')
    getAll()
      .then(inicialPersons => {
        //console.log('promise fulfilled')
        setPersons(inicialPersons)
      })
      .catch(err => {
        console.log(`Error getting persons`, err )
      })
  }, [])
  //console.log('render', persons.length, 'persons')



  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)){
      if(confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const person = persons.find(n => n.name === newName);
        const changedPerson = { ...person, number: newNumber };
        update(person.id, changedPerson)
        .then(returnedPerson  => {
          //console.log(returnedPerson)
          const newPersons = [...persons]
          const indicePer = newPersons.findIndex(p => p.id === returnedPerson.id);
          newPersons[indicePer].number = returnedPerson.number;
          setPersons(newPersons);
          setNewName("");
          setNewNumber("");  
        });   
        }
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      create(personObject)
      .then(returnedPerson  => {
        //console.log(returnedPerson)
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");      })
      .catch(err => {
          console.log(`Error adding ${personObject}`, err )
        })
      }
  };

  const handleFiltroChange = (event) => {
    //console.log(event.target.value)
    setFiltro(event.target.value);
  };

  const personsToShow =
    filtro === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().startsWith(filtro.toLowerCase())
        );

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value);
  };

  const handleDeletePer = (person)=>{
    if(window.confirm(`Delete ${person.name}`)){
    deletePer(person.id)
    .then((deletedPer)  => {
      //console.log(`borrado ${deletedPer.name}`)
      setPersons(persons.filter(n => n.id !== person.id))    
    })
    .catch(err =>{
      console.log(`Error deleting...`,err)
    })
  }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filtro={filtro} handleFiltroChange={handleFiltroChange} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} 
               handleDeletePer = {handleDeletePer}/>
    </div>
  );
};

export default App;
