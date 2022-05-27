import React from 'react';
import {Doughnut} from "react-chartjs-2";
import {Chart, ArcElement, Tooltip} from 'chart.js'
Chart.register(ArcElement, Tooltip);

const DoughnutChart = ({proportion}) => {

    const data = {
        labels: ['Fats', 'Carbs', 'Proteins'],
        datasets: [{
            label: 'Ideal proportion of macronutrients',
            data: proportion,
            backgroundColor: [
                'rgba(255,193,7,1)',
                'rgba(25,135,84,1)',
                'rgba(13,110,253,1)'
            ],
            hoverOffset: 3
        }]
    }

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Ideal proportion of macronutrients',
                color:'black',
                font: {
                    size:20
                },
                padding:{
                    top:30,
                    bottom:30
                },
                responsive:true,
                animation:{
                    animateScale: true,
                }
            },
            labels: {
                title: {
                    font: {
                        weight: 'bold'
                    }
                },
                value: {color: 'black'}
            },
            legend: {
                display: false
            }
        }
    }

    return (
        <div>
            <Doughnut data={data} options={options} type={'doughnut'} width={200}/>
        </div>
    );
};

export default DoughnutChart;