import React from 'react'
import Hub from 'components/Hub/Hub.jsx'
import { getPathMixed } from 'libs/paths.jsx'

export default function XHub(props) {
    return (<Hub {...props} keyToLink={getPathMixed}/>)
};
