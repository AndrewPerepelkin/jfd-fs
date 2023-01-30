import React from 'react';
import useMockData from '../utils/mockData';

const Main = () => {
  const {error, status, progress, initialize} = useMockData();
  const handleClick = () => {
    initialize();
  };
  return (
    <div className='container mt-5'>
      <h1>Главная страница</h1>
      <h3>Инициализация данных в FireBase</h3>
      <ul className='list-group'>
        <li className='list-group-item'>Статус: {status}</li>
        <li className='list-group-item'>Выполнено: {progress}%</li>
        {error && <li className='list-group-item'>Ошибка: {error}</li>}
      </ul>
      <button
        className='btn btn-primary mt-3'
        onClick={handleClick}
      >
        Инициализировать
      </button>
    </div>
  );
};

export default Main;
