import logo from './logo.svg';
import './App.css';
import Navbar from './/Components/Navbar/Navbar';
import Movies from './/Components/Movies/Movies';
import Tvshows from './/Components/Tvshows/Tvshows';
import People from './/Components/People/People';
import Login from './/Components/Login/Login';
import Register from './/Components/Register/Register';
import Notfound from './/Components/Notfound/Notfound';
import MovieDetails from './Components/Details/MovieDetails';
import TvDetails from './Components/TvDetails/TvDetails';
import { Routes,Route } from 'react-router-dom';
import { useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import {useNavigate,Navigate} from 'react-router-dom';


export default function App() {

 const [userData,setUserData]=useState(null);
 let navigate=useNavigate()
 function savaUserData(){
 let encodedToken= localStorage.getItem('userToken');
 let decodedToken=jwtDecode(encodedToken);
 setUserData(decodedToken);
 }
  
  function logout(){
     localStorage.removeItem('userToken');
     setUserData(null);
     navigate('/login');
  }


 useEffect(() => {
   if(localStorage.getItem('userToken')!=null)
   {
    savaUserData();
   }  
 }, [])
  

 function ProtectRoute(props){
  if(localStorage.getItem('userToken')==null){
     return <Navigate to='/login'  />
  }
  else{
    return props.children;
  }
 }

  return (
    <>
    <Navbar userData={userData} logout={logout} />
    <div className="container">
     <Routes>
     <Route path='/' element={<ProtectRoute><Movies/></ProtectRoute>}></Route>
      <Route path='movies' element={<ProtectRoute><Movies/></ProtectRoute>}></Route>
      <Route path='tvshows' element={<ProtectRoute><Tvshows/></ProtectRoute>}></Route>
      <Route path='people' element={<ProtectRoute><People/></ProtectRoute>}></Route>
      <Route path='login' element={<Login savaUserData={savaUserData} />}></Route>
      <Route path='register' element={<Register/>}></Route>
      <Route path='moviedetails' element={<ProtectRoute><MovieDetails/></ProtectRoute>}>      
      <Route path=':id' element={<ProtectRoute><MovieDetails/></ProtectRoute>}/>
      </Route>
      <Route path='tvdetails' element={<ProtectRoute><TvDetails/></ProtectRoute>}>      
      <Route path=':id' element={<ProtectRoute><TvDetails/></ProtectRoute>}/>
      </Route>
      <Route path='*' element={<Notfound/>}></Route>
     </Routes>
    </div>
    </>
  );
}


