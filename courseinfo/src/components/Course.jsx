const Header = (props) => <h1>{props.course}</h1>

const Content = ({parts}) => (
  console.log(parts),

  <div>

    {parts.map(
      part => <Part key={part.id} part={part} />
    )}

    <Total total={parts.reduce((sum, part) => sum + part.exercises, 0)} />

  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => (
  <p>
    <strong>Number of exercises {props.total}</strong>
  </p>
)

const Course = ({course}) => {
    
      return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
        </div>
      )
}

export default Course