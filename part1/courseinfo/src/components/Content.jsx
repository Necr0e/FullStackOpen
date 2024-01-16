import Part from "./Part.jsx";

const Content = (props) => {
    const parts = props.parts.map((part, index) =>  <Part key={index} part={part.name} exercises={part.exercises} />)
    return (
        <div>
            {parts}
        </div>
    )
}
export default Content