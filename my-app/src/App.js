import React, {Component} from 'react';
import './App.css';
import Yasqe from './Yasqe'


class App extends Component {
    state = {
        isLoading: true,
        users: []
    };

    // async componentDidMount() {
    //     const response = await fetch('/index');
    //     const body = await response.json();
    //     console.log(body);
    //     this.setState({users: body, isLoading: false});
    // }

    render() {
        return (
            <Yasqe/>
        );
    }
}

export default App;
