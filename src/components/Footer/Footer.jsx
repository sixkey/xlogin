////// IMPORTS //////

//// EXTERNAL ////

// Emoji
import emoji from "react-easy-emoji";

// React
import React, { Component, Fragment } from "react";

// Reactstrap
import { Container } from "reactstrap";

//// INTERNAL ////
import "./Footer.css";
////// COMPONENT //////

var FOOTERS = [
    <span>made with love {emoji("❤️")}</span>, 
    <span>holy c &gt; c &gt; cpp</span>,
    <span>if only there was a different footer each time you refresh</span>,
    <span>imagine a world, in which dfs is bfs, only with stack</span>,
    <span>imagine a world, in which it is okay, to traverse graph in exponential time</span>,
    <span>{`{ "status": 500, "error": "gentoo kernel is compiling, sowwy" }`}</span>,
    <span>Webdev bad, yet I have web. Curious!</span>,
    <span>Uncaught IndexError: index out of bounds in 'FOOTERS[1345]', 'FOOTER' only contains 1345 items.</span>,
    <span>the logo moves /o\</span>,
    <div><div onClick={() => {
        var counter = true; 
        var dancersRight = "/o/ /o/ /o/ /o/ /o/ /o/ /o/ /o/ /o/ /o/ /o/ /o/ /o/" 
        var dancersLeft= "\\o\\ \\o\\ \\o\\ \\o\\ \\o\\ \\o\\ \\o\\ \\o\\ \\o\\ \\o\\ \\o\\ \\o\\ \\o\\" 
        setInterval(() => {
            counter = !counter; 
            var dancersBody= document.getElementById('scic-dancers')
            dancersBody.innerHTML= counter ? dancersLeft : dancersRight
        }, 1000)
    }} >{emoji("🎵")}{emoji("🎵")}{emoji("🎵")} She's like a dream, Salted caramel ice cream {emoji("🎵")}{emoji("🎵")}{emoji("🎵")}</div><div id="scic-dancers"></div></div>,
    <span>{"𒀭𒅆𒊒𒍪𒍪  < Lamashtu < "}{emoji("✝")}</span>
]

class Footer extends Component {
    //// LIFECYCLE ////
    //// RENDERING ////
    render() {
        return <div className="w100 py-5 footer">{this.randomFooter()}</div>;
    }

    randomFooter = () => {
        const value = Math.floor(Math.random() * FOOTERS.length);
        return FOOTERS[value]
    };
    //// MISC ////
}

////// EXPORTS //////

export default Footer;
