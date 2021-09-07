import React, { useEffect, useContext } from 'react';
import assets from '../../../assets/assets';
import { AppContext } from '../../../context/playContext';
import coverFlow from '../../../assets/songCover/coverflow';

const MenuAside = () => {
    const { activeState, dataIndex } = useContext(AppContext);

    const getIndex = () => {
        return Math.ceil(Math.random() * coverFlow.length) - 1
    }

    useEffect(() => {
        let slideShowImgs = document.getElementsByClassName('slideShowImg')[0];
        setInterval(function() {
            slideShowImgs.setAttribute('src', coverFlow[getIndex()].images)
        },6000)
    },[])

    // window to display while Hovering on Games in MenuList 
    const GamesImg = () => {
        return(
            <div className='games bg'>
                <img src={assets.gameIcon} alt=''/>
                <div>Games</div>
            </div>
        )
    }

    // window to display while Hovering on Settings in MenuList 
    const Settings = () => {
        return(
            <div className='settings bg'>
                <img src={assets.reacticon} alt='' />
                <div>iPod.js</div>
                <div>By Harshit Garg</div>
            </div>
        )
    }

    return(
        <div>
            <div className="slideshow">
                <img src={coverFlow[1].images} alt='' className='slideShowImg' />
            </div>

            {activeState === 2 && dataIndex === 0 && <GamesImg />}

            {activeState === 3 && dataIndex === 0 && <Settings />}
        </div>
    )
}

export default MenuAside;