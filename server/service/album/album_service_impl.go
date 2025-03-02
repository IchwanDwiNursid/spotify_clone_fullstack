package album

import (
	"context"
	"fmt"
	"server/model/payload"
	"server/model/web"
	"server/repository/album"
)

type AlbumServiceImpl struct {
	repository album.AlbumRepository
}

func NewAlbumService(r album.AlbumRepository) AlbumService {
	return &AlbumServiceImpl{
		repository: r,
	}
}

func (a *AlbumServiceImpl) Create(ctx context.Context, request web.UploadAlbumPayload) (string, error) {
	payload := payload.Album{
		Name:    request.Name,
		Image:   request.Image,
		Desc:    request.Desc,
		BgColor: request.BgColor,
	}

	err := a.repository.Create(ctx, payload)

	if err != nil {
		return "", err
	}

	return "Album created successfully", nil
}

func (a *AlbumServiceImpl) List(ctx context.Context) []payload.Album {
	albums := a.repository.List(ctx)

	if len(albums) <= 0 {
		fmt.Println("Albums is Not Found")
	}
	return albums
}

func (a *AlbumServiceImpl) Delete(ctx context.Context, id int) (string, error) {

	err := a.repository.Delete(ctx, id)
	if err != nil {
		return "", err
	} else {
		return "Album has been deleted", nil
	}
}
