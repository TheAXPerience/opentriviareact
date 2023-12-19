export const validateQuizGameForm = (values) => {
    const errors = {};

    if (!values.name) {
        errors.name = 'Required';
    } else if (values.name.length < 2) {
        errors.name = 'Name must be at least 2 characters.'
    } else if (values.name.length > 20) {
        errors.name = 'Name cannot exceed 20 characters.';
    }

    return errors;
}