package main

import (
	"entrypoint-srv/cmd"
	"time"
)

func main(){
	time.Sleep(time.Second*3600)
	cmd.Serve()
	
}