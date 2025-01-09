const Header = (props)=>{
    //console.log("Header :", props);
    const  {name} = props;
    return ( <h2>{name}</h2> )
  }
  
  const Part = (props)=>{
    //console.log("Part :" , props);
    const {part, exercises} = props;
    return (
      <p>
        {part} {exercises}
      </p>
    )
  }
  const Content = (props)=>{
    //console.log("Content :" ,props);
    const {partes}=props;
    //console.log("Content partes:" ,partes);
    return (
     <>
        {partes.map((parte)=>{
        //console.log("partes.map",parte);
         return( <Part key={parte.id}  part={parte.name} exercises={parte.exercises} /> )   
        })}
     </> 
  )
  }
  const Total = (props)=>{
    //console.log("Total :" , props)
    const {partes}=props;
    const total = partes.reduce((acc,parte)=>acc+parte.exercises,0)
    /*let total = 0;
    for (let i=0; i< partes.length;i++){
        total += partes[i].exercises
    }*/
   //console.log("Total",total);
   
    return (  
      <p><strong>Total of {total} exercises </strong></p>
    )
  }
  
  const Course=(props)=>{
    //console.log("Course", props);
    const {name,parts}=props.course;
    //console.log("Course name", name);
    //console.log("Course parts", parts);
    
    return (
      <div>
        <Header name={name} />
        <Content partes={parts} />
        <Total partes={parts} />
      </div>
    )
  }
  
  
export default Course   