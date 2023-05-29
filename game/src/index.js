import React from 'react';
import ReactDOM from 'react-dom/client';
import User from './User';
import Game from './Game';

const firstUser = new User('first user', '', 1);
const secondUser = new User('second user', '', 1);

const game = ReactDOM.createRoot(document.getElementById('root'));

game.render(
    <div>
        <Game
            firstUserName={firstUser.getUserName()}
            firstUserAvatar={firstUser.getUserAvatar()}
            secondUserName={secondUser.getUserName()}
            secondUserAvatar={secondUser.getUserAvatar()}
        />
    </div>
);