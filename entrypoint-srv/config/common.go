package config

import (
	"errors"
	"fmt"
	"os"
)

type MyEnv map[Environment]string

type Environment string

const (
    AUTH_MICROSERVICE_DOMAIN Environment = "AUTH_MICROSERVICE_DOMAIN"
    AUTH_MICROSERVICE_PORT    Environment = "AUTH_MICROSERVICE_PORT"
	NAMESPACE Environment = "NAMESPACE"
)

var myEnv *MyEnv

func SetEnv()error {
	envMap := MyEnv{}

	envs := []Environment{
		AUTH_MICROSERVICE_DOMAIN,
		AUTH_MICROSERVICE_PORT,
		NAMESPACE,
	}

	for _,env := range envs {
		variable := os.Getenv(string(env))
		fmt.Println("->", variable)
		if len(variable)==0{
			return errors.New(fmt.Sprintf(" => [ %s ] variable not found ! ", env))
		}
		envMap[env]= variable
	}
	myEnv = &envMap
	return nil
}


func Getenv() MyEnv{
	return *myEnv
}
