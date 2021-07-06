import React from "react";
import PropTypes from "prop-types";

const Card = (props) => (
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

Card.propTypes = {
  handleCardClick: PropTypes.func,
  id: PropTypes.number,
  cardObject: PropTypes.object,
};

export default Card;
