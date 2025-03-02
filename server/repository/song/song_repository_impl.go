package song

import (
	"database/sql"
	"log"
	"server/model/payload"

	"golang.org/x/net/context"
)

type SongRepositoryImpl struct {
	db *sql.DB
}

func NewSongRepository(db *sql.DB) SongRepository {
	return &SongRepositoryImpl{
		db: db,
	}
}

func (repository *SongRepositoryImpl) Create(ctx context.Context, payload payload.Song) error {
	SQL := "INSERT INTO songs (name,image,file,description,duration,album) VALUES($1,$2,$3,$4,$5,$6)"

	_, err := repository.db.ExecContext(ctx, SQL, payload.Name, payload.Image, payload.File, payload.Desc, payload.Duration, payload.Album)

	if err != nil {
		return err
	}

	return nil
}

func (repository *SongRepositoryImpl) List(ctx context.Context) []payload.Song {
	SQL := "SELECT id, name, image, file, description, duration, album FROM songs"

	rows, err := repository.db.QueryContext(ctx, SQL)

	if err != nil {
		log.Println(err)
	}

	defer rows.Close()

	var songs []payload.Song

	for rows.Next() {
		var id int
		var name string
		var image string
		var file string
		var desc string
		var duration string
		var album sql.NullString
		err := rows.Scan(&id, &name, &image, &file, &desc, &duration, &album)

		if err != nil {
			log.Println(err)
			continue
		}

		song := payload.Song{
			ID:       id,
			Name:     name,
			Image:    image,
			File:     file,
			Desc:     desc,
			Duration: duration,
			Album:    album.String,
		}

		songs = append(songs, song)
	}

	return songs
}

func (repository *SongRepositoryImpl) Delete(ctx context.Context, id int) error {
	SQL := "DELETE FROM songs WHERE id = $1"

	_, err := repository.db.ExecContext(ctx, SQL, id)

	if err != nil {
		return err
	}

	return nil
}
