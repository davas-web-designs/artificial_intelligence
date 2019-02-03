# simple_perceptron
Simple version of a perceptron, the machine model of a neuron.
<br>
Using p5.js as library to draw in the canvas
<br><br>
Math model inspired in the book: <i>"Aprendizaje automatico. Un enfoque práctico"</i> (chapter 4).
<br><br>
This is a very simple example in which you can see green and red points appearing in the screen, the color of these points is determied by the output of the perceptron, this is the reason why at first, they are almost random, but with time and more and more examples, it is able to get better.
<br><br>
Note that after 1000 points are drawn in the screen, the array of points gets empty so that another new 1000 points can be drawn, but this doesn't imply that these are new points as the first ones, because the weights array is continuosly beeing modified throughout the execution of the program.
<br><br>
It learns to classify two different classes, the green and red one, separated by a virtual line, that serves as reference, in this case, this line is defined in the f() function, and it can be easily modified. 
<br>
To perfrom this modification, you have to access the function f(x) and change the formula of the line, please note that not all values are good.
<br><br>
<h3>Description of the algorithm</h3>
<ol>
<li>Select the data: In this case, we use the same data for training and testing, as it flows continuously.<br>The data consists of a set of points that have random x and y  </li>
<li>
  <ol>
    <li>Train function: We compute the <strong>sum</strong> of the inputs:(x,y) multiplied by the set of weights and we substract the bias(weights[2])</li>
    <li>We then <strong>compute the known answer(desired)</strong> of the output, it is very simple: if the inputs[0] = (x coordinate of the current point) < inputs[2] = (y coordinate of the point) to which we apply the f() function so that it describes the correct line</li>  
    <li>After, we have to <strong>guess an answer</strong> based on the sum that we did previously, this is called an activation funtion. In this case it is the simplest one, if sum > 0: guess = 1, else guess = -1. This means that guess can only be either 1 or -1.</li>
    <li><strong>Calculate the error</strong>: the error is very simple in this case: desired-guess. Note that it can only be 2, -2 or 0, we want it to be 0 as many times as possible</li>
    <li><strong>Weights update: </strong>The weights are an array which values are initialized randomly, but we have to tweek these values in order to learn, because in the first step of this train funtion, we are using the weights to calculate the sum. We change these values by adding to them the following cuantity: learning_rate_constant * inputs * error</li>
  </ol>
</li>
<li>From the train function, we return the guess, in the draw loop we use this value to give color to the points</li>
</ol>
<p>The intelligence of this algorithm is due to the continuous variation in the weights, which are adjusted so that the model can learn the division of the line</p>
<p>This algorithm can only be applied to linearly separable functions, this means, functions that can be separated with a single line, such as OR or AND, but not XOR...</p>
oli 
