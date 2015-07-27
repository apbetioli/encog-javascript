var ENCOG = require('../../node-encog.js');

var XOR_INPUT = [
    [0,0],
    [1,0],
    [0,1],
    [1,1]
];

var XOR_IDEAL = [
    [0],
    [1],
    [1],
    [0]
];

console.log('One');
console.log('Two');
console.log('Three');

var network = ENCOG.BasicNetwork.create( [
    ENCOG.BasicLayer.create(ENCOG.ActivationSigmoid.create(),2,1),
    ENCOG.BasicLayer.create(ENCOG.ActivationSigmoid.create(),3,1),
    ENCOG.BasicLayer.create(ENCOG.ActivationSigmoid.create(),1,0)] );
network.randomize();

var train = ENCOG.PropagationTrainer.create(network,XOR_INPUT,XOR_IDEAL,"RPROP",0,0);

var iteration = 1;

do
{
    train.iteration();
    var str = "Training Iteration #" + iteration + ", Error: " + train.error;
    console.log(str);
    iteration++;
} while( iteration<1000 && train.error>0.01);

var input = [0,0];
var output = new Array(1);

console.log("Testing neural network");
for(var i=0;i<XOR_INPUT.length;i++)
{
    network.compute(XOR_INPUT[i],output);
    var str = "Input: " + String(XOR_INPUT[i][0])
            + " ; " + String(XOR_INPUT[i][1])
            + "   Output: " + String(output[0])
            + "   Ideal: " + String(XOR_IDEAL[i][0]);
    console.log(str);
}

