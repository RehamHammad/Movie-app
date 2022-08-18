import React from 'react'
import axios from 'axios';
import Joi from 'joi';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';


export default function Login(props) {
  let [user,setUser]=useState(
    {
      email:'',
      password:'',
    }
  )
  let [errorMsg,setErrorMsg]=useState('');
  let [errorsList,setErrorsList]=useState([]);
  let [loading,setLoding]=useState(false)
  const navigate=useNavigate();
  function goToMovies(){
    navigate('/Movies')
  }
 async function submitFormData(e){
    e.preventDefault();   //prevent refresh
    setLoding(true);
    let validateResponse= validateForm();
    if (validateResponse.error){
     setErrorsList(validateResponse.error.details);
    }
    else{
       let{data}= await axios.post('https://routeegypt.herokuapp.com/signin',user);
       console.log(data);
    if(data.message =='success'){
      localStorage.setItem('userToken',data.token);
      props.savaUserData();
     goToMovies();
    }
    else{
     setErrorMsg(data.message)
    }
    }
    setLoding(false);

  }
  function validateForm(){
    const schema = Joi.object({
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
   <div className=" my-5 w-50 m-auto" >
   <h1>Login Form</h1>
   {errorsList.map((error,index)=><div key={index} className='alert alert-danger'>{error.message}</div>)}
   {errorMsg? <div className='alert alert-danger'>{errorMsg}</div>:''}
    <form onSubmit={submitFormData}  >
    <div className='inputgp my-3' >
      <label>Email: </label>
      <input  onChange={getFormValue} type='email' className='form-control' name='email'  />
    </div>
    <div className='inputgp my-3' >
      <label>Password: </label>
      <input  onChange={getFormValue} type='password' className='form-control' name='password'  />
    </div>
    <button  className='btn float-end text-white' type='submit' >{loading?<i className='fa fa-spinner fa-spin' ></i>:'Login'}</button>
    <div className='clear-fix' ></div>
    </form>
   </div>
   </>
  )


}
