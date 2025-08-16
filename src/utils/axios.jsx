import axios from "axios"

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTZkY2ZiMGU2OTU1YjI2OGNhNTVhOGE3OTYyMzIxZSIsIm5iZiI6MTc0ODg4NzgxMy4yMDMsInN1YiI6IjY4M2RlOTA1NjM2ZWI5NGUyOTdmNDNiYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QpKsvh3bYss-BkLZ6pb8_9GMJCwesEYIXTj3FYlcHxw'
  }
});

export default instance;