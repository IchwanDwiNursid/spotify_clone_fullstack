package payload

type Song struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	Image    string `json:"image"`
	File     string `json:"file"`
	Desc     string `json:"desc"`
	Duration string `json:"duration"`
	Album    string `json:"album"`
}
