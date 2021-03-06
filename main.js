const xlables =[];
const ytemps =[];

chartIt();

async function chartIt() {
    const data = await getData();                          // calling the function getData inside of the function chartIt with await lets all the data get retrieved before moving on 
    const ctx = document.getElementById('chart').getContext('2d');
    const xlabels = [];
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.xs,
            datasets: [
            {
                label: 'Combined Land-Surface Air and Sea-Surface Water Temp in C°',
                data: data.ys,
                backgroundColor: 'rgba(242, 120, 75, .5)',
                borderColor: 'rgba(235, 149, 50, 1)',
                borderWidth: 1
            }
            ]
        }
    });
}   


// Data from: https://data.giss.nasa.gov/gistemp/
// Mean from: https://earthobservatory.nasa.gov/world-of-change/DecadalTemp


async function getData(){                   // this function returns an object with both arryas
    const xs = [];
    const ys = [];


    const response = await fetch('ZonAnn.Ts+dSST.csv');
    const data = await response.text();

    const table = data.split('\n').slice(1);  // getting the raw table as text and splitting it up and putting it into a variable called "table"
    table.forEach(row => {                    // going through each row of the table, 
        const columns = row.split(',');       // splitting each row into its correspsonding columns
        const year = columns[0];
        xs.push(year);                   // add the array of year to the variable "xlables"
        const temp = columns[1];
        ys.push(parseFloat(temp)+14);     // parseFloat function , global function that takes a string and turns it into a number  (global mean 14degrees Celcius)
        console.log(year, temp);
    });
    return { xs, ys};                      // return an object with xs and ys in it 
}