import React, { useContext, useEffect, useState } from 'react';
import NotificationBar from './NotificationBar';
import coverFlow from '../../../assets/songCover/coverflow';
import ReactAudioPlayer from 'react-audio-player';
import { AppContext } from '../../../context/playContext';
import { data } from '../../../data/data';

const MusicPlayer = () => {
    const { play, songID, setSongID } = useContext(AppContext);
    const [fillBar, setFillBar] = useState();

    const getElement = (element) => {
        return document.getElementsByClassName(element)[0];
    }

    useEffect(() => {
        if(play) {
            var timeDOM = getElement('timer');
            let audio = getElement('audio')

            setInterval(() => {
                let ct = parseInt(audio.currentTime);

                if(audio.currentTime === audio.duration){
                    setSongID((prevState) =>
                        prevState === coverFlow.length - 1 ? 0 : prevState + 1
                    )
                }

                let min = parseInt(ct / 60);
                let sec = parseInt(ct % 60);

                timeDOM.innerText = sec < 10 ? `${min}:0${sec}` : `${min}:${sec}` 
            }, 1000)
        }
    }, [play, setSongID] )

    const setDuration = () => {
        let music = getElement('audio');
        let duration = parseInt(getElement(music.duration));
        let min = parseInt(duration / 60);
        let sec = parseInt(duration % 60);

        getElement('time').innerText = sec < 10 ? `${min}:0${sec}` : `${min}:${sec}`
    }

    const playerBar = () => {
        let audio = getElement('audio');
        let barWidth = getElement('fillup');
        let duration = audio.duration;
        let base = duration / 100;

        setFillBar(
            setInterval(function() {
                let ct = parseInt(audio.currentTime);
                let width = parseInt(ct / base);
                barWidth.style.width = `${width}%`;
            }, duration*10)
        )
    }

    let track = coverFlow[songID];

    const startMusic = () => {
        document.title = `iPod.js | ${track.album}`
        data[0].length === 4 && data[0].push('Now Playing');
        getElement('audio').play()

        setDuration();

        if(fillBar) {
            clearInterval(fillBar)
        }
        playerBar()
    }

    return(
        <div className='music-player' >
            <NotificationBar />

            <div className='content' >
                <div className='thumbnail' >
                    <img src={track.images} alt='' />
                </div>
                <div className='description' >
                    <div className='songName' > {track.name} </div>
                    <div> {track.album} </div>
                    <div className='artist' >
                        { ' ' }
                        <span> Composed By </span> {track.artist}{' '}
                    </div>
                </div>
            </div>

            <div>

                <ReactAudioPlayer 
                    className='audio'
                    src={track.src}
                    onLoadedMetadata={() => startMusic()}
                />

                <span className='timer' > 0.00 </span>
                <div className='fillup' />
                <span className='time' > 0.00 </span>
            </div>

            <div className='volumeController' />

        </div>
    )
}

export default MusicPlayer;