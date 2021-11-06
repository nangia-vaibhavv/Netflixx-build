import React,{useState,useEffect} from 'react';
import './Banner.css';
import axios from './axios';
import requests from './Request';



import movieTrailer from 'movie-trailer'
import YouTube from "react-youtube"




function Banner(props) {
    const {classes} = props
    const [movie, setMovie] = useState([])



    const [trailerUrl, setTrailerUrl] = useState("")




    useEffect(()=>{
async function fetchData(){
    const request = await axios.get(requests.fetchNetflixOriginals)
    setMovie(
        request.data.results[
            Math.floor(Math.random() * request.data.results.length-1)
        ]
    )
    return request

}
fetchData()
    },[])





    const handleTrailer = (movie) => {
        if (trailerUrl) {
            setTrailerUrl("")
        } else {
            movieTrailer(movie?.name || "").then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search)
                setTrailerUrl(urlParams.get('v'));
            // }).catch(() => console.log('Temporary unavailable get off'))
             }).catch(()=> alert('Sorry! Trailer for the selected movie is not available at this moment'))
        }
    }

    const opts = {
        height: "490",
        width: "100%",
        playerVar: {
            autopplay: 1,
        },
    };





// console.log(movie);
    function truncate(string, n){
        return string?.length>n ? string.substr(0,n-1)+'...': string;
    }
    return (
        <header 
        className="banner"
        style={{
            backgroundSize:"cover",
            backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`
        }}
        >
        
            <div className="banner_contents">
            <h1 className="banner_title">{movie?.title || movie?.name || movie?.orinal_name}</h1>
            <div className="banner_buttons">
            <button     onClick={()=>handleTrailer(movie)} className="banner_button">Play</button>
            
            <button className="banner_button">My List</button>
            </div>
            <h1 className="banner_description">{truncate(movie?.overview,150)}</h1>
            </div>
            
            <div className="banner--fadeBottom" />
            <div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}
            />}
            </div>
        </header>
        
    );
}
export default Banner
