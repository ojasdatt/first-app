import React from 'react';
import ReactDOM from 'react-dom/client';

class AY extends React.Component {
   constructor(props) {
   super(props)
   this.state = {
    name: "Aaryan",
    age: 11,
    favourite_color: "Orange",
    favourite_subject: "English",
    favourite_hobby: "Building"
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
   favouriteHobby = () => {
   this.setState({favourite_hobby: "Playing video games"})
   }
   render() {
return(
<div>
<h1>AD/Yd details </h1>
<p>Ad name is {this.state.name}</p>
<p>Ad is  {this.state.age} years old</p>
<p>Ad's favourite color is {this.state.favourite_color}</p>
<p>Ad's favourite subject is {this.state.favourite_subject}</p>
<p>Ad's favourite Hobby is {this.state.favourite_hobby}</p>
<button type="button" onClick={this.Name}>Click me for Yd name!</button>
<button type="button" onClick={this.Age}>Click me for Yd age!</button>
<button type="button" onClick={this.favouriteColor}>Click me for Yd favourite color!</button>
<button type="button" onClick={this.favouriteSubject}>Click me for Yd favourite subject!</button>
<button type="button" onClick={this.favouriteHobby}>Click me for Yd favourite Hobby!</button>
</div>
);
}
}

const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(<AY />)

export default AY;
