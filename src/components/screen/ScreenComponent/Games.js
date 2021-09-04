import React from 'react';
import gameImage from '../../../assets/games/game.png'

const Games = () => {
    return(
        <div className="gameContainer">
            <img src={gameImage} alt="GameImage" />
        </div>
    )
}

export default Games;