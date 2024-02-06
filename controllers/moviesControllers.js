const mongoose = require("mongoose")

const Schema = mongoose.Schema

const baseSchema = new Schema({
        "adult": Boolean,
        "backdrop_path": String,
        "id": Number,
        "title": String,
        "original_language": String,
        "original_title": String,
        "overview": String,
        "poster_path": String,
        "media_type": String,
        "genre_ids": Array,
        "popularity": mongoose.Decimal128,
        "release_date": String,
        "video": Boolean,
        "vote_average": mongoose.Decimal128,
        "vote_count": Number

        }, { discriminatorKey: 'type' });
const MoviesModel = mongoose.model('movies', baseSchema);

const genre = [
        {
          "id": 28,
          "name": "Action"
        },
        {
          "id": 12,
          "name": "Adventure"
        },
        {
          "id": 16,
          "name": "Animation"
        },
        {
          "id": 35,
          "name": "Comedy"
        },
        {
          "id": 80,
          "name": "Crime"
        },
        {
          "id": 99,
          "name": "Documentary"
        },
        {
          "id": 18,
          "name": "Drama"
        },
        {
          "id": 10751,
          "name": "Family"
        },
        {
          "id": 14,
          "name": "Fantasy"
        },
        {
          "id": 36,
          "name": "History"
        },
        {
          "id": 27,
          "name": "Horror"
        },
        {
          "id": 10402,
          "name": "Music"
        },
        {
          "id": 9648,
          "name": "Mystery"
        },
        {
          "id": 10749,
          "name": "Romance"
        },
        {
          "id": 878,
          "name": "Science Fiction"
        },
        {
          "id": 10770,
          "name": "TV Movie"
        },
        {
          "id": 53,
          "name": "Thriller"
        },
        {
          "id": 10752,
          "name": "War"
        },
        {
          "id": 37,
          "name": "Western"
        }
      
]

const handleFetchMovieByTitle = async(req,res)=>{
    try{
        const movie = await MoviesModel.findOne({
            title:{
                $regex:req.query.search,
                $options:"i"
            }
        })
        if(movie)
        {
            return res.status(200).json(movie)

        }
        return res.status(404).json({
            "message":`${req.query.search} movie not found`
        })
    }
    catch(err)
    {
        return res.status(500).json({
            "message":"Something went wrong"
        })
    }
}

const handleFetchMoviesByYear = async(req,res)=>{
    try{
       
        const movies = await MoviesModel.find({
            release_date:{
                $regex:req.query.search
            }
        })
        return res.status(200).json(movies)
    }
    catch(err)
    {
        return res.status(500).json({
            "message":"Something went wrong"
        })
    }
}

const handleFetchMoviesByGenre = async(req,res)=>{
    try{
        const genreId = genre.filter((eachEntry)=>eachEntry.name.toLowerCase().includes(req.query.search.toLowerCase()))[0]
        console.log(genreId)
        const movies = await MoviesModel.find({
            genre_ids:{$in: [genreId.id]}
        })
        return res.status(200).json(movies)
    }
    catch(err)
    {
        return res.status(500).json({
            "message":"Something went wrong"
        })
    }
}

const handleDeleteMovieByTitle = async(req,res)=>{
    try{
       
        await MoviesModel.findOneAndDelete({
            title:req.body.title

        })
        return res.status(200).json({
            "message":"Successful"
        })
    }
    catch(err)
    {
        return res.status(500).json({
            "message":"Something went wrong"
        })
    }
}

const handleAddNewMovieDetails = async(req,res)=>{
    try{
        const movie = await MoviesModel.insertMany([req.body])
        console.log(movie)
        return res.status(200).json({
            "message":"sucessfully added!!"
        })
    }
    catch(err)
    {
        return res.status(500).json({
            "message":"Something went wrong"
        })
    }
}
const handleUpdateMovieDeatails = async(req,res)=>{
    try{
        await MoviesModel.findOneAndUpdate({
            title:{
                $regex:req.query.search,
                $options:"i"
            }},
        req.body
        )
        const updatedMovie =  await MoviesModel.findOne({
            title:{
                $regex:req.query.search,
                $options:"i"
            }})
        return res.status(200).json(updatedMovie)
    }
    catch(err)
    {
        return res.status(500).json({
            "message":"Something went wrong"
        })
    }
}

module.exports = {
    handleFetchMovieByTitle,
    handleFetchMoviesByYear,
    handleDeleteMovieByTitle,
    handleAddNewMovieDetails,
    handleUpdateMovieDeatails,
    handleFetchMoviesByGenre
}