import React, { useContext, useEffect, useState } from 'react';
import assets from '../assets/assets';
import Screen from './screen/screens';
import ZingTouch from 'zingtouch';
import { AppContext } from '../context/playContext';
import { data, settings, coverflow } from '../data/data';

let currentAngle;
let lastRoundAngle = 0;

const App = () => {

  const [bindedRegion, setBindedRegion] = useState();

  const {
    play,
    setPlay,
    currentPlayStatus,
    setCurrentPlayStatus,
    setSongID,
    activeState,
    setActiveState,
    dataIndex,
    setDataIndex,
    isMenuVisible,
    setIsMenuVisible,      
    activeComponent,
    setActiveComponent  
  } = useContext(AppContext);

  // function for get element by class
  const getElement = (element) => {
    return document.getElementsByClassName(element)[0];
  }

  const increaseActive = (length) => {
    setActiveState((prevState) => {
      let nextActive = prevState + 1;

      if(nextActive >= length) nextActive = length
      return nextActive
    })
  }

  const decreaseActive = () => {
    setActiveState((prevState) => {
      let nextActive = prevState - 1;

      if(nextActive < 0) nextActive = 0
      return nextActive
    })
  }

  // Display Volume on Increasing or Decreasing
  const showIcon = (vol) => {
    let volumeDom = getElement('volumeController');
    volumeDom.innerHTML = 
      `
        <div>
        <img src=${parseInt(vol * 100) < 45 ? assets.lowVolume : assets.highVolume } />
        </div>
        <div className="volume"> ${parseInt(vol * 100)} </div>
      `
    setTimeout(() => {
      volumeDom.innerHTML = ''
    }, 10000)
    
  }

  // Handle Volume Increase
  const increaseVolume = () => {
    let audio = getElement('audio');

    let vol = parseInt(audio.volume * 100) / 100.0;
    audio.volume = vol + 0.02 >= 1 ? 1 : vol + 0.02;
    showIcon(audio.volume)
  }

  // Handle Volume Decrease
  const decreaseVolume = () => {
    let audio = getElement('audio');

    let vol = parseInt(audio.volume * 100) / 100.0;
    audio.volume = vol - 0.02 <= 0 ? 0 : vol - 0.02;
    showIcon(audio.volume)
  }

  useEffect(() => {
    if (bindedRegion) {
      bindedRegion.unbind(
        document.getElementsByClassName('object')[0],
        'rotate'
      )
    }

    var containerElement = document.getElementsByClassName('container')[0]
    var region = ZingTouch.Region(containerElement)
    var childElement = document.getElementsByClassName('object')[0]
    currentAngle = 0
    setBindedRegion(region)

    region.bind(childElement, 'rotate', (e) => {
      currentAngle += e.detail.distanceFromLast
      const myAngle = Math.round(currentAngle % 360)

      if (Math.abs(lastRoundAngle - myAngle) >= 15) {
        if (isMenuVisible) {
          e.detail.distanceFromLast > 0
            ? increaseActive(data[dataIndex].length - 1)
            : decreaseActive()
        } else if (activeComponent === 0) {
          e.detail.distanceFromLast > 0
            ? increaseActive(coverflow.length - 1)
            : decreaseActive()
        } else if (activeComponent === 3) {
          e.detail.distanceFromLast > 0
            ? increaseActive(settings.length - 1)
            : decreaseActive()
        } else if (play) {
          e.detail.distanceFromLast > 0 ? increaseVolume() : decreaseVolume()
        }

        lastRoundAngle = myAngle
      }
    })
  }, [isMenuVisible, dataIndex])

  // To Handle Menu Click
  const handleMenuClick = () => {
    isMenuVisible === false
      ? setIsMenuVisible(true)
      : setDataIndex((prevState) => (prevState === 0 ? 0 : prevState - 1))

    setActiveState(0)
  }

  // To Handle Enter Click
  const handleEnterClick = () => {
    if (isMenuVisible) {
      dataIndex === 0 && setActiveComponent(activeState)

      if (activeState !== 1 && dataIndex === 0) {
        setIsMenuVisible(false)
        setActiveState(0)
      } else if (dataIndex === 2) {
        setIsMenuVisible(false)
        setPlay(true)
        setCurrentPlayStatus(true)
        setSongID(activeState)
      } else {
        setDataIndex((prevState) =>
          prevState >= data.length - 1 ? data.length - 1 : prevState + 1
        )
        setActiveState(0)
      }
    } else {
      if (activeComponent === 0) {
        setPlay(true)
        setCurrentPlayStatus(true)
        setSongID(activeState)
      } else if (activeComponent === 3) {
        let url = document
          .getElementsByClassName('url')
          [activeState].getAttribute('href')
        window.open(url)
      }
    }
  }

  // To Handle Play Pause
  const handlePlayAndPause = () => {
    if (play) {
      let audio = document.getElementsByClassName('audio')[0]
      currentPlayStatus ? audio.pause() : audio.play()
      setCurrentPlayStatus((prevState) => !prevState)
    }
  }

  return (
    <div className='App'>
      <div className='layout'>
        <div className='body'>
          <div className='screen'>
            <Screen />
          </div>

          <div className='buttons-container container'>
            <div className='buttons object'>
              <div className='inner-disk' onClick={handleEnterClick}></div>

              <img
                src={assets.menu}
                className='menu'
                alt=''
                onClick={handleMenuClick}
              />
              <img
                src={assets.playpause}
                className='play_pause'
                alt=''
                onClick={handlePlayAndPause}
              />
              <img src={assets.fastforward} className='fastforward' alt='' />
              <img src={assets.rewind} className='rewind' alt='' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default App;
