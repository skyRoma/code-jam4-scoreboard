export default function showChartLine(resultsData, puzzlesName) {
let list = document.querySelectorAll("[type='checkbox']:checked"); 
let dataForInput = [];
let lineColor = ['red','green','pink','yellow','brown', 'purple', 'blue', 'orange','gray','black']
    for (let i = 0; i < list.length; i++) {
        let item = {};
        item.label = resultsData[list[i].id].name;
        item.borderColor = lineColor.pop();
        item.backgroundColor= "transparent";
        item.data = resultsData[list[i].id].times;
        dataForInput.push(item);
    }
let popCanvas = document.getElementById("popChart");
popCanvas.style.display="block";
popCanvas.getContext("2d");
document.querySelector('body').removeChild(popCanvas);

// popCanvas.innerHTML = ''; 
// if(barChart) barChart.update();
let barChart = new Chart(popCanvas, {
    type: 'line',
    data: {
        labels: puzzlesName,
        datasets: dataForInput,
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Chart.js Line Chart'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Puzzle'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Time'
                }
            }]
        }
    }
});
}