
//Globals
let nn;

//Button for reccomendations
let button = document.getElementById('prediction')
button.onclick = function click(){
    giveReccomendation()
}

//
// Weather Data
//
function createData() {
    Papa.parse("inleveropdracht/data/rotterdam-weather.csv", {
        download: true,
        header: true, 
        dynamicTyping: true,
        complete: results => {
            createNeuralNetwork(results.data);
        },
        
    })
}
//
// Training Neural Network
//
async function createNeuralNetwork(data) {
    // // Make Neural Network
    // console.log(data)
    nn = ml5.neuralNetwork( {task: 'classification'})
    
    // // Adding the data to the Neural Network
    for (let temp of data){
        const input = {MinTemp: temp.temp_min, MaxTemp: temp.temp_max, Wind: temp.wind }
        const output = {Weather: temp.weather}
        nn.addData(input, output)
    }

    //Problem with normlized data, function broke for unknown reasons
    nn.normalizeData

    // // Train neural network
    nn.train({ epochs: 100 }, () => finished())   
}

//redirect when data is finished to the results
function finished(){
    document.getElementById('reply').innerHTML = "";
    console.log("Training of the data has finished")

    document.getElementById('prediction').disabled = false;
}

//
// Making a prediction
//
async function giveReccomendation() {
    //Inputs of the dataset
    let MaxInput = document.getElementById('maxtemp').value;
    let valueMax = parseFloat(MaxInput);

    let MinInput = document.getElementById('mintemp').value;
    let valueMin = parseFloat(MinInput);

    let WindpowerInput = document.getElementById('windpower').value;
    let valueWind = parseFloat(WindpowerInput);

    //all inputs
    const input = {MaxTemp: valueMax, MinTemp: valueMin, Wind: valueWind}
    console.log(`Your input values are ${input}`)

    nn.classify(input, (error, result) => {
        //Weather result
        let weather = result[0].label
        document.getElementById("weather").innerHTML = weather

        //Accuracy result
        let accuracy = Math.round(result[0].confidence * 100)
        document.getElementById("accuracy").innerHTML = accuracy

        //Weather decides what reccomendation to give
        if (weather == "rain" || weather == "snow" || weather == "drizzle") {
            document.getElementById("reccomendation").innerHTML = "Shabu Shabu, MacDonalds, BackWerk, Starbucks"
        }else{
            document.getElementById("reccomendation").innerHTML = "LaPlace, Laura's, Jumbo"
        }
    })

}

// Starting application
createData()
