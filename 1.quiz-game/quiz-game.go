package main

import (
	"encoding/csv"
	"flag"
	"fmt"
	"log"
	"os"
	"time"
)

func main() {
	csvFileName := flag.String("csv", "problems.csv", "a csv file")
	timeLimit := flag.Int("time", 5, "time limit for quiz in sec")
	flag.Parse()

	// opening file using os package
	file, err := os.Open(*csvFileName)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	// reading the csv file
	reader := csv.NewReader(file)
	quizData, err := reader.ReadAll()
	if err != nil {
		log.Fatal(err)
	}

	// creating a new array of type problems
	problems := parseProblems(quizData)

	// starting timer for the quiz
	timer := time.NewTimer(time.Duration(*timeLimit) * time.Second)

	// running the quiz
	score := 0
runningQuiz:
	for i, p := range problems {
		ansChn := make(chan string)
		go func() {
			fmt.Println("Problem ", i+1, ": ", p.question)
			var ans string
			fmt.Scanf("%s\n", &ans)
			ansChn <- ans
		}()
		select {
		case <-timer.C:
			fmt.Println("\n⚠ Time out ⚠")
			break runningQuiz
		case answer := <-ansChn:
			if answer == p.answer {
				score++
				fmt.Println("Correct :)")
			} else {
				fmt.Println("Wrong :(")
			}
		}
	}
	fmt.Printf("You have scored %d out of %d.\n", score, len(problems))

}

func parseProblems(quizData [][]string) []problem {
	problems := make([]problem, len(quizData))

	for i, line := range quizData {
		problems[i] = problem{
			question: line[0],
			answer:   line[1],
		}
	}

	return problems
}

type problem struct {
	question string
	answer   string
}
