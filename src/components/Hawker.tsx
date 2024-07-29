// use global style
export default function Hawker ({ hawker, foodRecommendations }: { hawker: any, foodRecommendations: any }) {
  return (
    <div className="food-recommendations">
      <div className='food-recommendations-header'>
        <h1>{ hawker }</h1>
        <h2>Food recommendations</h2>
      </div>
      <div className="food-list">
        {foodRecommendations.map((record: any, index: number) => {
          return (
            <div key={index} className="food-list-items">
              <p>{record.title}</p>
              <p>{record.text}</p>
              {record.image && <img src={record.image}></img>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
