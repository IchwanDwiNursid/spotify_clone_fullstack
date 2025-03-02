package album

import (
	"database/sql"
	"log"
	"server/model/payload"

	"golang.org/x/net/context"
)

type AlbumRepositoryImpl struct {
	db *sql.DB
}

func NewAlbumRepository(db *sql.DB) AlbumRepository {
	return &AlbumRepositoryImpl{
		db: db,
	}
}

func (repository *AlbumRepositoryImpl) Create(ctx context.Context, payload payload.Album) error {
	SQL := "INSERT INTO albums (name,image,description,bgColor) VALUES($1,$2,$3,$4)"

	_, err := repository.db.ExecContext(ctx, SQL, payload.Name, payload.Image, payload.Desc, payload.BgColor)

	if err != nil {
		return err
	}

	return nil
}

func (repository *AlbumRepositoryImpl) List(ctx context.Context) []payload.Album {
	SQL := "SELECT id, name, image, description, bgColor FROM albums"

	rows, err := repository.db.QueryContext(ctx, SQL)

	if err != nil {
		log.Println(err)
	}

	defer rows.Close()

	var albums []payload.Album

	for rows.Next() {
		var album payload.Album
		err := rows.Scan(&album.ID, &album.Name, &album.Image, &album.Desc, &album.BgColor)
		if err != nil {
			log.Println(err)
			continue
		}

		albums = append(albums, album)
	}

	return albums
}

func (repository *AlbumRepositoryImpl) Delete(ctx context.Context, id int) error {
	SQL := "DELETE FROM albums WHERE id = $1"

	_, err := repository.db.ExecContext(ctx, SQL, id)

	if err != nil {
		return err
	}

	return nil
}
