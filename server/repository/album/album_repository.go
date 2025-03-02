package album

import (
	"context"
	"server/model/payload"
)

type AlbumRepository interface {
	Create(ctx context.Context, payload payload.Album) error
	List(ctx context.Context) []payload.Album
	Delete(ctx context.Context, id int) error
}
