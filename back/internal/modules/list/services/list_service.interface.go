package services

import (
	ListModel "github.com/saegus/test-technique-romain-chenard/internal/modules/list/models"
	ListRequest "github.com/saegus/test-technique-romain-chenard/internal/modules/list/requests"
)

type UserServiceInterface interface {
	CreateList (list ListRequest.CreateListRequest) (ListModel.List, error)
	GetLists (userId string) ([]ListModel.List, error)
}
