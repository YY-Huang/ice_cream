import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch , useSelector } from 'react-redux';
// import { createCustomers } from '../utils/populateQuery'
import { useForm } from 'react-hook-form';
import { INITIATE_NEW_SIMULATION } from '../redux/constants';
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
        const options = data

        dispatch(initiateNewSimulation(options))
    };

    return (
        <form className="QueryForm" onSubmit={handleSubmit(onSubmit)}>
            <label>Customer Time (mins)</label>
            <input
               ref={register({ required: true, min: 1 })}
               type="text"
               name="customerTime"
            //    onChange={handleChange}
            />
            {errors.customerTime && errors.customerTime.type === "required" && <p>"Customer Time is required"</p>}
            {errors.customerTime && errors.customerTime.type === "min" && <p>Customer Time cannot be 0</p>}
            {/* <br/> */}
            <label>Cone Making Time (mins)</label>
            <input
               ref={register({ required: true, min: 1 })}
               type="text"
               name="coneMakingTime"

            //    onChange={handleChange}
            />
            {errors.coneMakingTime && errors.coneMakingTime.type === "required" && <p>"Cone Making Time is required"</p>}
            {errors.coneMakingTime && errors.coneMakingTime.type === "min" && <p>Cone Making Time cannot be 0</p>}
            <br/>
            <label>Work Hours</label>
            <input
                ref={register({ required: true, min: 1 })}
                type="text"
                name="workHours"
                // onChange={handleChange}
            />
            {errors.workHours && errors.workHours.type === "required" && <p>"Work Hours is required"</p>}
            {errors.workHours && errors.workHours.type === "min" && <p>Work Hours cannot be 0</p>}
            {/* <br/> */}
            <label>Number of Simulations</label>
            <input
               ref={register({ required: true, min: 1 })}
               type="text"
               name="numberOfSimulations"
            //    onChange={handleChange}
            />
            {errors.numberOfSimulations && errors.numberOfSimulations.type === "required" && <p>"Number of Simulations is required"</p>}
            {errors.numberOfSimulations && errors.numberOfSimulations.type === "min" && <p>Number of Simulations cannot be 0</p>}
            <br/>
            <button type="submit">Submit</button>
        </form>
    )
}

export default QueryForm;