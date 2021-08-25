import "./App.css";
import "./index.css";
import "./components/ContentRendering/nhi.css";

import Footer from "components/Footer/Footer";
import Router from "components/Router/Router";
import React, { Component } from 'react'

import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="app-body">
                    <BrowserRouter>
                        <Route component={Router} />
                    </BrowserRouter>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

export default App;
