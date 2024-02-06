const express = require("express")

const router = express.Router()

const moviesFunctions = require("../controllers/moviesControllers")

router.get("/get-movie-by-title",moviesFunctions.handleFetchMovieByTitle)

router.get("/get-movies-by-year",moviesFunctions.handleFetchMoviesByYear)

router.delete("/delete-movie-by-title",moviesFunctions.handleDeleteMovieByTitle)

router.post("/add-new-movie",moviesFunctions.handleAddNewMovieDetails)

router.put("/update-movie-by-title",moviesFunctions.handleUpdateMovieDeatails)

router.get("/get-movies-by-genre",moviesFunctions.handleFetchMoviesByGenre)


module.exports = router