package song

import (
	"log"
	"net/http"
	"server/helper"
	"server/model/web"
	"server/service/song"
)

type SongControllerImpl struct {
	SongService song.SongService
}

func NewSongController(songService song.SongService) SongController {
	return &SongControllerImpl{
		SongService: songService,
	}
}

func (c *SongControllerImpl) Create(w http.ResponseWriter, r *http.Request) {
	songRequest := web.UploadSongPayload{}

	image, err := helper.HandleUploadFile(r, "image")

	if err != nil {
		log.Println(err)
	}

	file, err := helper.HandleUploadFile(r, "file")

	if err != nil {
		log.Println(err)
	}

	duration, _ := helper.HandleAudioUploadDuration("./public/assets/" + file)

	songRequest.Image = image
	songRequest.File = file
	songRequest.Desc = r.FormValue("desc")
	songRequest.Duration = duration
	songRequest.Name = r.FormValue("name")
	songRequest.Album = r.FormValue("album")

	suc, err := c.SongService.Create(r.Context(), &songRequest)

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

func (c *SongControllerImpl) List(w http.ResponseWriter, r *http.Request) {
	songs := c.SongService.List(r.Context())

	webResponse := web.WebResponse{
		Code:   200,
		Status: "Success",
		Data:   songs,
	}

	helper.WriteToResponseBody(w, webResponse)
}

func (c *SongControllerImpl) Delete(w http.ResponseWriter, r *http.Request) {
	idRequest := web.DeleteSongById{}

	helper.ReadFromRequestBody(r, &idRequest)
	log.Println(idRequest)

	res, err := c.SongService.Delete(r.Context(), idRequest.ID)

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
			Data:   res,
		}
	}

	helper.WriteToResponseBody(w, webResponse)
}
