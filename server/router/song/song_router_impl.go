package song

import (
	"server/controller/song"

	"github.com/gorilla/mux"
)

type SongRouteImpl struct {
	Route          *mux.Router
	SongController song.SongController
}

func NewSongRouter(route *mux.Router, songController song.SongController) SongRoute {
	return &SongRouteImpl{
		Route:          route,
		SongController: songController,
	}
}

func (r *SongRouteImpl) NewSongRoute() {
	r.Route.HandleFunc("/song", r.SongController.Create).Methods("POST")
	r.Route.HandleFunc("/songs", r.SongController.List).Methods("GET")
	r.Route.HandleFunc("/song", r.SongController.Delete).Methods("DELETE")
}
