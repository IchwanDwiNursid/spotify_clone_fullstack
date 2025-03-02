package web

type UploadAlbumPayload struct {
	Name    string `json:"name"`
	Image   string `json:"image"`
	Desc    string `json:"desc"`
	BgColor string `json:"bgColor"`
}

type DeleteAlbumByName struct {
	ID int `json:"id"`
}
