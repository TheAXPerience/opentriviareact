import { Button, FormGroup, Label, Row } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { startGame } from './quizGameSlice';
import { getQuestions } from '../../utils/fetchApi';

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
                // validate
            >
                <Form>
                    <FormGroup>
                        <Label htmlFor='name'>Name</Label>
                        <br/>
                        <Field
                            name='name'
                            placeholder='Enter Your Name'
                        />
                        <ErrorMessage name='name'>
                            {(msg) => <p className='text-danger'>{msg}</p>}
                        </ErrorMessage>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='category'>Category</Label>
                        <br/>
                        <Field
                            name='category'
                            as='select'
                        >
                            {
                                categories.map((category) =>
                                    <option value={`${category.id}~${category.name}`} key={category.id}>{category.name}</option>
                                )
                            }
                        </Field>
                        <ErrorMessage name='category'>
                            {(msg) => <p className='text-danger'>{msg}</p>}
                        </ErrorMessage>
                    </FormGroup>
                    <Button type='submit'>Start Game</Button>
                </Form>
            </Formik>
    );
}

export default QuizGameForm;
