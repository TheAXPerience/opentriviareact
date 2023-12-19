import { Container, Row } from 'reactstrap';
import QuizGameForm from '../features/quizGame/QuizGameForm';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import QuizGameQuestionCard from '../features/quizGame/QuizGameQuestionCard';
import QuizGameResultsCard from '../features/quizGame/QuizGameResultsCard';
import { nextQuestion } from '../features/quizGame/quizGameSlice';

const GamePage = () => {
    const [currentIndex, setCurrentIndex] = useState(undefined);
    const categoriesIsLoading = useSelector((state) => state.categories.isLoading);
    const errorMessage = useSelector((state) => state.categories.errorMessage);
    const question = useSelector(nextQuestion(currentIndex));

    const nextIndex = () => setCurrentIndex(currentIndex + 1);

    let content = null;

    if (categoriesIsLoading) {
        content = (
            <>
                <Row>
                    <h1>Open Trivia Game</h1>
                </Row>
                <i className='fa fa-spinner' />
            </>
        );
    } else if (errorMessage) {
        content = (
            <>
                <Row>
                    <h3 className='text-danger'>{errorMessage}</h3>
                </Row>
            </>
        );
    } else if (currentIndex === undefined) {
        content = (
            <>
                <Row>
                    <h1>Open Trivia Game</h1>
                </Row>
                <QuizGameForm setCurrentIndex={setCurrentIndex} />
            </>
        );
    } else if (question === null) {
        content = <QuizGameResultsCard />
    } else {
        content = <QuizGameQuestionCard index={currentIndex} question={question} nextIndex={nextIndex} />
    }

    return (
        <Container className='sm-8'>
            {content}
        </Container>
    )
}

export default GamePage;
