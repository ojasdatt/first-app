import React from 'react';
import ReactDOM from 'react-dom/client';

class AY extends React.Component {
   constructor(props) {
   super(props)
   this.state = {
    name: "Aaryan",
    age: 11,
    favourite_color: "Orange",
    favourite_subject: "English"
   };
   }
   Name = () => {
   this.setState({name: "Yuvaan"});
   }
   Age = () => {
   this.setState({age: "7"})
   }
   favouriteColor = () => {
   this.setState({favourite_color: "blue"});
   }
   favouriteSubject = () => {
   this.setState({favourite_subject: "Math"})
   }
   render() {
return(
<div>
<h1>AD/Yd details </h1>
<p>My name is {this.state.name}</p>
<p>I am {this.state.age} years old</p>
<p>my favourite color is {this.state.favourite_color}</p>
<p>My favourite subject is {this.state.favourite_subject}</p>
<button type="button" onClick={this.Name}>Click me for name!</button>
<button type="button" onClick={this.Age}>Click me for age!</button>
<button type="button" onClick={this.favouriteColor}>Click me for favourite color!</button>
<button type="button" onClick={this.favouriteSubject}>Click me for favourite subject!</button>
</div>
);
}
}

const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(<AY />)

export default AY;
