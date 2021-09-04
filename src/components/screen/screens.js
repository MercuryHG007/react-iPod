import React, {useContext} from 'react';

import CoverFlow from './ScreenComponent/CoverFlow';
import Games from './ScreenComponent/Games';
import MenuList from './ScreenComponent/MenuList';
import MusicPlayer from './ScreenComponent/MusicPlayer';
import Settings from './ScreenComponent/Settings';

import {AppContext} from '../../context/playContext';

function Screen () {

    const {
        isMenuVisible,
        activeComponent,
        dataIndex,
        play
    } = useContext( AppContext )

    return(
        <div>
        
            { isMenuVisible && <MenuList /> }

            { !isMenuVisible && dataIndex===0 && activeComponent===0 && <CoverFlow /> }

            { play && (play || dataIndex===2) && <MusicPlayer /> }

            { !isMenuVisible && dataIndex===0 && activeComponent===2 && <Games /> }

            { !isMenuVisible && dataIndex===0 && activeComponent===3 && <Settings /> }

            { !isMenuVisible && dataIndex===0 && activeComponent===4 && <MusicPlayer /> }

        </div>
    )
}

export default Screen;