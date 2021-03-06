import React, { Component } from 'react';
import Header from './Header';
import MediaQuery from 'react-responsive';

class About extends Component{

    render(){
        const styles={
            containerStyle:{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            },
            bigContainerStyle:{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            },
            divStyle:{
                display: 'flex',
            },
            subTopic:{
                width: '25vw',
                marginLeft: '5vw',
                display: 'flex',
                flexDirection: 'column'
            },
            centerStyle:{
                textAlign: 'justify',
                width: '90vw',
            },
            headerStyle:{
                borderTop: '2px solid #000',
                borderBottom: '2px solid #000',
                fontWeight: 700,
                width: '100vw',
                textAlign: 'center'
            },
            bigHeaderStyle:{
                borderTop: '2px solid #000',
                borderBottom: '2px solid #000',
                fontWeight: 700,
                textAlign: 'center'
            },
            topicStyle:{
                borderBottom: '1px solid #000',
                fontWeight: 'bold'
            }
        }

        const { containerStyle, centerStyle,headerStyle, topicStyle,bigContainerStyle, bigHeaderStyle, divStyle, subTopic } = styles
        return(
            <div>
                <Header />
                <MediaQuery query="(max-device-width: 480px)">
                    <div style={containerStyle}>
                        <h4 style={centerStyle}>I'm Adedipe Oluwatobi, a front-end Web Developer and mobile-web specialist(I build majorly for mobile) this includes making sure my web applications work in areas with slow network or even offline and making sure the applications are responsive.</h4>
                        <div>
                            <div style={containerStyle}>
                                <h1 style={headerStyle}>SPECIALTIES</h1>
                                <div style={containerStyle}>
                                    <img src="/images/frontend.png" style={{width:'50vw'}} alt="frontend"/>
                                    <h3 style={topicStyle}>Front End Web Developement</h3>
                                    <h4 style={centerStyle}> I also build the front end of web-applications using <span style={{color: "palevioletred"}}>HTML, CSS </span>and Front-End Javacript Frameworks like <span style={{color: "palevioletred"}}>React.Js</span> and <span style={{color: "palevioletred"}}>Next.js</span>.</h4>
                                </div>
                                <div style={containerStyle}>
                                    <img src="/images/responsive.png" style={{width:'50vw'}} alt="responsive"/>
                                    <h3 style={topicStyle}>Responsive Web Design</h3>
                                    <h4 style={centerStyle}>I have experience in designing and building responsive web applications. I designed this portfolio site myself.</h4>
                                </div>
                                <div style={containerStyle}>
                                    <img src="/images/pwa.png" alt="pwa" style={{width:'50vw'}} />
                                    <h3 style={topicStyle}>Progressive Web Applications</h3>
                                    <h4 style={centerStyle}>I also develop offline web-applications that function with little or no network connectivity. Don't believe me? Turn of your data and refresh this page</h4>
                                </div>
                            </div>
                            <div style={containerStyle}>
                                <h1 style={headerStyle}>SKILLS</h1>
                                <h3>LANGUAGES</h3>
                                <p style={{color: "palevioletred"}}>JavaScript</p>
                                <p style={{color: "#005b96"}}>Python</p>
                                <p style={{color: "palevioletred"}}>Ruby</p>
                                <p style={{color: "#005b96"}}>HTML</p>
                                <p style={{color: "palevioletred"}}>CSS</p>

                                <h3>FRAMEWORKS</h3>
                                <p style={{color: "#005b96"}}>React.Js</p>
                                <p style={{color: "palevioletred"}}>Next.Js</p>
                                <p style={{color: "#005b96"}}>Node.Js</p>
                                <p style={{color: "palevioletred"}}>Express</p>
                                <p style={{color: "#005b96"}}>Ruby on Rails</p>
                            </div>
                        </div>
                    </div>
                </MediaQuery>


                <MediaQuery query="(min-device-width: 480px)">
                <div style={containerStyle}>
                        <h4 style={centerStyle}>I'm Adedipe Oluwatobi, a front-end Web Developer and mobile-web specialist(I build majorly for mobile) this includes making sure my web applications work in areas with slow network or even offline and making sure the applications are responsive.</h4>
                        <div>
                            <div style={bigContainerStyle}>
                                <div>
                                    <h1 style={bigHeaderStyle}>SPECIALTIES</h1>
                                </div>
                                <div style={divStyle}>
                                    <div style={subTopic}>
                                        <img src="/images/frontend.png" style={{width:'25vw'}} alt="frontend"/>
                                        <h3 >Front End Web Developement</h3>
                                        <h4 style={{textAlign: 'justify'}}> I also build the front end of web-applications using <span style={{color: "palevioletred"}}>HTML, CSS </span>and Front-End Javacript Frameworks like <span style={{color: "palevioletred"}}>React.Js</span> and <span style={{color: "palevioletred"}}>Next.js</span>.</h4>
                                    </div>
                                    <div style={subTopic}>
                                        <img src="/images/responsive.png" style={{width:'25vw'}} alt="responsive"/>
                                        <h3 style={{marginTop: '10vh'}}>Responsive Web Design</h3>
                                        <h4 style={{textAlign: 'justify'}}>I have experience in designing and building responsive web applications. I designed this portfolio site myself.</h4>
                                    </div>
                                    <div style={subTopic}>
                                        <img src="/images/pwa.png" alt="pwa" style={{width:'25vw'}} />
                                        <h3 >Progressive Web Applications</h3>
                                        <h4 style={{textAlign: 'justify'}}>I also develop offline web-applications that function with little or no network connectivity. Don't believe me? Turn of your data and refresh this page</h4>
                                    </div>
                                </div>
                            </div>
                            <div style={containerStyle}>
                                <h1 style={bigHeaderStyle}>SKILLS</h1>
                                <h3>LANGUAGES</h3>
                                <p style={{color: "palevioletred"}}>JavaScript</p>
                                <p style={{color: "#005b96"}}>Python</p>
                                <p style={{color: "palevioletred"}}>Ruby</p>
                                <p style={{color: "#005b96"}}>HTML</p>
                                <p style={{color: "palevioletred"}}>CSS</p>

                                <h3>FRAMEWORKS</h3>
                                <p style={{color: "#005b96"}}>React.Js</p>
                                <p style={{color: "palevioletred"}}>Next.Js</p>
                                <p style={{color: "#005b96"}}>Node.Js</p>
                                <p style={{color: "palevioletred"}}>Express</p>
                                <p style={{color: "#005b96"}}>Ruby on Rails</p>
                            </div>
                        </div>
                    </div>
                </MediaQuery>

            </div>
        )
    }
}

export default About;