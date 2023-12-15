import { useDispatch } from "react-redux";
import { Button, Row, Col } from "reactstrap";
import { addAnswer } from "./quizGameSlice";
import parse from 'html-react-parser';
import { useEffect, useRef, useState } from "react";

const QUESTION_TIME = 10;

const QuizGameQuestionCard = ({ index, question, nextIndex }) => {
    const [timer, setTimer] = useState(QUESTION_TIME);
    const timerRef = useRef(null);
    const dispatch = useDispatch();

    const chooseAnswer = (answer) => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        // console.log(answer, timer);
        dispatch(addAnswer([answer, timer]));
        nextIndex();
    }

    const clearTimer = () => {
        setTimer(QUESTION_TIME);
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        timerRef.current = setInterval(
            () => {
                setTimer(time => time - 1);
            }, 1000
        );
    }

    useEffect(
        () => {
            clearTimer();
        }, [question]
    );

    useEffect(
        () => {
            if (timer <= 0) {
                chooseAnswer('');
            }
        }, [timer]
    );

    const answerButtons = question.allAnswers.map(answer => {
        return (
            <Col>
                <Button onClick={() => chooseAnswer(answer)}>{parse(answer)}</Button>
            </Col>
        );
    });

    return (
        <>
            <h3>Question #{index+1}</h3>
            <h2>{parse(question.question)}</h2>
            <Row>
                <span className='text-primary'>{timer}</span>
            </Row>
            <Row>
                {answerButtons[0]}
                {question.type === 'multiple' && answerButtons[2]}
            </Row>
            <Row>
                {answerButtons[1]}
                {question.type === 'multiple' && answerButtons[3]}
            </Row>
        </>
    );
}

export default QuizGameQuestionCard;