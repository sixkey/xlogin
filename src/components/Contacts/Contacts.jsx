import React, { Fragment } from 'react'
import { CopyToClipboard } from "react-copy-to-clipboard";
import {useSiteData} from 'react-static';

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

const Contacts = (props) => {

    var { github = null, email = null } = props;
    
    let { owner } = useSiteData()
    if (owner) {
        if(owner.contacts) {
            var { github = github, email = email } = owner.contacts;
        }
    }

    return (
        <Fragment>
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
                        this.setState({
                            alert: "email copied",
                            alertVisible: true,
                        });
                        setTimeout(() => {
                            this.setState({
                                alertVisible: false,
                            });
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

export default Contacts;
