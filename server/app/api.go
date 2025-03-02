package app

import (
	"database/sql"
	"log"
	"net/http"
	albumController "server/controller/album"
	songController "server/controller/song"
	albumRepo "server/repository/album"
	songRepo "server/repository/song"
	albumRouter "server/router/album"
	songRouter "server/router/song"
	albumService "server/service/album"
	songService "server/service/song"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

type ApiServer struct {
	addr string
	db   *sql.DB
}

func NewApiServer(addr string, db *sql.DB) *ApiServer {
	return &ApiServer{
		addr: addr,
		db:   db,
	}
}

func (s *ApiServer) Run() error {
	route := mux.NewRouter()
	route.PathPrefix("/spotify/cdn/").Handler(http.StripPrefix("/spotify/cdn/", http.FileServer(http.Dir("./public/assets")))).Methods("GET")
	subrouter := route.PathPrefix("/spotify").Subrouter()

	// Song Route
	songRepository := songRepo.NewSongRepository(s.db)
	songService := songService.NewSongService(songRepository)
	songController := songController.NewSongController(songService)
	songRout := songRouter.NewSongRouter(subrouter, songController)
	songRout.NewSongRoute()

	// Album Route
	albumRepository := albumRepo.NewAlbumRepository(s.db)
	albumService := albumService.NewAlbumService(albumRepository)
	albumController := albumController.NewAlbumController(albumService)
	albumRout := albumRouter.NewAlbumRoute(albumController, subrouter)
	albumRout.NewAlbumRoute()

	log.Println("Server Listen On Port" + s.addr)

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowCredentials: true,
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
	})

	handler := c.Handler(route)
	return http.ListenAndServe(s.addr, handler)
}
