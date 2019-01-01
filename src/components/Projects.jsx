import React, { Component } from 'react';

import Header from './Header';
import ProjectList from './ProjectList';
import projects from './list';

class Projects extends Component{
    constructor(props){
        super(props);

        this.state = {
            projects: ''
        }
    }

    componentDidMount(){
        
        this.setState({
            projects
        })
    }

    render(){
        return(
            <div>
                <Header />
                <ProjectList allProjects={this.state.projects} />
            </div>
        )
    }
}

export default Projects;