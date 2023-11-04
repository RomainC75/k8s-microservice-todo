package migration

import (
	"fmt"
	"log"

	userModels "github.com/saegus/test-technique-romain-chenard/internal/modules/user/models"
	"github.com/saegus/test-technique-romain-chenard/pkg/database"
)

func Migrate() {
	db := database.Connection()
	err := db.AutoMigrate(&userModels.User{})
	// err := db.AutoMigrate(&userModels.User{}, &articleModels.Article{})

	if err != nil {
		log.Fatal("Cant migrate")
		return
	}

	fmt.Println("migration done ...")
}
