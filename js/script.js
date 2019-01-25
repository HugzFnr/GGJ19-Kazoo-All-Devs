var container = document.getElementById('container');
var network, nodes, edges;


function init()
{
	nodes = new vis.DataSet([createNode(0,0)]);
	edges = new vis.DataSet([createEdge(0,0)]);
	network = new vis.Network(container,{nodes:nodes,edges:edges},{});
}


function createNode(id,label)
{
	return {id:id,label:label};
}

function createEdge(from,to)
{
	return {from:from,to:to};
}


  // var nodes = new vis.DataSet([
        // {id: 1, label: 'Node 1'},
        // {id: 2, label: 'Node 2'},
        // {id: 3, label: 'Node 3'},
        // {id: 4, label: 'Node 4'},
        // {id: 5, label: 'Node 5'}
    // ]);

    // var edges = new vis.DataSet([
        // {from: 1, to: 3},
        // {from: 1, to: 2},
        // {from: 2, to: 4},
        // {from: 2, to: 5}
    // ]);


    // var data = {
        // nodes: nodes,
        // edges: edges
    // };
    // var options = {};

   // initialize your network!
// var network = new vis.Network(container, data, options);



// var id = 0;
// function addNode()
// {
	// nodes.add({id:1, label:"HEY"})
// }


init();