package main

import (
	"log"
	"net/http"
	"net/mail"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tools/mailer"
)

func main() {
	app := pocketbase.New()

	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		// TODO:
		// se.Router is pocketbase's router
		se.Router.BindFunc(func(e *core.RequestEvent) error {
			// this is a middleware that will run for every request
			// set your CORS headers here
			origin := e.Request.Header.Get("Origin")
			// You might want to validate "origin" against a whitelist

			// Example of a simple CORS setup:
			e.Response.Header().Set("Access-Control-Allow-Origin", origin)
			e.Response.Header().Set("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS")
			e.Response.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
			e.Response.Header().Set("Access-Control-Allow-Credentials", "true")

			// handle preflight
			if e.Request.Method == http.MethodOptions {
				return e.NoContent(http.StatusNoContent)
			}

			return e.Next()
		})

		return se.Next()
	})

	app.OnRecordAfterCreateSuccess("contact_me").BindFunc(func(e *core.RecordEvent) error {
		// Contact Me Event Hook to Notify on email
		log.Println((e.Record))

		message := &mailer.Message{
			From: mail.Address{
				Address: e.App.Settings().Meta.SenderAddress,
				Name:    e.App.Settings().Meta.SenderName,
			},
			// To:      []mail.Address{{Address: e.Record.Email()}},
			To:      []mail.Address{{Address: "contactshaankhan@gmail.com"}},
			Subject: "AllAspectz Contact Form Submission",
			HTML:    "TODO: Testing!",
			// bcc, cc, attachments and custom headers are also supported...
		}

		e.App.NewMailClient().Send(message)

		log.Println("On Contact ME Record creation!")

		return e.Next()
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
