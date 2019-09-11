import React, { useReducer, useEffect } from 'react';
import './App.css';
import spinner from './ajax-loader.gif'
import Header from './components/Header'
import Search from './components/Search'
import Movie from './components/Movie'

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

const initialState = {
  loading: true,
  movies:[],
  errorMessage: null
}

const reducer = (state,action) => {
   switch (action.type) {
     case "SEARCH_MOVIES_REQUEST":
       return {
         ...state,
         loading: true,
         errorMessage: null
       }
      case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading:false,
        movies:action.payload
      }
      case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading:false,
        errorMessage:action.error
      }
     default:
       return state
   }
}

const App = () => {
  const [state,dispatch] = useReducer(reducer,initialState)

  //lifecycle componetDidMount
  useEffect(() => {
     async function fetchData(){
       let res = await fetch(MOVIE_API_URL);
       let data = await res.json()
       dispatch({
         type:'SEARCH_MOVIES_SUCCESS',
         payload: data.Search
       })
     }
     fetchData()
  },[])

  const search = searchValue => {
     dispatch({
       type:"SEARCH_MOVIES_REQUEST"
     })

     //search movie
     fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if(data.Response === 'True'){
             dispatch({
               type:"SEARCH_MOVIES_SUCCESS",
               payload:data.Search
             })
          }else{
            dispatch({
              type:"SEARCH_MOVIES_FAILURE",
              error:data.error
            })
          }
        })
  }

  const { movies, loading, errorMessage } = state
  return (
    <div className="App">
       <Header textName="Hooked"/>
       <Search search={search}/>
       <p className="App-intro">Sharing a few of our favourite movies</p>
       {loading && !errorMessage ? (
          <img className="spinner" src={spinner} alt="loading spinner"/>
       ) : errorMessage ? (
         <div className="errorMessage">{errorMessage}</div>
       ) : (
         movies.map((movie,index) => (
           <Movie key={`${index}-${movie.Title}`} movie={movie}/>
         ))
       )}
    </div>
  );
}

export default App;
