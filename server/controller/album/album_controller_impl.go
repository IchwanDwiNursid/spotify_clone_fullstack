package album

import (
	"fmt"
	"net/http"
	"server/helper"
	"server/model/web"
	"server/service/album"
)

type AlbumControllerImpl struct {
	AlbumService album.AlbumService
}

func NewAlbumController(albumService album.AlbumService) AlbumController {
	return &AlbumControllerImpl{
		AlbumService: albumService,
	}
}

func (a *AlbumControllerImpl) Create(w http.ResponseWriter, r *http.Request) {
	albumRequest := web.UploadAlbumPayload{}

	image, err := helper.HandleUploadFile(r, "image")

	if err != nil {
		fmt.Println(err.Error())
	}

	albumRequest.Name = r.FormValue("name")
	albumRequest.BgColor = r.FormValue("bgColor")
	albumRequest.Desc = r.FormValue("desc")
	albumRequest.Image = image

	suc, err := a.AlbumService.Create(r.Context(), albumRequest)

	var webResponse web.WebResponse

	if err != nil {
		webResponse = web.WebResponse{
			Code:   500,
			Status: "Failed",
			Data:   err.Error(),
		}
	} else {
		webResponse = web.WebResponse{
			Code:   200,
			Status: "Success",
			Data:   suc,
		}
	}

	helper.WriteToResponseBody(w, webResponse)
}

func (a *AlbumControllerImpl) List(w http.ResponseWriter, r *http.Request) {
	albums := a.AlbumService.List(r.Context())

	webResponse := web.WebResponse{
		Code:   200,
		Status: "Success",
		Data:   albums,
	}

	helper.WriteToResponseBody(w, webResponse)
}

func (a *AlbumControllerImpl) Delete(w http.ResponseWriter, r *http.Request) {
	idAlbum := web.DeleteAlbumByName{}

	helper.ReadFromRequestBody(r, &idAlbum)

	res, err := a.AlbumService.Delete(r.Context(), idAlbum.ID)

	if err != nil {
		fmt.Println(err.Error())
	}

	webResponse := web.WebResponse{
		Code:   200,
		Status: "Success",
		Data:   res,
	}

	helper.WriteToResponseBody(w, webResponse)
}
