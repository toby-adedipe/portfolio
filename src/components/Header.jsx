import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';

class Header extends Component{

    render(){

        const style={
            containerStyle:{
                display: 'flex',
                justifyContent: 'space-between',
                margin: '5vw'
                
            },
            linkStyle:{
                textDecoration: 'none',
                color: '#000'
            },
            bigContainerStyle:{
                display: 'flex',
                justifyContent: 'flex-end',
                margin: '5vw'
            },
            bigLinkStyle:{
                textDecoration: 'none',
                color: '#000',
                marginRight: '5vw'
            }
        }
        const {containerStyle, linkStyle, bigContainerStyle, bigLinkStyle} = style
        return(
            <div>
                <MediaQuery maxDeviceWidth={480}>
                    <div style={containerStyle} id="header-link">
                        <Link to="/projects" style={linkStyle}>PROJECTS</Link>
                        <Link to="/about" style={linkStyle}>ABOUT ME</Link>
                        <Link to="/contact" style={linkStyle}>CONTACT</Link>
                    </div>
                </MediaQuery>
                <MediaQuery minDeviceWidth={480}>
                    <div style={bigContainerStyle} id="header-link">
                        <Link to="/projects" style={bigLinkStyle}>PROJECTS</Link>
                        <Link to="/about" style={bigLinkStyle}>ABOUT ME</Link>
                        <Link to="/contact" style={bigLinkStyle}>CONTACT</Link>
                    </div>
                </MediaQuery>
            </div>
            
        )
    }
}

export default Header;