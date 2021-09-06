import React, { useContext } from 'react';
import assets from '../../../assets/assets';
import NotificationBar from './NotificationBar';
import MenuAside from './MenuAside';
import { AppContext } from '../../../context/playContext';
import { data } from '../../../data/data';

function MenuList() {
    const { activeState, dataIndex } = useContext(AppContext);
    const Data = data[dataIndex];

    return(
        <div className="inside-screen">
            <div className="menu-list">
                <NotificationBar />
                <div className='list'>
                    {Data.map((item, index) => (
                        <div
                            key={`${index}-${item}`}
                            className={activeState === index ? 'active' : ''}
                        >
                            {item}
                            <span>
                                <img src={assets.arrowright} alt='rightArrow' />
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <MenuAside />
        </div>
    )
}

export default MenuList;