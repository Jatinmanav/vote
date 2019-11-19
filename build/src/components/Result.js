import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { Pie } from "react-chartjs-2";
import resultComponent from '../services/resultComponent'


const Result = () => {
  const [tempOne, setTempOne] = useState([]);
  const [tempTwo, setTempTwo] = useState([]);
  const [tempThree, setTempThree] = useState([]);
  const animationStyle = useSpring({
    opacity: 1,
    from: {
      opacity: 0
    }
  });


   useEffect(() => {
     resultComponent()
       .then(response => {
         const [label, votedata, color] = response;
         console.log(label);
         setTempOne(label);
         setTempTwo(votedata);
         setTempThree(color);
     })
   }, [])

  const piechartStyle = {
    paddingTop: "5vh"
  };

  //"#FF6384", "#36A2EB", "#FFCE56"

  return (
    <animated.div style={animationStyle}>
      <div style={piechartStyle}>
        <Pie
          data={{
            labels: tempOne,
            datasets: [
              {
                data: tempTwo,
                backgroundColor: tempThree,
              }
            ]
          }}
          height={500}
          width={500}
          options={{
            maintainAspectRatio: false,
            title: {
              display: true,
              text: "Results of Elections"
            }
          }}
        />
      </div>
    </animated.div>
  );
};

export default Result;
