import React from "react"
import { useNavigate } from "react-router-dom"

const SingleMovieCard = ({ image, rating, vote, title, genre, cast }) => {
  const navigate = useNavigate()

  const handleOpenMovidDetails = () => {
    navigate(`/movie/${title}`, {
      state: { image, title, cast },
    })
  }

  return (
    <div onClick={handleOpenMovidDetails} className="cursor-pointer">
      <div className="card">
        <img src={image} className="card-img" alt="" />
        <div className="card-body">
          <ion-icon name="heart-sharp"></ion-icon>
          <div className="flex justify-between items-center mt-1">
            <p>{rating}%</p>
            <p>{vote} votes</p>
          </div>
        </div>
      </div>
      <h3 className="text-lg">{title}</h3>
      <p className="detail">{genre}</p>
    </div>
  )
}

export default SingleMovieCard
