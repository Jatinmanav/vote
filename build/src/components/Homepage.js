import React from 'react';
import colors from '../ColorVariables'
import { useSpring, animated } from 'react-spring';
//import '../styles/homepage.css';


const Homepage =()=>{
    const thirdColor = colors.fontColor1;

    const animationStyle = useSpring({
        opacity: 1,
        from: {
            opacity: 0,
        },
    })

    const backgroundImage = {
       //backgroundImage: 'url('+ imgUrl +')',
       backgroundColor: colors.backgroundColor1,
       //backgroundSize: 'cover',
       //backgroundPosition: 'top center',
       //backgroundRepeat: 'no-repeat',
       height: '95vh',
    }

    const homepageContent = {
        height: '80%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: thirdColor,
        fontSize: '6vh',
    }

    return(
        <animated.div style={animationStyle}>
            <div style={backgroundImage}>
                <div style={homepageContent}>
                    <h1>
                        Make Your<br /> Vote Count
                    </h1>
                </div>
            </div>
        </animated.div>
    )
}

export default Homepage;