import React, { useContext } from 'react';
import assets from '../../../assets/assets';
import { AppContext } from '../../../context/playContext';
import { settings } from '../../../data/data';

function Settings () {
    const { activeState } = useContext(AppContext);
    return(
        <div className="setting">
            <div className="settingContainer">
                <div>
                    <img src={assets.ipodlogo} alt='' />
                </div>
                <div className="ipod">iPod.js</div>
            </div>

            <div className="text"> MADE BY HARSHIT GARG  </div>

            {settings.map((item, index) => (
                <div
                    key={item.name}
                    id='setting-item'
                    className={index === activeState ? 'active' : ''}
                >
                    {/* Profile links */}
                    <a
                        className="url"
                        href={item.url}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        {item.name}
                    </a>
                    
                </div>
            ))}

        </div>
    )
}

export default Settings;