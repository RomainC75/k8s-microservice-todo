package db

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/lib/pq"
)

type Store interface {
	Querier
	ExecTx(ctx context.Context, fn func(*Queries) error) error
}

var DbStore *Store

type SqlStore struct {
	*Queries
	db *sql.DB
}

func (store *SqlStore) ExecTx(ctx context.Context, fn func(*Queries) error) error {
	tx, err := store.db.BeginTx(ctx, &sql.TxOptions{})
	if err != nil {
		return err
	}
	q := New(tx)
	err = fn(q)
	if err != nil {
		if rbErr := tx.Rollback(); rbErr != nil {
			return fmt.Errorf("tx err: %v, rb err: %v", err, rbErr)
		}
		return err
	}
	return tx.Commit()
}

func NewStore(db *sql.DB) Store {
	return &SqlStore{
		db:      db,
		Queries: New(db),
	}
}

func Connect() {
	dsn := fmt.Sprintf("postgresql://%s:%s@%s:%s/%s?sslmode=disable",
		// viper.GetString(string(config.POSTGRES_USER)),
		// viper.GetString(string(config.POSTGRES_PASSWORD)),
		// viper.GetString(string(config.POSTGRES_HOST)),
		// viper.GetString(string(config.POSTGRES_PORT)),
		// viper.GetString(string(config.POSTGRES_DB_NAME)),
		os.Getenv("AUTH_DB_USER"),
		os.Getenv("AUTH_DB_PASSWORD"),
		fmt.Sprintf("%s.ms-todo.svc.cluster.local",os.Getenv("AUTH_SERVICE_DOMAIN")),
		os.Getenv("AUTH_DB_PORT"),
		os.Getenv("AUTH_DB_NAME"),
	)
	fmt.Println("--->", dsn)

	conn, err := sql.Open("postgres", dsn)
	store := NewStore(conn)
	if err != nil {
		log.Fatal("error trying to connect to the database : ", err)
	}
	fmt.Println("seems to be connected")

	DbStore = &store
}

func GetConnection() *Store {
	return DbStore
}
