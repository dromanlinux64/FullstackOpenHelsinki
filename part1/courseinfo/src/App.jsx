const Header = (courses)=>{
  console.log("Header :", courses)
  return (
  <div>    
  <h1>{courses.course.name}</h1>
  </div>
  )
}

const Part = (parts)=>{
  console.log("Part :" , parts)
  return (
    <p>
      {parts.part} {parts.exercises}
    </p>
  )
}
const Content = (courses)=>{
  console.log("Content :" ,courses)
  return (
   <>
      <Part part={courses.partes.parts[0].name} exercises={courses.partes.parts[0].exercises}/>    
      <Part part={courses.partes.parts[1].name} exercises={courses.partes.parts[1].exercises} />    
      <Part part={courses.partes.parts[2].name} exercises={courses.partes.parts[2].exercises} />    
    </> 
)
}
const Total = (exers)=>{
  console.log("Total :" , exers)
  return (  
    <p>Number of exercises {exers.partes.parts[0].exercises + exers.partes.parts[1].exercises + exers.partes.parts[2].exercises}</p>
  )
}

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content partes={course} />
      <Total partes={course} />      
    </div>
  )
}

export default App
