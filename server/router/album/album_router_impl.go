package album

import (
	"server/controller/album"

	"github.com/gorilla/mux"
)

type AlbumRouterImpl struct {
	Router          *mux.Router
	AlbumController album.AlbumController
}

func NewAlbumRoute(c album.AlbumController, r *mux.Router) AlbumRouter {
	return &AlbumRouterImpl{
		AlbumController: c,
		Router:          r,
	}
}

func (a *AlbumRouterImpl) NewAlbumRoute() {
	a.Router.HandleFunc("/album", a.AlbumController.Create).Methods("POST")
	a.Router.HandleFunc("/albums", a.AlbumController.List).Methods("GET")
	a.Router.HandleFunc("/album", a.AlbumController.Delete).Methods("DELETE")
}
