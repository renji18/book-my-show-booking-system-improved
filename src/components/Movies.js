import React from "react"
import SingleMovieCard from "./SingleMovieCard"
import JAWAAN from "../assets/poster/posterrr1 (1) (1).jpg"
import GADAR from "../assets/poster/posterr2.jpg"
import OMG from "../assets/poster/posterr4.jpg"
import NUN from "../assets/poster/posterr5.jpg"
import SPKK from "../assets/poster/posterr6.jpg"
import OPPENHEIMER from "../assets/poster/posterr9.jpg"

import JAWAANCAST from "../assets/cast/jawancastt.png"
import GADARCAST from "../assets/cast/gadar 2.png"
import OMGCAST from "../assets/cast/omg2cast.png"
import NUNCAST from "../assets/cast/nun2cast.png"
import SPKKCAST from "../assets/cast/SPKcast.png"
import OPPENHEIMERCAST from "../assets/cast/openheimercast.png"

const Movies = () => {
  const movieContent = [
    {
      image: JAWAAN,
      rating: 93,
      vote: "928",
      title: "Jawaan",
      genre: "Drama/Thriller",
      cast: JAWAANCAST,
    },
    {
      image: GADAR,
      rating: 92,
      vote: "16k",
      title: "Gadar 2",
      genre: "Action/Comedy",
      cast: GADARCAST,
    },
    {
      image: OMG,
      rating: 94,
      vote: "14k",
      title: "OMG 2",
      genre: "Comedy/Drama",
      cast: OMGCAST,
    },
    {
      image: OPPENHEIMER,
      rating: 84,
      vote: "226",
      title: "Oppenheimer",
      genre: "Comedy/Drama/Thriller",
      cast: OPPENHEIMERCAST,
    },
    {
      image: SPKK,
      rating: 87,
      vote: "34k",
      title: "Satyaprem ki Katha",
      genre: "Comedy/Drama/Musical",
      cast: SPKKCAST,
    },
    {
      image: NUN,
      rating: 59,
      vote: "74k",
      title: "The Nun 2",
      genre: "Horror",
      cast: NUNCAST,
    },
  ]

  return (
    <div>
      <h1 className="title px-10 lg:px-20 text-2xl">Recommended Movies</h1>

      <div className="flex px-10 lg:px-20 pb-20 pt-5 flex-wrap gap-y-10 justify-between">
        {movieContent?.map((mc) => (
          <SingleMovieCard key={mc?.title} {...mc} />
        ))}
      </div>
    </div>
  )
}

export default Movies
