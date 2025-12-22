import { useState } from 'react';
import PropTypes from 'prop-types';

const taskDefaultFormState = {
    title: '',
    description: '',
    isComplete: '',
};

const NewTaskForm = ({ onHandleSubmit }) => {
    const [formFields, setFormFields] = useState(taskDefaultFormState);

    const handleTaskNameChange = (event) => {
        const inputValue = event.target.value;
        const inputName = event.target.name;

        setFormFields(formFields => {
            return {
                ...formFields,
                [inputName]: inputValue,
            };
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onHandleSubmit(formFields);
        setFormFields(taskDefaultFormState);
    }
    const makeControlledInput = (inputName) => {
        return (
            <input
                type="text"
                name={inputName}
                id={`input-${inputName}`}
                value={formFields[inputName]}
                onChange={handleTaskNameChange}
            />
        );
    }


    return (
        <form onSubmit={handleSubmit}>
            <h1>Add a Task</h1>
            <div>
                <label htmlFor="input-title">Task: </label>
                { makeControlledInput('title')}
            </div>
            <div>
                <label htmlFor="input-description">Description: </label>
                { makeControlledInput('description')}
            </div>
            <div>
                <label htmlFor="input-isComplete">isCompleted</label>
                <select name="isComplete" id="input-isComplete" value={formFields.isComplete} onChange={handleTaskNameChange}>
                    <option value="">Select</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
                <div>
                    <input type="submit" value="Add a Task" />
                </div>
        </form>
    )
};

NewTaskForm.propTypes = {
    onHandleSubmit: PropTypes.func.isRequired,
};

export default NewTaskForm;