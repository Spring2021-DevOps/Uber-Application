import React from 'react'
import {Bar} from 'react-chartjs-2';
import axios from "axios";

require('dotenv').config()

const { REACT_APP_PYTHON_HOST } = process.env;

export default class Charts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            labels: ['January', 'February', 'March'],
            datasets: [
                       {
                         label: 'Rainfall',
                         backgroundColor: 'rgba(75,192,192)',
                         borderColor: 'rgba(0,0,0,1)',
                         borderWidth: 2,
                         data: [65, 59, 80]
                       }
                     ],
                     options : {
                        scales: {
                            xAxes: [{
                                barPercentage: 0.1
                            }]
                        }
                     }
        };
      }
      async componentDidMount() {
        console.log("I am in mount");
        var url = "http://" + REACT_APP_PYTHON_HOST + ":5000/analysis"
        await axios(url).then(
            (response) => {
                this.setState({
                    labels: response.data.city,
                    datasets: [
                        {
                          label: "Bookings",
                          backgroundColor: 'rgba(75,192,192,1)',
                          borderColor: 'rgba(0,0,0,1)',
                          borderWidth: 2,
                          data: response.data.count,
                          barThickness:30
                        }
                      ]
                });
                console.log(response.data.city);
              },
              (error) => {
                this.setState({
                  isLoaded: false,
                  lyrics: "",
                  error: error,
                });
                console.log(error);
              }
            );
      }

      render() {
          return( <div style = {{ marginTop : 30 }}>
            <Bar
              data={this.state}
              options={{
                scales: {
                    xAxes: [{
                        ticks: {
                            fontColor: "white",
                        }
                    }],
                    yAxes: [{
                        fontColor: "white",
                        ticks: {
                            beginAtZero: true,
                            fontColor: "white",
                            stepSize: 1
                        }
                    }]
                },
                title:{
                  display:true,
                  text:'Most visited destinations',
                  fontSize:20,
                  fontColor: "white",
                },
                legend:{
                  display:true,
                  position:'right'
                  
                }
              }}
            />
          </div>);

}
}
