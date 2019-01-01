import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Home extends Component{

    render(){
        const styles={
            buttonStyle:{
                border: '1px solid black',
                width: '30vw',
                height: '40px',
                fontSize: '18px',
                background: 'transparent'
            },
            nameStyle:{
                fontFamily: ['Dancing Script', 'cursive'],
                fontSize: '40px'
            },
            containerStyle:{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '50vh'
            },
            homeStyle: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }
        }

        const { buttonStyle, nameStyle, containerStyle, homeStyle } = styles

        return(
            <div style={containerStyle}>
                <div style={homeStyle}>
                    <h2 style={nameStyle}>Adedipe Oluwatobi</h2>
                    <h4 style={{margin: 0}}>Front End Developer</h4>
                    <h4>Progressive Web App Developer</h4>
                </div>
                <Link to="/projects"><button style={buttonStyle}>PROJECTS</button></Link>
            </div>
        )
    }
}

export default Home;