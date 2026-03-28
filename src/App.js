import React from 'react';
import ReactDOM from 'react-dom/client';

class Food extends React.Component {
  render() {
    return <h2>I am {this.props.type} type Food. People love me. I am pizza</h2>
  }
}

class App extends React.Component {
  render() {
    const mycode = <Food type="Continental" />;
    return (
    <div>
    <h1>Hello</h1>
    {mycode}
    </div>
    )
  }
}

const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />)

export default App;
