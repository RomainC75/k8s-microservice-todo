package repositories

import (
	models "github.com/saegus/test-technique-romain-chenard/internal/modules/task/models"
)

type TaskRepositoryInterface interface {
	CreateTask(task models.Task) (models.Task, error)
}
