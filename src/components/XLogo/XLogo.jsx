////// IMPORTS //////

//// EXTERNAL ////

// React
import React, { Component, Fragment } from "react";
import {useSiteData} from "react-static";

// Reactstrap
import { Container } from "reactstrap";

//// INTERNAL ////

import "./XLogo.css";

////// COMPONENT //////

function generatePoints(code, randomness = 0) {
    var points = [];

    for (var i = 0; i < code.length; i++) {
        var number = parseInt(code[i]);

        if (number == 0) {
            number = 5;
            points.push([20 + 1.5 * 30, 20 + (2 - 0.5) * 30]);
        } else {
            number -= 1;

            var y = Math.floor(number / 3);
            var x = number % 3;
            points.push([20 + x * 30, 20 + (2 - y) * 30]);
        }
    }

    if (!randomness) return points;

    for (var i = 0; i < points.length; i++) {
        points[i] = [
            points[i][0] + Math.random() * randomness * 2 - randomness,
            points[i][1] + Math.random() * randomness * 2 - randomness,
        ];
    }

    return points;
}

function  lineFromPoints(points) {
    var res = "";

    for (var i = 0; i < points.length; i++) {
        var point = points[i];

        var char = i == 0 ? "M" : "L";
        res += char + point[0] + "," + point[1] + " ";
    }

    return res;
}

export default function XLogo(props) {
    var { code, size = "5em", className } = props;
    const { owner } = useSiteData()
    if (owner) {
        code=owner.uco
    }

    const points = generatePoints(code);
    const onHover = generatePoints(code, 10);

    const duration = "300ms";

    return (
        <div
            id=""
            className={className}
            style={{ width: size, height: size }}
        >
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                <rect
                    id="xlogo"
                    x="0"
                    y="0"
                    width="100"
                    height="100"
                    style={{ fill: "white" }}
                ></rect>
                <path
                    d={lineFromPoints(points)}
                    style={{
                        fill: "transparent",
                        strokeWidth: 3,
                        stroke: "black",
                        pointerEvents: "none",
                    }}
                >
                    <animate
                        attributeName="d"
                        values={
                            lineFromPoints(points) +
                            " ; " +
                            lineFromPoints(onHover)
                        }
                        dur={duration}
                        begin="xlogo.mouseover"
                        fill="freeze"
                        calcMode="spline"
                        keyTimes="0; 1"
                        keySplines="0.5 0 0.5 1"
                    />
                    <animate
                        attributeName="d"
                        values={
                            lineFromPoints(onHover) +
                            ";" +
                            lineFromPoints(points)
                        }
                        dur={duration}
                        begin="xlogo.mouseout"
                        fill="freeze"
                        calcMode="spline"
                        keyTimes="0; 1"
                        keySplines="0.5 0 0.5 1"
                    />
                </path>
                {points.map((ellipse, index) => (
                    <ellipse
                        key={index}
                        cx={ellipse[0]}
                        cy={ellipse[1]}
                        rx={5}
                        ry={5}
                        style={{ fill: "black", pointerEvents: "none" }}
                    >
                        <animate
                            attributeName="cx"
                            values={
                                points[index][0] + ";" + onHover[index][0]
                            }
                            dur={duration}
                            begin="xlogo.mouseover"
                            fill="freeze"
                            calcMode="spline"
                            keyTimes="0; 1"
                            keySplines="0.5 0 0.5 1"
                        />
                        <animate
                            attributeName="cx"
                            values={
                                onHover[index][0] + ";" + points[index][0]
                            }
                            dur={duration}
                            begin="xlogo.mouseout"
                            fill="freeze"
                            calcMode="spline"
                            keyTimes="0; 1"
                            keySplines="0.5 0 0.5 1"
                        />
                        <animate
                            attributeName="cy"
                            values={
                                points[index][1] + ";" + onHover[index][1]
                            }
                            dur={duration}
                            begin="xlogo.mouseover"
                            fill="freeze"
                            calcMode="spline"
                            keyTimes="0; 1"
                            keySplines="0.5 0 0.5 1"
                        />
                        <animate
                            attributeName="cy"
                            values={
                                onHover[index][1] + ";" + points[index][1]
                            }
                            dur={duration}
                            begin="xlogo.mouseout"
                            fill="freeze"
                            calcMode="spline"
                            keyTimes="0; 1"
                            keySplines="0.5 0 0.5 1"
                        />
                    </ellipse>
                ))}
            </svg>
        </div>
    );
}
