import React from 'react';
import ReactDOM from 'react-dom/client';

class Student extends React.Component {
   constructor(props) {
   super(props)
   this.state = {
    name: "Aaryan",
    age: 11,
    favourite_color: "Orange",
    favourite_subject: "Math"
   };
   }
   favourtieColor = () => {
   this.setState({favourite_color: "black"});
   }
   render() {
return(
<div>
<h1>Student details</h1>
<p>My name is {this.state.name}</p>
<p>I am {this.state.age} years old</p>
<p>my favourite color is {this.state.favourite_color}</p>
<p>My favourite subject is {this.state.favourite_subject}</p>
<button type="button" onClick={this.favourtieColor}>Click me</button>
</div>
);
}
}

const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(<Student />)

export default Student;
