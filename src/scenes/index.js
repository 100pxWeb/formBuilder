import React from "react";
import { BrowserRouter as Router, Route, } from "react-router-dom";
import Builder from "./Builder"

const AppRouter = () => (
    <div>
        <Route path="/" exact component={Builder} />
        {/* <Route path='*' exact={true} component={NotFound} /> */}
    </div>
);

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <AppRouter/>
            </Router>
        )
    }
}