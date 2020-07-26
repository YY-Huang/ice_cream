# Ice Cream Simulator

![Screen Shot 2020-07-26 at 12 02 11 AM](https://user-images.githubusercontent.com/29897267/88471149-6b30c100-ced3-11ea-837e-0ff0b6063e2a.png)

A simulation of an ice cream maker during an average day (hours), based on parameters set on a form. 

Red - Average Wait Time

Purple - Cone Making Time

Green - Average Arrival Time

## Libaries Used
- React
- Redux
- Redux-saga
- D3
- Prob.js (distribution library for formulated data)

## Installation Guide

1. Clone the repository.
2. Install the NPM modules by using ```npm i``` in the directory of the cloned repo.
3. Start the project by using ```npm start```

Great! Happy cone making :)

## Introduction

### Mock Data

In order to understand the data to render and visualize, a mock data needs to be generated.

The mock data was created based on 1 work day scenario, with x hours worked (default 7), customer time in minutes (default 7), and cone making time in minutes(default 7).

Using ```Prob.js```, I was able to use normal distribution for cone making time with a variance of 1, and customer time on an exponential distributed form. 

![Screen Shot 2020-07-26 at 12 12 41 AM](https://user-images.githubusercontent.com/29897267/88471234-c0b99d80-ced4-11ea-9d17-694722b256d1.png)

Each customer was created from a class based structure, using the normal distributed time of arrival to make a queue of customers. 

The average waiting time was calculated based on the previous customer (not the first, starting from the second) and seeing if the arrival time was greater than the previous customer start time and cone time. If the arrival time was not within the previous customer's time in queue, then the wait time will be set to the cone making time it takes for that customer to finish. Otherwise, it will be added from the difference of the last customer's time as a pointer. 

```
class Customer {
  constructor(index, arrivalTime, averageArrivalTime, coneMakingTime, averageWaitTime) {
    this.customerID = `${index}`;
    this.arrivalTime = arrivalTime;
    this.averageArrivalTime = averageArrivalTime;
    this.coneMakingTime = coneMakingTime;
    this.averageWait = averageWaitTime || coneMakingTime;
  }
}
```

### Front End

```QueryForm Component```  is used to gather the parameters of the user's inputs to be dispatched as an action.

The action is then intercepted by ```redux-saga``` as a middleware. It will take the payload from the dispatched action and feed that into the function to create the list of class based Customers. 

Within the saga middleware, a generator is used to create the simulated class based Customers based on x number of simulations inputted. 

An action will then be called to store the data with the new payload of generated customers of x amount of simulations. 

![Screen Shot 2020-07-26 at 12 24 19 AM](https://user-images.githubusercontent.com/29897267/88471341-63265080-ced6-11ea-8b78-9a3c6ad44b5c.png)

A 1001 simulation showing the last simulation of 72 customers in an array of objects.

### Chart Component

The Chart Component will exist as a hook once the reducer data feeds in from the action. 

An SVG is added with the current index of the simulation we are in to track the data and populate arrays to plot lines for D3. 

A dynamic display of the data flow of different simulations can be tracked. 

## Thoughts?

This was a very fun project to build out -- especially using D3. Working with any type of data would be great to visualize, which is why I decided to use D3. It was very front end focused to show the different simulations as I personally am more apt to see how data interacts better if there is a visual aid. Explaining large amounts of data is hard if a person cannot conceive it. 



