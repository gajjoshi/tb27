import gym
import numpy as np
import warnings

warnings.filterwarnings("ignore", category=DeprecationWarning)

env = gym.make('CartPole-v1', render_mode="human")

state = env.reset()

print("State space:", env.observation_space)
print("Action space:", env.action_space)

for _ in range(1000):
    env.render()  
    action = env.action_space.sample() 
    
    step_result = env.step(action)
    
    if len(step_result) == 4:
        next_state, reward, done, info = step_result
        terminated = False
    else:
        next_state, reward, done, truncated, info = step_result
        terminated = done or truncated
    
    print(f"Action: {action}, Reward: {reward}, Next State: {next_state}, Done: {done}, Info: {info}")
    
    if terminated:
        state = env.reset()  

env.close()  
