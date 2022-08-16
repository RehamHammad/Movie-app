import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import {useParams} from "react-router-dom";


export default function TvDetails() {
    let baseImgUrl='https://image.tmdb.org/t/p/original'; 
    let params=useParams();
    const [TvDetails,setTvDetails]=useState(null);

    async function getTvDetails(id){
        let {data} =await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=90142caa6b0287afefb2bd4ad6d11624&language=en-US`)
        setTvDetails(data);
        }
         
         useEffect(()=>{
          getTvDetails(params.id)
         },[] )

  return (
    <>
     {TvDetails? <div className="row">
      <div className="col-md-3 my-5">
        <img className='w-100' src={baseImgUrl + TvDetails.poster_path} alt=""  />
      </div>

      <div className="col-md-9 my-5 ">
        <h2>{TvDetails.name}</h2>
        <p className='text-muted' >{TvDetails.tagline}</p>
        <ul>
          <li>type :{TvDetails.type}</li>
          <li>vote :{TvDetails.vote_average}</li>
          <li>vote_count   :{TvDetails.vote_count}</li>
          <li>popularity  :{TvDetails.popularity}</li>
        </ul>
        <p className='text-muted' >{TvDetails.overview}</p>
      </div>
    </div>
 
    :<div className='vh-100 d-flex justify-content-center align-items-center' >
      <i className='fas fa-spinner fa-spin fa-3x text-white '></i>
      </div>}
   
    </>
  )
}
