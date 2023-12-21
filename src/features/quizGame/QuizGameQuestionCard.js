import { useDispatch } from "react-redux";
import { Badge, Button, Row, Col, Card, CardBody, CardTitle, Container } from "reactstrap";
import { addAnswer } from "./quizGameSlice";
import parse from 'html-react-parser';
import { useEffect, useRef, useState } from "react";
import './QuizGameQuestionCard.css';

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
            <Col className='sm-6 answer-button-outer'>
                <Button onClick={() => chooseAnswer(answer)} className='answer-button'>
                    <h5>{parse(answer)}</h5>
                </Button>
            </Col>
        );
    });

    return (
        <Container className='text-center question-container'>
            <CardTitle className='question-card'>
                <h4>Question #{index+1}</h4>
                <h2>{parse(question.question)}</h2>
            </CardTitle>
            <CardBody>
                <Badge color='info' pill className='timer'>
                    <h6>{timer}</h6>
                </Badge>
                <Row>
                    {answerButtons[0]}
                    {question.type === 'multiple' && answerButtons[2]}
                </Row>
                <Row>
                    {answerButtons[1]}
                    {question.type === 'multiple' && answerButtons[3]}
                </Row>
            </CardBody>
        </Container>
    );
}

export default QuizGameQuestionCard;