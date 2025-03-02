package web

type UploadSongPayload struct {
	Name     string `json:"name"`
	Image    string `json:"image"`
	Desc     string `json:"desc"`
	File     string `json:"file"`
	Duration string `json:"duration"`
	Album    string `json:"album"`
}

type DeleteSongById struct {
	ID int `json:"id"`
}
