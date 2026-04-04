import React from 'react';
import ReactDOM from 'react-dom/client';

class Student extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: "Aaryan",
      grade:6,
      favourite_color:"green",
      favourtie_subject: "Math"
    };
  }
  render() {
    return(
    <div>
    <h1>Student details</h1>
    <p>My name is {this.state.name}</p>
    <p>I am in grade {this.state.grade}</p>
    <p>My favourite color is{this.state.favourite_color}</p>
    <p>My favourtie subject is {this.state.favourtie_subject}</p>
    </div>
    );
    }
}

const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(<Student />)

export default Student;
