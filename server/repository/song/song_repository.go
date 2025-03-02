package song

import (
	"context"
	"server/model/payload"
)

type SongRepository interface {
	Create(ctx context.Context, payload payload.Song) error
	List(ctx context.Context) []payload.Song
	Delete(ctx context.Context, id int) error
}
