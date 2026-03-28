import React from 'react';
import ReactDOM from 'react-dom/client';
class Customer extends React.Component {
  render() {
    return <h2>I am from {this.props.customerApp.country}! </h2>
  }
}

class App extends React.Component {
  render() {
    const customerInfo = {city: 'Bangalore', country: 'India'};
    return (
    <div>
    <h1>Hello</h1>
    <Customer customerApp={customerInfo} />
    </div>
    )
  }
}

const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />)

export default App;
