import React from 'react';
import { Link } from 'react-router-dom';


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
                    imgStyle:{
                        width: '30vw',
                        height: '20vh'
                    },
                    linkStyle:{
                        textDecoration: 'none',
                        color: '#000'
                    },
                    nameStyle:{
                        marginLeft: '5vw'
                    }
                }
                const {divStyle, imgStyle, linkStyle, nameStyle} = style
                return(
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