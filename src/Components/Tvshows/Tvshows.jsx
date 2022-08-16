import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import style from './Tvshows.module.scss';
import { Link } from 'react-router-dom';


export default function Tvshows() {
  let [trendingTvshows,setTrendingTvshows]=useState([]);
  let nums= new Array(10).fill(1).map((elem,index)=>index+1);
  let baseImgUrl='https://image.tmdb.org/t/p/original';
  async function getTrendingItems(pageNum){
   let {data} = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=90142caa6b0287afefb2bd4ad6d11624&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNum}`);
   setTrendingTvshows(data.results);

  }


  useEffect(() => {
   getTrendingItems(1);
  }, [])
  
  return (
    <>
    {trendingTvshows.length>0?
     <div className='row' >
     <div className='col-md-4' >
     <div className="div welcome">
       <div className= {`${style.brdr} my-4 w-25 `} ></div>
       <h2>Trending</h2>
       <h2>Tv</h2>
       <h2>To watch now</h2>
       <p className='text-muted' >most watched movies by day</p>

       <div className={`${style.brdr} my-4 w-75 `} ></div>
     </div>


     </div>

    {trendingTvshows.map((tv)=>
    <div key={tv.id} className='col-md-2 my-2' >
      <div className='tv' >
      <Link to={`/tvdetails/${tv.id}`} >
      <img className='w-100 mb-2' src={baseImgUrl+ tv.poster_path} alt="" />
      <h2 className='h6' >{tv.name}</h2>
      </Link>
      </div>
    </div>
    
    )}
    </div>:<div className='vh-100 d-flex justify-content-center align-items-center' >
      <i className='fas fa-spinner fa-spin fa-3x text-white '></i>
      </div>}

      <nav aria-label="..." className='py-4'  >
     <ul className="pagination pagination-sm d-flex justify-content-center ">
       
      {
       nums.map((pageNum)=> <li onClick={()=>getTrendingItems(pageNum)} key={pageNum} className="page-item"><a class="page-link bg-transparent text-white ">{pageNum}</a></li>)
      }
       
     </ul>
   </nav>
    </>
  )
}


