import React from 'react';
import ReactDOM from 'react-dom/client';

class MyStyling extends React.Component {
   render() {
      const myheaderstyle = {
         color: "orange",
         backgroundColor: "blue",
         fontFamily: "Arial",
         padding: "6 px"
      };

const mystyle = {
   color:"red",
   backgroundColor: "pink",
   fontFamily: "Times New Roman",
   padding: "11 px"
};

return(
<div>
<h1 style={myheaderstyle}>Hi</h1>
<p style={mystyle}>How are you?</p>
</div>
);
   }
}

const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(<MyStyling />)

export default MyStyling;
