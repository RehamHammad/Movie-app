import React from 'react';
import axios from 'axios';
import { useEffect,useState } from 'react';
import style from './Movies.module.scss';
import { Link } from 'react-router-dom';



export default function Movies() {
  let [trendingMovies,setTrendingMovies]=useState([]);
  let nums= new Array(10).fill(1).map((elem,index)=>index+1);

  let baseImgUrl='https://image.tmdb.org/t/p/original';
  async function getTrending(pageNumber){
   let {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=90142caa6b0287afefb2bd4ad6d11624&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`);
   setTrendingMovies(data.results);

  }

  useEffect(() => {
   getTrending(1);
  }, [])
  
  return (
    <>
     {trendingMovies.length>0?
     <>
      <div className='row' >
      <div className='col-md-4' >
      <div className="div welcome">
        <div className= {`${style.brdr} my-4 w-25 `} ></div>
        <h2>Trending</h2>
        <h2>Movie</h2>
        <h2>To watch now</h2>
        <p className='text-muted' >most watched movies by day</p>

        <div className={`${style.brdr} my-4 w-75 `} ></div>
      </div>


      </div>

     {trendingMovies.map((movie)=>
     <div key={movie.id} className='col-md-2 my-2' >
       <div className='movie' >
        <Link to={`/moviedetails/${movie.id}`} >
        <img className='w-100 mb-2' src={baseImgUrl+ movie.poster_path} alt="" />
         <h2 className='h6' >{movie.title}</h2>
        </Link>
         
       </div>
     </div>
     
     )}
     </div>
       
     <nav aria-label="..." className='py-4' >
     <ul className="pagination pagination-sm d-flex justify-content-center ">
       
      {
       nums.map((pageNum)=> <li onClick={()=>getTrending(pageNum)} key={pageNum} className="page-item"><a class="page-link bg-transparent text-white ">{pageNum}</a></li>)
      }
       
     </ul>
     </nav>
      
     </>
    
     :
     <div className='vh-100 d-flex justify-content-center align-items-center ' >
           <i className='fa-solid fa-spinner fa-3x fa-spin text-white' ></i>
     </div>
     
     }
   </>
  )
}
