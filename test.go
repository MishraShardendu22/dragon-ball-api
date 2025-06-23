package main

import (
	"fmt"
	"net/http"
	"runtime"
	"sync"
)

func main() {
	fmt.Println("GOMAXPROCS:", runtime.GOMAXPROCS(0))
	var wg sync.WaitGroup

	for range 20 {
		wg.Add(1)
		go func() {
			defer wg.Done()

			res, err := http.Get("https://dragon-ball-api-grlr.onrender.com/random")
			if err != nil {
				panic(err)
			}
			defer res.Body.Close()

			if res.StatusCode == http.StatusOK {
				println("Request successful, status code:", res.StatusCode)
			} else {
				println("Request failed, status code:", res.StatusCode)
			}
		}()
	}

	wg.Wait()
}
