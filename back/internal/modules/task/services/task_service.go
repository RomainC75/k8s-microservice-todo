package services

import (
	"github.com/google/uuid"
	TaskModel "github.com/saegus/test-technique-romain-chenard/internal/modules/task/models"
	TaskRepository "github.com/saegus/test-technique-romain-chenard/internal/modules/task/repositories"
	TaskRequest "github.com/saegus/test-technique-romain-chenard/internal/modules/task/requests"
)

type TaskService struct {
	taskRepository TaskRepository.TaskRepositoryInterface
}

func New() *TaskService{
	return &TaskService{
		taskRepository: TaskRepository.New(),
	}
}

func (taskService *TaskService) CreateTask (task TaskRequest.CreateTaskRequest, listId string) (TaskModel.Task, error){
	var newTask TaskModel.Task
	listUuid := uuid.MustParse(listId)

	newTask.Name = task.Name
	newTask.ListId = listUuid
	newTask.DeadLine = task.DeadLine
	
	newTask, err := taskService.taskRepository.CreateTask(newTask)

	if err != nil{
		return TaskModel.Task{}, err
	}
	return newTask, nil
}
