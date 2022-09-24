export const Header = ({course}) => <h1>{course}</h1>

export const Part = ({name, exercises}) => <p>{name} {exercises}</p>

export const Total = ({parts}) => <p>Number of exercises {parts.reduce((sum, x) => sum + x.exercises, 0)}</p>

export const Content = ({parts}) => {
  return (
    <>
      {parts.map(
        (x, i) => <Part key={i} name={x.name} exercises={x.exercises} />
      )}
    </>
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
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )
}

export default App
