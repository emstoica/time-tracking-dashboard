import '../components/Card.css'
import EllipsisIcon from '../assets/images/icon-ellipsis.svg?react'

function Card({ icon, title, time, period, previousTime }) {
  return (
    <div className="card-container">
      <div className="card-background">
        <span>{icon || <EllipsisIcon className="card-icon" />}</span>
      </div>
      <div className="card-content">
        <div className="card-header">
          <h2>{title}</h2>
          <h3 className="card-hours">{time}</h3>
          <p className="card-previous">
            Last {period} - {previousTime}
            {'hrs'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Card
