import React, { useState } from 'react';

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [play, setPlay] = useState(false)
    const [currentPlayStatus, setCurrentPlayStatus] = useState(false)
    const [songID, setSongID] = useState(0)
    const [activeState, setActiveState] = useState(0)
    const [dataIndex, setDataIndex] = useState(0)
    const [isMenuVisible, setIsMenuVisible] = useState(true)
    const [activeComponent, setActiveComponent] = useState(0)

    return(
        <AppContext.Provider 
            value={{
                play,
                setPlay,
                currentPlayStatus,
                setCurrentPlayStatus,
                songID,
                setSongID,
                activeState,
                setActiveState,
                dataIndex,
                setDataIndex,
                isMenuVisible,
                setIsMenuVisible,      
                activeComponent,
                setActiveComponent              
            }}
        >
            { children }
        </AppContext.Provider>
    )
}

export { AppContext, AppProvider }

