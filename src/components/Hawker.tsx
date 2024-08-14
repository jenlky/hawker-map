import Image from "next/image";

const options: any = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export default function Hawker ({ hawker, foodRecommendations }: { hawker: any, foodRecommendations: any }) {
  return (
    <div className="food-recommendations">
      <div className='food-recommendations-header'>
        <h1>{ hawker }</h1>
        <h2>Food recommendations</h2>
      </div>
      <div className="food-list">
        {foodRecommendations[0]?.length > 0 && foodRecommendations[0]?.map((record: any, index: number) => {
          return (
            <div key={record?.header}>
              <div>
                <h3>{index === 0 && record?.website}</h3>
                <p>{index === 0 && new Date(record?.date).toLocaleDateString('en-GB', options)}</p>
              </div>
              <div className="food-list-items">
                <p>{record?.header}</p>
                <p>{record?.text}</p>
                {record?.image && <Image src={record?.image} alt={record.header} width={300} height={350} />}
              </div>
            </div>
          )
        })}
        {foodRecommendations[1]?.length > 0 && foodRecommendations[1]?.map((record: any, index: number) => {
          return (
            <div key={record?.header}>
              <div>
                <h3>{index === 0 && record?.website}</h3>
                <p>{index === 0 && new Date(record?.date).toLocaleDateString('en-GB', options)}</p>
              </div>          
              <div key={record?.header} className="food-list-items">
                <p>{record?.header}</p>
                <p>{record?.text}</p>
                {record?.image && <Image src={record?.image} alt={record.header} width={300} height={350} />}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
