import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { initiateNewSimulation } from '../redux/actions';

const QueryForm = () => {
    const { register, handleSubmit, errors, setValue } = useForm({
        defaultValues: {
            customerTime: 7,
            coneMakingTime: 7,
            workHours: 7,
            numberOfSimulations: 1001
        }
    });
    const dispatch = useDispatch();
    const onSubmit = data => {
        const options = {
            ...data,
        }

        dispatch(initiateNewSimulation(options))
    };

    return (
        <form className="QueryForm" onSubmit={handleSubmit(onSubmit)}>
            <label>Customer Time (mins)</label>
            <input
               ref={
                register({ 
                   required: true, 
                   validate: {
                      positiveNumber: value => parseFloat(value) > 0
                   }
                })}
               type="text"
               name="customerTime"
            />
            {errors.customerTime && errors.customerTime.type === "required" && <p>"Customer Time is required"</p>}
            {errors.customerTime && errors.customerTime.type === "positiveNumber" && (
                <p>Customer Time must be greater than 0</p>
            )}
            <label>Cone Making Time (mins)</label>
            <input
               ref={
                register({ 
                    required: true, 
                    validate: {
                       positiveNumber: value => parseFloat(value) > 0
                    }
                })}
               type="text"
               name="coneMakingTime"
            />
            {errors.coneMakingTime && errors.coneMakingTime.type === "required" && <p>"Cone Making Time is required"</p>}
            {errors.coneMakingTime && errors.coneMakingTime.type === "positiveNumber" && (
                <p>Cone Making Time must be greater than 0</p>
            )}
            <br/>
            <label>Work Hours</label>
            <input
                ref={
                  register({ 
                    required: true, 
                    validate: {
                        positiveNumber: value => parseFloat(value) > 0
                    } 
                })}
                type="text"
                name="workHours"
            />
            {errors.workHours && errors.workHours.type === "required" && <p>"Work Hours is required"</p>}
            {errors.workHours && errors.workHours.type === "positiveNumber" && (
                <p>Work Hours must be greater than 0</p>
            )}
            <label>Number of Simulations</label>
            <input
               ref={
                register({ 
                   required: true, 
                   validate: {
                        positiveNumber: value => parseFloat(value) > 0
                   } 
                })}
               type="text"
               name="numberOfSimulations"
            />
            {errors.numberOfSimulations && errors.numberOfSimulations.type === "required" && <p>"Number of Simulations is required"</p>}
            {errors.numberOfSimulations && errors.numberOfSimulations.type === "positiveNumber" && (
                <p>Number of Simulations must be greater than 0</p>
            )}
            <br/>
            <button type="submit">Submit</button>
        </form>
    )
}

export default QueryForm;