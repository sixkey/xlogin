
import "bootstrap/dist/css/bootstrap.min.css";

import React, { Component } from 'react'
import {Root, Routes} from "react-static";

import "./App.css";
import "./components/ContentRendering/nhi.css";
import "./index.css";

class App extends Component {
    render() {
        return (
            <Root>
                <div className="content">
                    <React.Suspense fallback={<em>Loading...</em>}>
                        <Routes path="*" />
                    </React.Suspense>
                </div>
            </Root>
        );
    }
}

export default App;
