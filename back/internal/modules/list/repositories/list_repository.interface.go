package repositories

import (
	models "github.com/saegus/test-technique-romain-chenard/internal/modules/list/models"
	ListRequest "github.com/saegus/test-technique-romain-chenard/internal/modules/list/requests"
)

type ListRepositoryInterface interface {
	CreateList(list ListRequest.CreateListRequest, userId string) (models.List, error)
	GetLists(userId string) ([]models.List, error)
}
