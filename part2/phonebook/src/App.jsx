import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService  from './services/persons'

const {getAll,create,deletePer,update} = personService ;

const Notification = (propes) => {
  const {message, isSuccess}=propes.message
 
  const successStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 15,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  
  };
  const errorStyle = {
    color: 'red',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  
  };
  const notificationStyle = isSuccess? successStyle: errorStyle;
  if (message === "") {
    return null
  }
  return (
    <div style={notificationStyle} >
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filtro, setFiltro] = useState("");
  const [notificationMessage, setNotificationMessage] = useState({message:"", isSuccess:false})

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
          const newMessage={message:`Updated ${returnedPerson.name}`,isSuccess:true}
          setNotificationMessage(newMessage)
          setTimeout(() => {
            setNotificationMessage({message:"", isSuccess:false})
          }, 5000)
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
        setNewNumber("");      
        const newMessage={message:`Added ${returnedPerson.name}`,isSuccess:true}
        setNotificationMessage(newMessage)
        setTimeout(() => {
          setNotificationMessage({message:"", isSuccess:false})
        }, 5000)
  })
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
      const newMessage={message:`Deleted ${deletedPer.name}`,isSuccess:true}
      setNotificationMessage(newMessage)
      setTimeout(() => {
        setNotificationMessage({message:"", isSuccess:false})
      }, 5000)
    })
    .catch(() => {
      const newMessage={message:`Information of ${person.name} has already been removed from server`,isSuccess:false }
      setNotificationMessage(newMessage)
      setTimeout(() => {
        setNotificationMessage({message:"", isSuccess:false})
      }, 5000)
    setPersons(persons.filter(n => n.id !== person.id))
  })      
}

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
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
