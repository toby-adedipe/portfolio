import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Home extends Component{

    render(){
        return(
            <div>
                Home page

                <Link to="/projects">Projects</Link>
            </div>
        )
    }
}

export default Home;