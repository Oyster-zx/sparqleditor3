import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import App from './App';
import Questionnaire from "./Questionnaire";

class MainRouter extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route path="/start" component={Questionnaire}/>
                    <Route path="/task/:number" component={App}/>
                </div>
            </Router>
        )
    }
}

export default MainRouter;
