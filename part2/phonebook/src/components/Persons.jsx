const Persons=(propes) =>
{    const {personsToShow,handleDeletePer}=propes
return(
    <>
    {personsToShow.map(person=><div key={person.name}>{person.name} {person.number} <button onClick={
        ()=>handleDeletePer(person)}>
        delete</button>
    </div>)}
    </>
)}

export default Persons
