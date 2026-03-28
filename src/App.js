import React from 'react';
import ReactDOM from 'react-dom/client';
class Customer extends React.Component {
  render() {
    return <h2>I am from {this.props.city}! </h2>
  }
}

class App extends React.Component {
  render() {
    return (
    <div>
    <h1>Hello</h1>
    <Customer city="India" />
    </div>
    )
  }
}

const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />)

export default App;
