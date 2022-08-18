import axios from 'axios';
import Joi from 'joi';
import React from 'react'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';



export default function Register() {
  let [user,setUser]=useState(
    {
      first_name:'',
      last_name:'',
      age:'',
      email:'',
      password:'',
    }
  )
  let [errorMsg,setErrorMsg]=useState('');
  let [errorsList,setErrorsList]=useState([]);
  let [loading,setLoding]=useState(false)
  const navigate=useNavigate();
  function goToLogin(){
    navigate('/Login')
  }
 async function submitFormData(e){
    e.preventDefault();   //prevent refresh
    setLoding(true);
    let validateResponse= validateForm();
    if (validateResponse.error){
     setErrorsList(validateResponse.error.details);
    }
    else{
       let{data}= await axios.post('https://routeegypt.herokuapp.com/signup',user);
    if(data.message =='success'){
     goToLogin();
    }
    else{
     setErrorMsg(data.message)
    }
    }
    setLoding(false);

  }
  function validateForm(){
    const schema = Joi.object({
      first_name:Joi.string().required().min(2).max(20),
      last_name:Joi.string().required().min(3).max(20),
      age:Joi.number().required().min(20).max(80),
      email:Joi.string().required().email({tlds:{allow:['net','com']}}),
      password:Joi.string().required().min(5).max(15)
    });
    return schema.validate(user,{abortEarly:false});
  }



  function getFormValue(e){
    let myUser={...user}  //deep copy
    myUser[e.target.name]=e.target.value;
    setUser(myUser);
     console.log(myUser)
  }
  return (
    <>
   <div className='my-5 w-50 m-auto' >
    {errorsList.map((error,index)=><div key={index} className='alert alert-danger'>{error.message}</div>)}
   {errorMsg? <div className='alert alert-danger'>{errorMsg}</div>:''}
    <h1>Register Form</h1>
    <form onSubmit={submitFormData}  >
    <div className='inputgp my-3' >
      <label>First Name: </label>
      <input  onChange={getFormValue} type='text' className='form-control' name='first_name'  />
    </div>
    <div className='inputgp my-3' >
      <label>Last Name: </label>
      <input  onChange={getFormValue} type='text' className='form-control' name='last_name'  />
    </div>
    <div className='inputgp my-3' >
      <label>Age: </label>
      <input  onChange={getFormValue}  type='number' className='form-control' name='age'  />
    </div>
    <div className='inputgp my-3' >
      <label>Email: </label>
      <input  onChange={getFormValue} type='email' className='form-control' name='email'  />
    </div>
    <div className='inputgp my-3' >
      <label>Password: </label>
      <input  onChange={getFormValue} type='password' className='form-control' name='password'  />
    </div>
    <button  className='btn btnRegister float-end text-white' type='submit' >{loading?<i className='fa fa-spinner fa-spin' ></i>:'Register'}</button>
    <div className='clear-fix' ></div>
    </form>
   </div>
   </>
  )
}
