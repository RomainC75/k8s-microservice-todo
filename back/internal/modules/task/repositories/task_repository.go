package repositories

import (
	"errors"
	"fmt"

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
	fmt.Println("============================new task")
	utils.PrettyDisplay(task)
	var newList models.Task
	result := taskRepository.DB.Create(&task).Scan(&newList)
	if result.RowsAffected == 0 {
		return models.Task{}, errors.New("error trying to create a new task")
	}
	return newList, nil
}

