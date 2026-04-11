import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


class MyStyling extends React.Component {
   render() {
      return (
      <div>
      <h1 className="myheaderstyle">Hello</h1>
      <p className="mystyle">My name is Aaryan datt.</p>
      <p className="mystyle">I live in Canada Ontario.</p>
      <p className="mystyle">I go to St.clement school</p>
      <p className="mystyle">My favourite subject is math.</p>
      <p className="mystyle">I am 11 years old, and turn 12 on : 09,11,26</p>
      <p className="mystyle">I am a family of 4. 1 brother,me and my parents!</p>
      <p className="mystyle">My hobbies are coding, building, and playing sports</p>
      <p className="mygreenstyle">I want to become a full-stack software developer when I grow up Ps: I'm Still not sure </p>
      <p className="myredstyle">My favorutie sport is martial arts.</p>
      <p className="myendstyle">Thank you for your time.</p>
      </div>
      );
   }
}

const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(<MyStyling />)

export default MyStyling;
