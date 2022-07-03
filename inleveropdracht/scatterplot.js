const canvas = document.getElementById('myChart')
let myChart

//Creates a chart based on the data given.
export function createChart(columns){
    const config = {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Weather Restaurant picker',
                data: columns,
                backgroundColor: 'rgb(185, 185, 255)'
            }]
        },
        options: {
            scales: {
                x: {
                    title: {display: true, text: 'Max temprature'}
                },
                y: {
                    title: {display: true, text: 'Wind'}
                }
            },
            layout: {
                padding: 30
            }
        }
    }

    myChart = new Chart(canvas, config)
}

// update an existing chart
export function updateChart(label, data){
    myChart.data.datasets.push({
        label,
        data,
        backgroundColor: 'rgb(255, 44, 44)'
    })
    myChart.update()
}
