package repositories

import (
	"errors"
	"fmt"

	models "github.com/saegus/test-technique-romain-chenard/internal/modules/list/models"
	database "github.com/saegus/test-technique-romain-chenard/pkg/database"
	"github.com/saegus/test-technique-romain-chenard/pkg/utils"
	"gorm.io/gorm"
)

type ListRepository struct {
	DB *gorm.DB
}

func New() *ListRepository{
	return  &ListRepository{
		DB: database.Connection(),
	}
}

	

func (ListRepository *ListRepository) CreateList(list models.List) (models.List, error){
	fmt.Println("REPO : ", list)
	utils.PrettyDisplay(list)
	var newList models.List
	result := ListRepository.DB.Create(&list).Scan(&newList)
	if result.RowsAffected == 0 {
		return models.List{}, errors.New("error trying to creat a new user")
	}
	fmt.Println("new LIst : ", newList)
	return newList, nil
}

func (ListRepository *ListRepository) GetLists(userId string) ([]models.List, error){
	fmt.Println("user_id : ", userId)
	var foundLists []models.List
	result := ListRepository.DB.Where("user_id = ?", userId).Find(&foundLists)
	if result.RowsAffected == 0 {
		return []models.List{}, errors.New("error trying to creat a new user")
	}
	return foundLists, nil
}

// func (ListRepository *ListRepository) GetLists(userId string) ([]models.List, error){
// 	fmt.Println("user_id : ", userId)
// 	var foundUser models.List
// 	result := ListRepository.DB.Where("user_id = ?", userId).First(&foundUser)
// 	if result.RowsAffected == 0 {
// 		return []models.List{}, errors.New("error trying to creat a new user")
// 	}
// 	return []models.List{}, nil
// }