import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


class MyStyling extends React.Component {
   render() {
      return (
      <div>
      <h1 className="myheaderstyle">Hi</h1>
      <p className="mystyle">How are you?</p>
      </div>
      );
   }
}


const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(<MyStyling />)

export default MyStyling;
