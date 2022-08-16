import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import {useParams} from "react-router-dom";



export default function MoviesDetails() {
   
  let baseImgUrl='https://image.tmdb.org/t/p/original'; 
  let params=useParams();
  const [movieDetails,setMovieDetails]=useState(null);

 async function getMovieDetails(id){
  let {data} =await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US`)
  setMovieDetails(data);
  }
   
   useEffect(()=>{
    getMovieDetails(params.id)
   },[] )

  return (
   <>
   {movieDetails? <div className="row">
      <div className="col-md-3 my-5">
        <img className='w-100' src={baseImgUrl + movieDetails.poster_path} alt=""  />
      </div>

      <div className="col-md-9 my-5 ">
        <h2>{movieDetails.title}</h2>
        <p className='text-muted' style={{fontSize:25}} >{movieDetails.tagline}</p>
        <ul style={{listStyleType:'none'}}  >
          <li className='m-2' >Vote :  {movieDetails.vote_average}</li>
          <li className='m-2' >Vote_count   :{movieDetails.vote_count}</li>
          <li className='m-2' >Popularity  :{movieDetails.popularity}</li>
          <li className='m-2' >Release_date  :{movieDetails.release_date}</li>
        </ul>
        <p className='text-muted' style={{fontSize:20}}  >{movieDetails.overview}</p>
      </div>
    </div>
 
    :<div className='vh-100 d-flex justify-content-center align-items-center' >
      <i className='fas fa-spinner fa-spin fa-3x'></i>
      </div>}
   
   </>
  )
}
