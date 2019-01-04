import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';

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
                fontSize: '40px',
                color: 'palevioletred'
            },
            containerStyle:{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '50vh',
            },
            tabContainerStyle:{
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

        const { buttonStyle, nameStyle, containerStyle, homeStyle, tabContainerStyle } = styles

        return(
            <div>
                <MediaQuery query="(max-device-width: 480px)">
                    <div style={containerStyle}>
                        <div style={homeStyle}>
                            <h4>Hi, I'm <span style={nameStyle}>Adedipe Oluwatobi</span></h4>
                            <h4 style={{textAlign: 'justify', width: '90vw'}}>A Front End Developer and Progressive Web App Developer based in lagos. Check out the projects I've worked on. :)</h4>
                        </div>
                        <Link to="/projects"><button style={buttonStyle}>PROJECTS</button></Link>
                    </div>
                </MediaQuery>
                <MediaQuery query="(max-device-width: 768px)">
                    <div style={tabContainerStyle}>
                        <div style={homeStyle}>
                            <h4>Hi, I'm <span style={nameStyle}>Adedipe Oluwatobi</span></h4>
                            <h4 style={{textAlign: 'justify', width: '90vw'}}>A Front End Developer and Progressive Web App Developer based in lagos. Check out the projects I've worked on. :)</h4>
                        </div>
                        <Link to="/projects"><button style={buttonStyle}>PROJECTS</button></Link>
                    </div>
                </MediaQuery>
                <MediaQuery query="(min-device-width: 768px)">
                    This is desktop view
                </MediaQuery>
            </div>
        )
    }
}

export default Home;