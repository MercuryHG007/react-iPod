import React, {useContext} from 'react';
import NotificationBar from './NotificationBar';
import Coverflow from 'react-coverflow';
import coverflowData from '../../../assets/songCover/coverflow';
import { AppContext } from '../../../context/playContext';

function CoverFlow () {
    const { activeState } = useContext(AppContext);

    return(
        <div className="coverflow">
            <NotificationBar />
            <Coverflow 
                width={100}
                height={280}
                displayQuantityOfSide={1}
                enableHeading={false}
                active={activeState}
            >
                
            {coverflowData.map((item) => (
                <img 
                    key={item._id} 
                    src={item.images} 
                    alt={item.name}
                />
            ))}
            </Coverflow>            
        </div>
    )
}

export default CoverFlow;