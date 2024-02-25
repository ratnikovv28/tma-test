import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [user, setUser] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Функция для обработки данных после аутентификации
  const handleTelegramResponse = (response) => {
    // Здесь вы можете добавить логику для сохранения данных пользователя
    setUser(response);
  };

  window.TelegramLoginWidget = {
    dataOnauth: (user) => handleTelegramResponse(user)
  };

  return (
      <div className="App">
        <header className="App-header">
          {user ? (
              <p>Привет, {user.first_name}! Вы успешно аутентифицированы.</p>
          ) : (
              <p>Привет, это мой Telegram Mini App!</p>
          )}
          <p>Текущее время: {currentTime}</p>
          {!user && <div id="telegram-login-your_bot_username" data-onauth="handleTelegramResponse(user)"></div>}
        </header>
      </div>
  );
}

export default App;
