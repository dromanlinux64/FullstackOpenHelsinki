const Header = (course)=>{
  return (
  <div>    
  <h1>{course.name}</h1>
  </div>
  )
}

const Part = (parts)=>{
  return (
    <p>
      {parts.part} {parts.exercises}
    </p>
  )
}
const Content = (parts)=>{
  console.log(parts)
  return (
    <>
      <Part part={parts.partes[0].part} exercises={parts.partes[0].exercises}/>    
      <Part part={parts.partes[1].part} exercises={parts.partes[1].exercises} />    
      <Part part={parts.partes[2].part} exercises={parts.partes[2].exercises} />    
    </>
  )
}
const Total = (exercises)=>{
  return (  
    <p>Number of exercises {exercises.exercises1 + exercises.exercises2 + exercises.exercises3}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const courses = [
    { part: 'Fundamentals of React', exercises: 10 },
    { part: 'Using props to pass data', exercises: 7 },
    { part: 'State of a component', exercises: 14 },

  ]

  return (
    <div>
      <Header name={course} />
      <Content partes={courses}  />
      <Total exercises1={courses[0].exercises} exercises2={courses[1].exercises} exercises3={courses[2].exercises} />      
    </div>
  )
}

export default App
