
import "bootstrap/dist/css/bootstrap.min.css";

import React, { Component } from 'react'
import {Root, Routes} from "react-static";
import Footer from './components/Footer/Footer';

import "./App.css";
import "./components/ContentRendering/nhi.css";
import "./index.css";

class App extends Component {
    render() {
        return (
            <Root>
                <div className="app-body">
                    <React.Suspense fallback={null}>
                        <Routes path="*" />
                    </React.Suspense>
                </div>
                <Footer/>
            </Root>
        );
    }
}

export default App;
