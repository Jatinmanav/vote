import React from "react";
import { useSpring, animated } from "react-spring";
import { Pie } from "react-chartjs-2";

const data = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
    }
  ]
};

const Result = () => {
  const animationStyle = useSpring({
    opacity: 1,
    from: {
      opacity: 0
    }
  });
  const piechartStyle = {
    paddingTop: "5vh"
  };
  return (
    <animated.div style={animationStyle}>
      <div style={piechartStyle}>
        <Pie
          data={data}
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
