// Read in the json file from the url through the D3 library
let url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';
d3.json(url).then(data => console.log(data));

function init() {
    let dropdownMenu = d3.select('#selDataset');
    d3.json(url).then((data) => {
        let names = data.names;
        names.forEach((id) => {
            dropdownMenu.append('option').text(id).attr('value', id);
        });

        let first_sample = names[0];

        // generate the initial plots
        metaDataInfo(first_sample);
        barChart(first_sample);
        bubbleChart(first_sample);
    })

}

function metaDataInfo(sample) {
    d3.json(url).then((data) => {
        let metadata = data.metadata;
        let value = metadata.find((result) => result.id == sample);
        let panelBody = d3.select('.panel-body');
        panelBody.html('');
        Object.entries(value).forEach(([key, value]) => {
            panelBody.append('h5').text(`${key}: ${value}`);
        });
    });
};

function barChart(sample) {
    d3.json(url).then((data) => {
        let sampleData = data.samples;
        let value = sampleData.filter((result) => result.id == sample)[0];
        let otu_ids = value.otu_ids;
        let otu_labels = value.otu_labels;
        let sample_values = value.sample_values;

        let x_value = sample_values.slice(0,10).reverse();
        let y_value = otu_ids.slice(0,10).reverse();
        let labels = otu_labels.slice(0,10).reverse();

        let dataTrace = [{
            x: x_value,
            y: y_value.map(id => ` OTU ${id}`),
            text: labels,
            type: 'bar',
            orientation: 'h'
        }];

        let layout = {
            title: {
                text: '<b>Top 10 OTUs</b><br>Found in this Individual',
                font: {color: 'black', size: 18}
            }
        };

        Plotly.newPlot('bar', dataTrace, layout);
    });
};

function bubbleChart(sample) {
    d3.json(url).then((data) => {
        let sampleData = data.samples;
        let value = sampleData.filter((result) => result.id == sample)[0];
        let otu_ids = value.otu_ids;
        let otu_labels = value.otu_labels;
        let sample_values = value.sample_values;

        let dataTrace = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: 'Earth',
                opacity: 0.75
            }
        }];

        let layout = {
            title: {
                text: '<b>Bubble Chart for Each Sample</b>',
                font: {color: 'black', size: 30}
            }
        };

        Plotly.newPlot('bubble', dataTrace, layout);
    });
};

d3.selectAll('#selDataset').on('change', function() {
    let new_value = d3.select(this).property('value');
    updatePlotly(new_value);
});

function updatePlotly(new_value) {
    metaDataInfo(new_value);
    barChart(new_value);
    bubbleChart(new_value);
    gaugeChart(new_value);
};

init();

