import React, { Fragment, useState } from 'react'
import { CopyToClipboard } from "react-copy-to-clipboard";
import {useSiteData} from 'react-static';
import {Alert} from 'reactstrap';

const ContWrapper = (props) => {
    return props.link 
        ? <div><a href={props.link}>{props.children}</a></div>
        : <div className='a'>{props.children}</div>
}

const Cont = (props) => {
    return (
        <ContWrapper link={props.link}>
            <span className='cont-wrap'>
            <i className={props.icon}></i>
            <span className='contact-text'>{props.children}</span>
            </span>
        </ContWrapper>
    )
}

export default function Contacts(props) {

    const [alertVisible, setAlertVisible] = useState(false); 
    const [alertMessage, setAlertMessage] = useState(null); 

    var { github = null, email = null } = props;
    
    let { owner } = useSiteData()
    if (owner) {
        if(owner.contacts) {
            var { github = github, email = email } = owner.contacts;
        }
    }

    return (
        <Fragment>

            <Alert color='primary' isOpen={alertVisible && alertMessage}> 
                {alertMessage}
            </Alert> 
            <h2>Contacts</h2>
            <div className="contacts">
                { github ? 
                    <Cont link={`https://github.com/${github}`} 
                          icon='fab fa-github'>
                        {github}
                    </Cont>
                : null
                }
                {email ? 
                <CopyToClipboard
                    text={email}
                    onCopy={() => {
                        setAlertMessage('email copied')
                        setAlertVisible(true)
                        setTimeout(() => {
                            setAlertVisible(false)
                        }, 3000);
                    }}>
                    <Cont icon='fas fa-at'>{email}</Cont>
                </CopyToClipboard>
                : null
                }
            </div>
        </Fragment>
    )
}
