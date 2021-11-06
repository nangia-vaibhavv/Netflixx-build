import React, { useState, useEffect } from "react"
import axios from "./axios"
import "./Row.css"
import movieTrailer from 'movie-trailer'
import YouTube from "react-youtube"



//passing props for titke by default it is false
function Row({ title, fetchUrl, isLargeRow = false }) {


    const [movies, setMovies] = useState([]);
    const base_url = "https://image.tmdb.org/t/p/original/";
    const [trailerUrl, setTrailerUrl] = useState("")

    useEffect(() => {
    async function fetchData(){
        const request=await axios.get(fetchUrl);
        setMovies(request.data.results);

        return request;
    }
    fetchData();
    }, [fetchUrl])


   


    const handleTrailer = (movie) => {
        if (trailerUrl) {
            setTrailerUrl("")
        } else {
            movieTrailer(movie?.name || "").then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search)
                setTrailerUrl(urlParams.get('v'));
            // }).catch(() => console.log('Temporary unavailable'))
                         }).catch(()=> alert('Sorry! Trailer for the selected movie is not available at this moment'))

        }
    }


    const opts = {
        
        height: "390",
        width: "100%",
        playerVar: {
            autopplay: 1,
        },
    };

    /*console.log(movies)*/

    return (
        <div className="row">
            {/* <h2>This is a title</h2>*/}

            <h2>{title}</h2>

            <div className="row_posters">
                {movies.map(movie=>(

                <img
                className={`row_poster ${isLargeRow && "row_posterLarge"}`} 
                key={movie.id}
                onClick={()=>handleTrailer(movie)}
                src={`${base_url}${
                    isLargeRow ? movie.poster_path:movie.backdrop_path
                }`} alt={movie.name} />
            ))}
            


            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}
            />}
        </div>
    )
}

export default Row;


