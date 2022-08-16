import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import style from './People.module.scss';

export default function People() {
  let [trendingPeople,setTrendingPeople]=useState([]);
  let baseImgUrl='https://image.tmdb.org/t/p/original';
  async function getTrendingItems(dataType){
   let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${dataType}/day?api_key=c636ed7787cc302d96bf88ccf334e0d8`);
   setTrendingPeople(data.results);

  }


  useEffect(() => {
   getTrendingItems("person");
  }, [])
  
  return (
    <>
     
     {
     trendingPeople.length>0 ?<div className='row' >
      <div className='col-md-4' >
      <div className="div welcome">
        <div className= {`${style.brdr} my-4 w-25 `} ></div>
        <h2>Trending</h2>
        <h2>Persons</h2>
        <h2>To watch now</h2>
        <p className='text-muted' >most watched persons by day</p>

        <div className={`${style.brdr} my-4 w-75 `} ></div>
      </div>


      </div>

     {trendingPeople.map((person)=>
     <div key={person.id} className='col-md-2 my-2' >
       <div className='person' >
        <img className='w-100 mb-2' src={baseImgUrl+ person.profile_path} alt="" />
         <h2 className='h6' >{person.name}</h2>
         
       </div>
     </div>
     
     )}
     </div>:<div className='vh-100 d-flex justify-content-center align-items-center' >
      <i className='fas fa-spinner fa-spin fa-3x text-white '></i>
      </div>
     }
    </>
  )
}
