package album

import (
	"server/model/payload"
	"server/model/web"

	"golang.org/x/net/context"
)

type AlbumService interface {
	Create(ctx context.Context, request web.UploadAlbumPayload) (string, error)
	List(ctx context.Context) []payload.Album
	Delete(ctx context.Context, id int) (string, error)
}
