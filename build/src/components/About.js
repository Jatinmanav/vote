import React from 'react'
import { useSpring, animated } from 'react-spring';

const About =()=> {
    const animationStyle = useSpring({
        opacity: 1,
        from: {
            opacity: 0,
        },
    })

    return (
        <animated.div style={animationStyle}>
            <div>
                <h1>This is About</h1>
            </div>
        </animated.div>
    )
}

export default About