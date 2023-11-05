package services

import (
	ListModel "github.com/saegus/test-technique-romain-chenard/internal/modules/list/models"
	ListRequest "github.com/saegus/test-technique-romain-chenard/internal/modules/list/requests"
)

type ListServiceInterface interface {
	CreateList (list ListRequest.CreateListRequest, userId string) (ListModel.List, error)
	GetLists (userId string) ([]ListModel.List, error)
}
