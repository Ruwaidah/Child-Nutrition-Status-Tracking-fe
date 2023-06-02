import React from "react";
import { connect } from "react-redux";
// import { LineChart, Line, XAxis, Tooltip, CartesianGrid } from 'recharts'
import { Line } from "react-chartjs-2";

function RecordsChart(props) {
  let weights = [props.child.weight];
  let dates = [props.child.birth];
  let heights = [props.child.height];
  for (let i = 0; i < props.childTrack.length; i++) {
    weights.push(props.childTrack[i].weight);
    dates.push(props.childTrack[i].date);
    heights.push(props.childTrack[i].height);
  }
  const data = {
    // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    labels: dates,
    datasets: [
      {
        label: "weigth",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: weights,
      },
      {
        label: "height",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "#B22222",
        borderColor: "#B22222",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#B22222",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#B22222",
        pointHoverBorderColor: "#B22222",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: heights,
      },
    ],
  };
  return (
    <div className="chart">
      <Line data={data} />
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    user: state.user,
    child: state.child,
    childTrack: state.childTrack,
  };
};
export default connect(mapStatetoProps, {})(RecordsChart);
