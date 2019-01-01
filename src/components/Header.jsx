import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
            }
        }
        const {containerStyle, linkStyle} = style
        return(
            <div style={containerStyle}>
                <Link to="/projects" style={linkStyle}>PROJECTS</Link>
                <Link to="/about" style={linkStyle}>ABOUT ME</Link>
                <Link to="/contact" style={linkStyle}>CONTACT</Link>
            </div>
        )
    }
}

export default Header;