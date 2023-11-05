package repositories

import (
	models "github.com/saegus/test-technique-romain-chenard/internal/modules/list/models"
)

type ListRepositoryInterface interface {
	CreateList(list models.List) (models.List, error)
	GetLists(userId string) ([]models.List, error)
}
