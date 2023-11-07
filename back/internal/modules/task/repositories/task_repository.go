package repositories

import (
	"errors"

	models "github.com/saegus/test-technique-romain-chenard/internal/modules/task/models"
	database "github.com/saegus/test-technique-romain-chenard/pkg/database"
	"github.com/saegus/test-technique-romain-chenard/pkg/utils"
	"gorm.io/gorm"
)

type TaskRepository struct {
	DB *gorm.DB
}

func New() *TaskRepository{
	return  &TaskRepository{
		DB: database.Connection(),
	}
}

func (taskRepository *TaskRepository) CreateTask(task models.Task) (models.Task, error){
	utils.PrettyDisplay(task)
	var newTask models.Task
	result := taskRepository.DB.Create(&task).Scan(&newTask)
	if result.RowsAffected == 0 {
		return models.Task{}, errors.New("error trying to create a new task")
	}
	return newTask, nil
}

func (taskRepository *TaskRepository) GetTasks(listId string) []models.Task{
	var foundTasks []models.Task
	taskRepository.DB.Where("list_id = ? ", listId).Find(&foundTasks)
	return foundTasks
}