import React from 'react';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';

const ProjectList = (props) =>{
    const list = ({allProjects})=>{
        if(allProjects){
            return allProjects.map((item)=>{
                const style = {
                    divStyle:{
                        background: '#c1c1c1',
                        width: '90vw',
                        height: '20vh',
                        margin: '5vw',
                        display: 'flex'
                    },
                    tabdivStyle:{
                        background: '#c1c1c1',
                        width: '60vw',
                        height: '40vh',
                        margin: '20vw auto',
                        display: 'flex'
                    },
                    imgStyle:{
                        width: '30vw',
                        height: '20vh'
                    },
                    tabimgStyle:{
                        width: '30vw',
                        height: '40vh'
                    },
                    linkStyle:{
                        textDecoration: 'none',
                        color: '#000'
                    },
                    nameStyle:{
                        marginLeft: '5vw'
                    }
                }
                const {divStyle, imgStyle, linkStyle, nameStyle,tabdivStyle, tabimgStyle} = style
                return(
                    <div>
                        <MediaQuery maxDeviceWidth={480}>
                            <div>
                                <Link key={item.id} to={`/project/${item.id}`}
                                style={linkStyle}
                                >
                                    <div style={divStyle}>
                                        <div>
                                            <img style={imgStyle} key={item.img} src={`/images/${item.img}`} alt="projects"/>
                                        </div>
                                        <div style={nameStyle}>
                                            <h3 >{item.name}</h3>
                                            <p>{item.shortDesc}</p>
                                        </div>
                                        
                                    </div>
                                </Link>
                            </div>
                        </MediaQuery>
                        
                        <MediaQuery minDeviceWidth={480}>
                            <div>
                                <Link key={item.id} to={`/project/${item.id}`}
                                style={linkStyle}
                                >
                                    <div style={tabdivStyle}>
                                        <div>
                                            <img style={tabimgStyle} key={item.img} src={`/images/${item.img}`} alt="projects"/>
                                        </div>
                                        <div style={nameStyle}>
                                            <h3 >{item.name}</h3>
                                            <p>{item.shortDesc}</p>
                                        </div>
                                        
                                    </div>
                                </Link>
                            </div>
                        </MediaQuery>
                        
                    </div>
                    
                )
            })
        }
    }

    return(
        <div>
            {list(props)}
        </div>
    )
}

export default ProjectList;