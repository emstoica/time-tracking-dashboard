import '../components/Card.css'
import EllipsisIcon from '../assets/images/icon-ellipsis.svg?react'

function Card({ icon, title, time, period, previousTime }) {
  const slug = title.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className={`card-container`}>
      <div className={`card-background ${slug}`}>
        <span>{icon || <EllipsisIcon className="card-icon" />}</span>
      </div>
      <div className="card-content">
        <div className="card-header">
          <h2>{title}</h2>
          <span>
            <EllipsisIcon />
          </span>
        </div>

        <div className="card-body">
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
