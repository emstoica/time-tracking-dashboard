import '../components/ProfileCard.css'
function ProfileCard({ name, profileImage, timeframe, onTimeframeChange }) {
  const options = ['daily', 'weekly', 'monthly']

  return (
    <div className="profile-container">
      <div className="profile-background">
        <img
          src={profileImage}
          alt={name + ' profile image' || 'John Doe profile image'}
        />
        <p className="report-for">Report for</p>
        <h1>{name || 'John Doe'}</h1>
      </div>
      <div className="profile-foreground">
        {options.map((option) => (
          <button
            key={option}
            className={timeframe === option ? 'active' : ''}
            onClick={() => onTimeframeChange(option)}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProfileCard
