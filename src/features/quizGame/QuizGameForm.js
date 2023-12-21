import { Button, FormGroup, Label, Row } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { startGame } from './quizGameSlice';
import { getQuestions } from '../../utils/fetchApi';
import { validateQuizGameForm } from '../../utils/validateQuizGameForm';
import './QuizGameForm.css';

const QuizGameForm = ({ setCurrentIndex }) => {
    const categories = useSelector((state) => state.categories.categoriesList);

    const dispatch = useDispatch();

    const handleSubmit = async (values) => {
        const [id, catName] = values.category.split('~');
        const questions = await getQuestions(parseInt(id));

        const data = {
            name: values.name,
            categoryId: parseInt(id),
            categoryName: catName,
            questions: questions
        };
        console.log(data);
        dispatch(startGame(data));
        setCurrentIndex(0);
    }

    return (
            <Formik
                initialValues={{
                    name: '',
                    category: categories.length ? `${categories[0].id}~${categories[0].name}` : ''
                }}
                onSubmit={handleSubmit}
                validate={validateQuizGameForm}
            >
                <Form className='quizform'>
                    <FormGroup className='fieldgroup'>
                        <Label htmlFor='name'><h4>Name</h4></Label>
                        <br/>
                        <Field
                            name='name'
                            placeholder='Enter Your Name'
                            className='inputs'
                        />
                        <ErrorMessage name='name' className='sm-8'>
                            {(msg) => <p className='text-danger'>{msg}</p>}
                        </ErrorMessage>
                    </FormGroup>
                    <FormGroup className='fieldgroup'>
                        <Label htmlFor='category'><h4>Category</h4></Label>
                        <br/>
                        <Field
                            name='category'
                            as='select'
                            className='inputs'
                        >
                            {
                                categories.map((category) =>
                                    <option value={`${category.id}~${category.name}`} key={category.id}>{category.name}</option>
                                )
                            }
                        </Field>
                        <ErrorMessage name='category' className='sm-8'>
                            {(msg) => <p className='text-danger'>{msg}</p>}
                        </ErrorMessage>
                    </FormGroup>
                    <Button type='submit' className='submitButton'>Start Game</Button>
                </Form>
            </Formik>
    );
}

export default QuizGameForm;
