package helper

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/google/uuid"
	"github.com/tcolgate/mp3"
)

func HandleAudioUploadDuration(filePath string) (string, error) {
	var t float64
	file, err := os.Open(filePath)

	if err != nil {
		return "", err
	}

	defer file.Close()

	d := mp3.NewDecoder(file)
	var f mp3.Frame
	skipped := 0

	for {

		if err := d.Decode(&f, &skipped); err != nil {
			if err == io.EOF {
				break
			}
			fmt.Println(err)
		}

		t = t + f.Duration().Seconds()
	}

	duration := time.Duration(t * float64(time.Second))
	minutes := int(duration.Minutes())
	seconds := int(duration.Seconds()) - (minutes * 60)

	formatted_duration := fmt.Sprintf("%02d:%02d", minutes, seconds)
	return formatted_duration, nil
}

func HandleUploadFile(r *http.Request, key string) (string, error) {
	err := r.ParseMultipartForm(15 << 20)
	if err != nil {
		return "", err
	}

	file, handler, err := r.FormFile(key)

	if err != nil {
		return "", err
	}

	defer file.Close()

	uploadDir := "./public/assets/"

	err = os.MkdirAll(uploadDir, os.ModePerm)

	if err != nil {
		return "", err
	}

	ext := filepath.Ext(handler.Filename)

	newFileName := uuid.New().String() + ext

	filePath := filepath.Join(uploadDir, newFileName)

	dst, err := os.Create(filePath)

	if err != nil {
		return "", err
	}

	defer dst.Close()

	_, err = io.Copy(dst, file)

	if err != nil {
		return "", err
	}
	return newFileName, nil
}
