import React, { Component } from 'react';
import Header from './Header';
import MediaQuery from 'react-responsive';


class Contact extends Component{

    render(){

        const styles={
            imageStyle:{
                width: '15vw',
                margin: '5vw'
            },
            containerStyle:{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '30vh'
            },
            tabimageStyle:{
                width: '5vw',
                margin: '5vw'
            },
            tabcontainerStyle:{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '30vh'
            }
        }

        const {imageStyle, containerStyle, tabcontainerStyle, tabimageStyle} = styles
        return(
            <div>
                <Header />
                <MediaQuery maxDeviceWidth={480}>
                    <div style={containerStyle}>
                        <p>Say Hi</p>
                        <p>twizzytobby@gmail.com</p>
                        <div>
                            <a href="https://twitter.com/toby_adedipe"><img style={imageStyle} src="/images/twitter.png" alt="twitter-icon" /></a>
                            <a href="https://medium.com/@toby_adedipe"><img style={imageStyle}  src="/images/medium.png" alt="medium-icon" /></a>
                            <a href="https://www.linkedin.com/in/oluwatobi-adedipe/"><img style={imageStyle}  src="/images/linkedin.png" alt="linkedin-icon" /></a>
                            <a href="https://github.com/toby-adedipe"><img style={imageStyle}  src="/images/github.png" alt="github-icon" /></a>
                        </div>
                    </div>
                </MediaQuery>
                <MediaQuery minDeviceWidth={480}>
                <div style={tabcontainerStyle}>
                    <p>Say Hi</p>
                    <p>twizzytobby@gmail.com</p>
                    <div>
                        <a href="https://twitter.com/toby_adedipe"><img style={tabimageStyle} src="/images/twitter.png" alt="twitter-icon" /></a>
                        <a href="https://medium.com/@toby_adedipe"><img style={tabimageStyle}  src="/images/medium.png" alt="medium-icon" /></a>
                        <a href="https://www.linkedin.com/in/oluwatobi-adedipe/"><img style={tabimageStyle}  src="/images/linkedin.png" alt="linkedin-icon" /></a>
                        <a href="https://github.com/toby-adedipe"><img style={tabimageStyle}  src="/images/github.png" alt="github-icon" /></a>
                    </div>
                    
                </div>
                </MediaQuery>
            </div>

        )
    }
}

export default Contact;