// import { useState } from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = ({ id, title, isComplete, onToggle, onDelete }) => {
  const completeClicked = () => {
    onToggle(id);
  };

  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <>
      <li className="tasks__item">
        <button
          className={`tasks__item__toggle ${buttonClass}`}
          onClick={completeClicked} >
          {title}
        </button>
        <button
          className="tasks__item__remove button"
          onClick={() => handleDelete(id)} >x</button>
      </li>
    </>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Task;
