// const Prob = require('prob.js');
import Prob from 'prob.js';
class Customer {
  constructor(index, arrivalTime, averageArrivalTime, coneMakingTime, averageWaitTime) {
    this.customerID = `${index}`;
    this.arrivalTime = arrivalTime;
    this.averageArrivalTime = averageArrivalTime;
    this.coneMakingTime = coneMakingTime;
    this.averageWait = averageWaitTime || coneMakingTime;
  }
}
export default function createCustomers (meanArrivalInterval, meanConeMakingTime, workHours) {
    meanArrivalInterval = Number(meanArrivalInterval)
    meanConeMakingTime = Number(meanConeMakingTime)
    workHours = Number(workHours)

    let totalWorkMinutes = workHours * 60
    let queueTime = 0
    let totalCustomers = 1

    const customerArrival = Prob.exponential(1.0 / 7)
    const makeCone = Prob.normal(meanConeMakingTime, 0.5)
    const customers = []

    while (totalWorkMinutes > queueTime) {
        const currArrival = customerArrival()
        const currConeTime = makeCone()
        queueTime += currArrival

        // Add the first customer to the queue
        if (customers.length === 0) {
        const newCustomer = new Customer(totalCustomers, queueTime, currArrival, currConeTime)
        customers.push(newCustomer)
        
        // Compare the last customer to see if there is a time overlap in order to make cones consistently
        // Or the cone time is the wait time if there is a gap in time between making
        } else {
            const lastCustomer = customers[customers.length - 1]
            const previousCustomerStartTime = lastCustomer['arrivalTime']
            const previousCustomerWaitTime = lastCustomer['averageWait']

            const nextCustomerStartTime = previousCustomerWaitTime + previousCustomerStartTime
            // The difference between the start time of next customer vs last customer start time + cone time needed
            const waitTime = nextCustomerStartTime > queueTime ? ((nextCustomerStartTime - queueTime) + currConeTime) : currConeTime

            const newCustomer = new Customer(totalCustomers, queueTime, currArrival, currConeTime, waitTime)
            customers.push(newCustomer)
        }
        
        totalCustomers += 1
    }

    return customers;
}
