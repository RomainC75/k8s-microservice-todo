package services

import (
	"github.com/google/uuid"
	ListModel "github.com/saegus/test-technique-romain-chenard/internal/modules/list/models"
	ListRepository "github.com/saegus/test-technique-romain-chenard/internal/modules/list/repositories"
	ListRequest "github.com/saegus/test-technique-romain-chenard/internal/modules/list/requests"
)

type ListService struct {
	listRepository ListRepository.ListRepositoryInterface
}

func New() *ListService{
	return &ListService{
		listRepository: ListRepository.New(),
	}
}

func (listService *ListService) CreateList (list ListRequest.CreateListRequest, userId string) (ListModel.List, error){
	var newList ListModel.List
	userUuid, _ := uuid.Parse(userId)
	newList.Name = list.Name
	newList.UserId = userUuid
	newList, err := listService.listRepository.CreateList(newList)
	if err != nil{
		return ListModel.List{}, err
	}

	return newList, nil

}

func (listService *ListService) GetLists (userId string) ([]ListModel.List, error){
	return []ListModel.List{}, nil
}