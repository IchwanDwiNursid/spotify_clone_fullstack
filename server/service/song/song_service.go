package song

import (
	"server/model/payload"
	"server/model/web"

	"golang.org/x/net/context"
)

type SongService interface {
	Create(ctx context.Context, request *web.UploadSongPayload) (string, error)
	List(ctx context.Context) []payload.Song
	Delete(ctx context.Context, id int) (string, error)
}
