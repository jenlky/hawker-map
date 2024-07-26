// use global style
export default function Hawker ({ hawker, foodRecommendations }: { hawker: any, foodRecommendations: any }) {
  return (
    <div>
      <div className='food-recommendations-header'>
        <h1>{ hawker }</h1>
        <h2>Food recommendations</h2>
      </div>
      <div>
        {foodRecommendations.map((record: any, index: number) => {
          return (
            <div key={index} className="food-recommendations">
              <p>{record.title}</p>
              <p>{record.text}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
