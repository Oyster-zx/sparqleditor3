import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    state = {
        isLoading: true,
        users: []
    };

    async componentDidMount() {
        const response = await fetch('/index');
        const body = await response.json();
        console.log(body);
        this.setState({ users: body, isLoading: false });
    }

    render() {
        const {users, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        return (
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to React</h1>
              </header>
              <div className="App-intro">
                <h2>JUG List</h2>
                  {users.map(user =>
                      <div key={user.id}>
                          {user.firstName} {user.lastName}
                      </div>
                  )}
              </div>
            </div>
        );
    }
}

export default App;
