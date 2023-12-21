import { useDispatch, useSelector } from "react-redux";
import { getAnswers, getCategoryName, getName } from "./quizGameSlice";
import { Badge, Carousel, CarouselControl, CarouselItem, Col, Row } from "reactstrap";
import { useEffect, useState } from "react";
import QuizGameResultsAnswer from "./QuizGameResultsAnswer";
import { addScore } from "../highScores/highScoresSlice";
import './QuizGameResultsCard.css';

const QuizGameResultsCard = () => {
    const [totalScore, setTotalScore] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const dispatch = useDispatch();
    const name = useSelector(getName);
    // const categoryId = useSelector(getCategoryId);
    const categoryName = useSelector(getCategoryName);
    const answers = useSelector(getAnswers);
    const questions = useSelector((state) => state.quizGame.questions);

    // update leaderboards
    useEffect(() => {
        let finalScore = answers.reduce((acc, curr, idx) => {
            const [answer, time] = curr;
            const question = questions[idx];
            if (question.correctAnswer === answer) {
                acc += time;
            }
            return acc;
        }, 0);

        dispatch(addScore({
            name: name,
            category: categoryName,
            score: finalScore
        }));
        setTotalScore(finalScore);
    }, []);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === answers.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? answers.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }
    
    const items = answers.map((answer, idx) => {
        const [ans, time] = answer
        const q = questions[idx];
        const isCorrect = (q.correctAnswer === ans);
        
        return (
            <QuizGameResultsAnswer
                questionIndex={idx+1}
                question={q.question}
                answer={ans}
                score={isCorrect ? time : 0}
                isCorrect={isCorrect}
            />
        );
    });

    const slides = items.map((item, idx) => {
        return (
            <CarouselItem
                tag='div'
                key={idx}
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                className="results-carousel"
            >
                {item}
            </CarouselItem>
        );
    })

    return (
        <>
            <Row>
                <h1>Results</h1>
            </Row>
            <Row className='results-header'>
                <Col className='results-header-txt sm-3'><h5>{name}</h5></Col>
                <Col className="results-header-txt sm-3">
                    <h4>Score: {totalScore}</h4>
                </Col>
                <Col className='results-header-txt sm-3'><h5>{categoryName}</h5></Col>
            </Row>
            <Row>
                <Carousel
                    activeIndex={activeIndex}
                    next={next}
                    previous={previous}
                    interval={null}
                    keyboard
                    className="results-carousel"
                >
                    {slides}
                    <CarouselControl
                        direction='prev'
                        directionText='previous'
                        onClickHandler={previous}
                        className='carousel-button'
                    />
                    <CarouselControl
                        direction='next'
                        directionText='next'
                        onClickHandler={next}
                        className='carousel-button'
                    />
                </Carousel>
            </Row>
        </>
    );
}

export default QuizGameResultsCard;