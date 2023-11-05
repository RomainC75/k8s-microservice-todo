package repositories

import (
	"errors"

	"github.com/google/uuid"
	models "github.com/saegus/test-technique-romain-chenard/internal/modules/list/models"
	ListRequest "github.com/saegus/test-technique-romain-chenard/internal/modules/list/requests"
	database "github.com/saegus/test-technique-romain-chenard/pkg/database"
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

	

func (ListRepository *ListRepository) CreateList(list ListRequest.CreateListRequest, userId string) (models.List, error){
	userUuid, _ := uuid.Parse(userId)
	listToCreate := models.List{
		Name: list.Name,
		UserId: userUuid,
	}
	
	var newList models.List
	result := ListRepository.DB.Create(&listToCreate).Scan(&newList)
	if result.RowsAffected == 0 {
		return models.List{}, errors.New("error trying to creat a new user")
	}
	return newList, nil
}

func (ListRepository *ListRepository) GetLists(userId string) ([]models.List, error){
	var foundUser models.List
	result := ListRepository.DB.Where("user_id = ?", userId).First(&foundUser)
	if result.RowsAffected == 0 {
		return []models.List{}, errors.New("error trying to creat a new user")
	}
	return []models.List{}, nil
}