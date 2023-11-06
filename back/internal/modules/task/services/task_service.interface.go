package services

import (
	TaskModel "github.com/saegus/test-technique-romain-chenard/internal/modules/task/models"
	TaskRequest "github.com/saegus/test-technique-romain-chenard/internal/modules/task/requests"
)

type TaskServiceInterface interface {
	CreateTask (task TaskRequest.CreateTaskRequest, userId string) (TaskModel.Task, error)
}
