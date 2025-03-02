package song

import (
	"fmt"
	"server/model/payload"
	"server/model/web"
	"server/repository/song"

	"golang.org/x/net/context"
)

type SongServiceImpl struct {
	Repository song.SongRepository
}

func NewSongService(repository song.SongRepository) SongService {
	return &SongServiceImpl{
		Repository: repository,
	}
}

func (s *SongServiceImpl) Create(ctx context.Context, request *web.UploadSongPayload) (string, error) {

	song := payload.Song{
		Name:     request.Name,
		Image:    request.Image,
		File:     request.File,
		Desc:     request.Desc,
		Duration: request.Duration,
		Album:    request.Album,
	}

	err := s.Repository.Create(ctx, song)

	if err != nil {
		return "", err
	}

	return "Song created succesfully", nil
}

func (s *SongServiceImpl) List(ctx context.Context) []payload.Song {
	songs := s.Repository.List(ctx)

	if len(songs) <= 0 {
		fmt.Println("Song is Not found")
	}

	return songs
}

func (s *SongServiceImpl) Delete(ctx context.Context, id int) (string, error) {
	err := s.Repository.Delete(ctx, id)

	if err != nil {
		return "", err
	}

	return "Song has been deleted", nil
}
