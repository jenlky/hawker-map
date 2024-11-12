import Image from "next/image";

const options: any = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

function FoodRecommendations ({index, record}: {index: any, record: any}) {
  if (index === 0) {
    return (
      <li key={index} className="food-list-items">
        <h3>{index === 0 && record?.website}</h3>
        <p>{index === 0 && new Date(record?.date).toLocaleDateString('en-GB', options)}</p>
      </li>
    )
  }

  return (
    <li key={index} className="food-list-items">
      <p>{record?.header}</p>
      <p>{record?.text}</p>
      {record?.image && <Image src={record?.image} alt={record.header} width={300} height={350} />}
    </li>
  )
}

export default function Hawker ({ hawker, foodRecommendations }: { hawker: any, foodRecommendations: any }) {
  return (
    <div className="food-recommendations">
      <div className='food-recommendations-header'>
        <h1>{ hawker }</h1>
        <h2>Food recommendations</h2>
      </div>
      <ul className="food-list">
        {foodRecommendations.length === 0 && <p>No food recommendations found from Seth Lui or Eatbook!</p>}
        {foodRecommendations[0]?.length > 0 && foodRecommendations[0]?.map((record: any, index: number) => {
          return <FoodRecommendations key={index} index={index} record={record} />
        })}
        {foodRecommendations[1]?.length > 0 && foodRecommendations[1]?.map((record: any, index: number) => {
          return <FoodRecommendations key={index} index={index} record={record} />
        })}
      </ul>
    </div>
  )
}
