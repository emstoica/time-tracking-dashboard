import './App.css'
import Card from './components/Card'
import ProfileCard from './components/ProfileCard'
import { useState } from 'react'
import ExerciseIcon from './assets/images/icon-exercise.svg?react'
import PlayIcon from './assets/images/icon-play.svg?react'
import SelfCareIcon from './assets/images/icon-self-care.svg?react'
import SocialIcon from './assets/images/icon-social.svg?react'
import StudyIcon from './assets/images/icon-study.svg?react'
import WorkIcon from './assets/images/icon-work.svg?react'

import ProfileImage from './assets/images/image-jeremy.png'

import data from './assets/data.json'

function App() {
  const [timeframe, setTimeframe] = useState('weekly') // 'daily' | 'weekly' | 'monthly'
  return (
    <div className="dashboard">
      <ProfileCard
        name="Jeremy Robson"
        profileImage={ProfileImage}
        timeframe={timeframe}
        onTimeframeChange={setTimeframe}
      />
      <div className="cards-container">
        {data.map((item) => {
          const tf = item.timeframes[timeframe] // { current, previous }
          return (
            <Card
              key={item.title}
              title={item.title}
              icon={(() => {
                switch (item.title) {
                  case 'Work':
                    return <WorkIcon className="card-icon" />
                  case 'Play':
                    return <PlayIcon className="card-icon" />
                  case 'Study':
                    return <StudyIcon className="card-icon" />
                  case 'Exercise':
                    return <ExerciseIcon className="card-icon" />
                  case 'Social':
                    return <SocialIcon className="card-icon" />
                  case 'Self Care':
                    return <SelfCareIcon className="card-icon" />
                  default:
                    return null
                }
              })()}
              time={`${tf.current}hrs`}
              previousTime={`${tf.previous}`}
              period={
                timeframe === 'daily'
                  ? 'day'
                  : timeframe === 'weekly'
                    ? 'week'
                    : 'month'
              }
            />
          )
        })}
      </div>
    </div>
  )
}

export default App
