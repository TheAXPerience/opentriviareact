const NUMBER_QUESTIONS = 10;

export const shuffle = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        const j = Math.floor(Math.random() * arr.length);
        const tmp = arr[j];
        arr[j] = arr[i];
        arr[i] = tmp;
    }
    return arr;
}

/*
export const getCategories = async () => {
    let data = await fetch("https://opentdb.com/api_category.php")
        .then(response => response.text());
    data = JSON.parse(data);
    return [{id: 0, name: "All Categories"}, ...data.trivia_categories];
} */

/*
class Question {
    constructor(question) {
        this.question = question.question;
        this.correctAnswer = (question.correct_answer);
        this.allAnswers = [...question.incorrect_answers, this.correctAnswer];
        this.category = (question.category);
        this.type = (question.type);
        this.difficulty = (question.difficulty);
    }

    getAnswers() {
        // return a shuffled copy of allAnswers
        return shuffle(this.allAnswers.slice());
    }
} */

export const getQuestions = async (category=0, numQuestions=NUMBER_QUESTIONS) => {
    const url = `https://opentdb.com/api.php?amount=${numQuestions}&category=${category}`;
    const response = await fetch(url);
    if (!response.ok) {
        return Promise.reject('Unable to fetch, status: ' + response.status);
    }
    const data = await response.json();
    const questions = [];
    for (const question of data.results) {
        questions.push({
            question: question.question,
            correctAnswer: question.correct_answer,
            allAnswers: shuffle([...question.incorrect_answers, question.correct_answer]),
            category: question.category,
            type: question.type,
            difficulty: question.difficulty
        });
    }
    return questions;
}
