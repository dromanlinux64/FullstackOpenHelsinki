const Persons=(propes) =>
{    const {personsToShow}=propes
return(
    <>
    {personsToShow.map(person=><p key={person.name}>{person.name} {person.number}</p>)}
    </>
)}

export default Persons
