import React from "react";
import "./Card.css";
// import {Link} from 'react-router-dom'
import PropTypes from "prop-types";

const Card = ({
  imageUrl,
  title,
  artistName,
  price,
  username,
  editions,
  editionToBuy,
}) => {
  return (
    <div className="card-container">
      <div className="img-container">
        <img src={imageUrl} alt="" />
      </div>
      <div className="card-title">
        <b>Join {artistName}'s Project</b>
        {/* <div className="creator">
          <i style={{ paddingRight: "10px", fontFamily: "cursive" }}>Artist:</i>
          <h4 className="artist-link">
            @{`${username.slice(0, 6)}....${username.slice(-7, -1)}`}
          </h4>
        </div> */}
      </div>
      {/* <div className="card-body">
        <div style={{ fontFamily: "cursive" }}>
          {editions ? (
            <>
              {editionToBuy ? (
                editionToBuy === 1 ? (
                  <span>1st </span>
                ) : editionToBuy === 2 ? (
                  <span>2nd </span>
                ) : editionToBuy === 3 ? (
                  <span>3rd </span>
                ) : (
                  <span>{editionToBuy}th </span>
                )
              ) : (
                <span>top </span>
              )}
              {""}
              <span>edition of {editions}</span>
            </>
          ) : null}
        </div>
        <b>Worth: {price}</b>
      </div> */}
    </div>
  );
};

Card.defaultProps = {
  title: "#Bad Trip",
  price: "1ETH",
  username: "anonymus",
};

Card.propTypes = {
  title: PropTypes.string,
  price: PropTypes.string.isRequired,
  username: PropTypes.string,
};

export default Card;
