import React, { Component } from 'react';
import MediaQuery from 'react-responsive';

import Header from './Header';
import projects from './list';

class Project extends Component{
    constructor(props){
        super(props);

        this.state = {
            project: ''
        }
    }

    componentDidMount(){
        console.log(this.props.match.params.projectid)
        const project = projects[this.props.match.params.projectid-1]
        this.setState({
            project
        })
    }

    render(){

        const style={
            containerStyle:{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            },
            buttonStyle:{
                border: '1px solid black',
                width: '30vw',
                height: '40px',
                fontSize: '18px',
                background: 'transparent'
            }
        }
        
        const {containerStyle, buttonStyle} = style;
        return(
            <div>
                <Header />
                <MediaQuery maxDeviceWidth={480}>
                    <div style={containerStyle}>
                        <h3>{this.state.project.name}</h3>
                        <img style={{ width: '40vw', height: '40vw'}}src={`/images/${this.state.project.img}`} alt="individual-projects"/>
                        <p style={{width: '90vw', textAlign: 'justify'}}>{this.state.project.desc}</p>
                        <h4 style={{margin: 0}}>Tools Used include:</h4>
                        <p>{this.state.project.tools}</p>
                        <a href={`${this.state.project.link}`} style={{textDecoration: 'none'}}><button style={buttonStyle}>Visit</button></a>
                    </div>
                </MediaQuery>
                

                <MediaQuery minDeviceWidth={480}>
                    <div style={containerStyle}>
                        <h3>{this.state.project.name}</h3>
                        <img style={{ width: '100px', height: '100px'}}src={`/images/${this.state.project.img}`} alt="individual-projects"/>
                        <p style={{width: '60vw', textAlign: 'justify'}}>{this.state.project.desc}</p>
                        <h4 style={{margin: 0}}>Tools Used include:</h4>
                        <p>{this.state.project.tools}</p>
                        <a href={`${this.state.project.link}`} style={{textDecoration: 'none'}}><button style={buttonStyle}>Visit</button></a>
                    </div>
                </MediaQuery>
            </div>
        )
    }
}

export default Project;