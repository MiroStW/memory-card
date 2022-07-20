interface CardProps {
  id: number;
  handleCardClick: (id: number) => void;
  cardObject: {
    name: string;
    imgUrl: string;
  };
}

const Card = (props: CardProps) => (
  <div
    className="card"
    onClick={() => {
      props.handleCardClick(props.id);
    }}
  >
    <img src={props.cardObject.imgUrl} alt={props.cardObject.name} />
    <p>{props.cardObject.name}</p>
  </div>
);

export default Card;
