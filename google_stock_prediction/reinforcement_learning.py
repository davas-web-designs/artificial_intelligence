
#source : https://www.youtube.com/watch?v=05NqKJ0v7EE

from google_finance import Share
from matplotlib import pyplot as plt
import numpy as np
import random
import tensorflow as tf
import random

if __name__ == '__main__':
    prices = get_prices('GOOG', '2000-07-01', '2020-06-16', 'resource/stock_prices.npy')
    actions = ['Buy', 'Sell', 'Hold']
    hist = 200
    RandomDecisionPolicy(actions)
    QLearningDecisionPolicy(actions)
    budget = 100.0
    num_stocks = 0
    avg, st = run_simulations(policy, budget, num_stocks, prices, hist)
    print(avg, std)

class DecisionPolicy:
    def select_action(self, current_state, step):
        pass
    def update_q(self, state, action, reward, next_state):
        pass
class RandomDecisionPolicy(DecisionPolicy):
    def __init__(self, actions):
        self.actions = actions

    def select_action(self, current_state, step):
        action = self.actions[random.randint(0, len(self.actions) -1)]
        return action

class QLearningDecisionPolicy(DecisionPolicy):
    def __init__(self, actions, input_dim):
        self.epsilo = 0.5
        self.gamma = 0.001
        self.actions = actions
        output_dim = len(actions)
        h1_dim = 200

        self.x = tf.placeholder(tf.float32, [None, input_dim])
        self.y = tf.placeholder(tf.float32, [output_dim])
        W1 = tf.Variable(tf.random_normal([input_dim, h1_dim]))
        b1 = tf.Variable(tf.constant(0.1, shape = [h1_dim]))
        tf.nn.relu(tf.matmul(self.x, W1) + b1)
        W2 = tf.Variable(tf.random_normal([h1_dim, input_dim]))
        tf.Variable(tf.constant(0.1, shape = [otuput_dim]))
        self.q = tf.nn.relu(tf.matmul(h1, W2) + b2)
        loss = tf.square(self.y - self.q)
        self.train_op = tf.train.GradientDescentOptimizer(0.01).minimize(loss)

        def select_action(self, current_state, step):
            threshold = min(self.epsilon, step / 1000.)
            if random.randon() < threshold:
                action_q_vals = selft.sess.run(self.q, feed_dict = {self.x : current_state})
                action_idx = np.argmax(action_q_vals)
                action = self.actons[action_idx]
            else:
                action = self.actions[random.randint(0, len(self.actions) - 1)]
