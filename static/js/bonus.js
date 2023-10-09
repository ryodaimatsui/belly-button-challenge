// Generating a gauge chart

// Initialize the chart and link it with the dropdown menu.
function init() {
    let dropdownMenu = d3.select('#selDataset');
    d3.json(url).then((data) => {
        let names = data.names;
        names.forEach((id) => {
            dropdownMenu.append('option').text(id).attr('value', id);
        });

        let sample = names[0];
        
        gaugeChart(sample);
    });
};



function gaugeChart(sample) {
    d3.json(url).then((data) => {
        let metadata = data.metadata;
        let value = metadata.find((result) => result.id == sample);
        console.log(value);
        
        let wfreq = Object.values(value)[6];

        let dataTrace = [{
            domain: {x: [0, 1], y: [0,1]},
            mode: 'gauge+number',
            value: wfreq,
            title: {
                text: '<b>Belly Button Washing Frequency</b><br>Scrubs per Week</br>',
                font: {color: 'black', size: 18}
            },
            type: 'indicator',
            text: ['', '0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9'],
            textinfo: 'text',
            textposition: 'inside',
            gauge: {
                axis: {
                    range: [0, 9],
                    tickvals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                    ticktext: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
                    tickmode: 'array',
                    tickangle: 0,
                    tickwidth: 1,
                    tickcolor: 'black'
                },
                steps: [
                    {range: [0,1], color: '#FFFFD9'},
                    {range: [1,2], color: '#EDF8B1'},
                    {range: [2,3], color: '#C7E9B4'},
                    {range: [3,4], color: '#7FCDBB'},
                    {range: [4,5], color: '#41B6C4'},
                    {range: [5,6], color: '#1D91C0'},
                    {range: [6,7], color: '#225EA8'},
                    {range: [7,8], color: '#253494'},
                    {range: [8,9], color: '#081D58'},
                ]
            }
        }];
        Plotly.newPlot('gauge', dataTrace)
    });
    
};

init();