package main

import (
	"fmt"
	"log"
	"os"
	"os/signal"

	fiber "github.com/gofiber/fiber/v2"
)

func StartServerWithGracefulShutdown(app *fiber.App, port string) {
	idleConnectClosed := make(chan struct{})

	go func() {
		sigint := make(chan os.Signal, 1)
		signal.Notify(sigint, os.Interrupt)
		<-sigint

		if err := app.Shutdown(); err != nil {

			log.Printf("Server is not shutting down! Reason: %v", err)

		}
		close(idleConnectClosed)
	}() 

	<-idleConnectClosed

	log.Fatal(app.Listen(":" + port))
}
func StartServer(app *fiber.App) {

	fiberConnURL, err := ConnectionURLBuilder("fiber")

	if err != nil {
		log.Printf("Server is not shutting down! Reason: %v", err)
	}

	log.Fatal(app.Listen(fiberConnURL))

}

func ConnectionURLBuilder(n string) (string, error) {

	var url string

	switch n {

	case "fiber":
		url = fmt.Sprintf(
			"%s:%s",
			os.Getenv("SERVER_HOST"),
			os.Getenv("SERVER_PORT"),
		)
	default:
		return "", fmt.Errorf("conection name '%v' is not supported", n)

	}
	return url, nil
}
