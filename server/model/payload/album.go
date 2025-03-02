package payload

type Album struct {
	ID      int    `json:"id"`
	Name    string `json:"name"`
	Image   string `json:"image"`
	Desc    string `json:"desc"`
	BgColor string `json:"bgColor"`
}
