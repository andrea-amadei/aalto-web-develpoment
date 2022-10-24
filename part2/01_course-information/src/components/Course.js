export const Header = ({course}) => <h1>{course}</h1>

export const Part = ({ name, exercises }) => <p>{name}: {exercises}</p>

export const Total = ({ parts }) => <p><b>Number of exercises: {parts.reduce((sum, x) => sum + x.exercises, 0)}</b></p>

export const Content = ({parts}) => {
  return (
    <>
      {parts.map(
        (x, i) => <Part key={i} name={x.name} exercises={x.exercises} />
      )}
    </>
  )
}

export const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </>
  )
}

export default Course;
