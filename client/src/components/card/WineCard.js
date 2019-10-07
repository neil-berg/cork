import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import {
  faHeart as fullHeart,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import UserContext from '../../context/UserContext';

const WineCard = ({ wine }) => {
  const [user, setUser] = useContext(UserContext);

  const [showPopup, setShowPopup] = useState(false);
  const [likes, setLikes] = useState(null);
  const [isLikedByUser, setIsLikedByUser] = useState(null);

  // On first mount, sync numLikes and likedByUser to values in the DB
  useEffect(() => {
    setLikes(wine.likes);
    setIsLikedByUser(wine.likedByUser);
  }, [wine.likes, wine.likedByUser]);

  const popupAnimation = useSpring({
    opacity: showPopup ? 1 : 0,
    transform: showPopup ? `translateY(0)` : `translateY(20px)`
  });

  const renderStars = rating => {
    const numArr = [...new Array(rating).keys()];
    return numArr.map((item, i) => (
      <FontAwesomeIcon key={i} className="star" icon={faStar} />
    ));
  };

  const handlePopupClick = () => {
    // User is not logged in, so show the popup for 3.5 seconds
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3500);
    return;
  };

  const handleLikeClick = async () => {
    // UI changes only: toggle empty/full heart and increment/decrement likes
    isLikedByUser ? setLikes(likes - 1) : setLikes(likes + 1);
    setIsLikedByUser(!isLikedByUser);

    // Then add/remove this wine in a user's liked wines
    // and add/subtract from this wine's likes
    try {
      const token = localStorage.getItem('cork-token');
      await axios.patch(
        '/api/users/me/likes',
        { _id: wine._id },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <div className="header">
        <span>{wine.owner.username}</span>
        <span>3h</span>
      </div>
      <img
        src={process.env.REACT_APP_API_URL + `/api/wines/${wine._id}/image`}
        alt="wine bottle"
      />
      <div className="footer">
        <div className="icons-container">
          <div className="likes-container">
            {user.isLoggedIn ? (
              <FontAwesomeIcon
                icon={isLikedByUser ? fullHeart : emptyHeart}
                className={isLikedByUser ? 'full-heart' : 'empty-heart'}
                onClick={() => handleLikeClick()}
              />
            ) : (
              <FontAwesomeIcon
                className="empty-heart"
                icon={emptyHeart}
                onClick={() => handlePopupClick()}
              />
            )}
            <span className="num-likes">{likes}</span>
            {showPopup && (
              <animated.p style={popupAnimation} className="popup">
                Login or sign up to like wines!
              </animated.p>
            )}
          </div>
          <div className="stars-container">{renderStars(wine.rating)}</div>
        </div>
        <p className="name">{wine.name}</p>
        {wine.review !== 'Enter review here...' && (
          <p className="review">{wine.review}</p>
        )}
      </div>
    </Card>
  );
};

const Card = styled.div`
  margin: 2rem 0;
  border-bottom: 1px var(--lightgrey) solid;

  .header {
    font-weight: 700;
    padding: 0 1rem 0.5rem 1rem;
    display: flex;
    justify-content: space-between;
    align-itemms: center;
    border-radius: 5px 5px 0 0;
  }

  img {
    width: 100%;
    max-width: 400px;
  }

  .footer {
    padding: 0.75rem;
    position: relative;
  }

  .icons-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .empty-heart {
    font-size: 1.5rem;
    color: var(--grey);
  }

  .full-heart {
    font-size: 1.5em;
    color: var(--red);
  }

  .num-likes {
    color: var(--black);
    font-size: 1em;
    font-weight: bold;
    padding-left: 0.35rem;
  }

  .popup {
    position: absolute;
    top: -1rem;
    left: 1rem;
    color: var(--red);
    font-weight: bold;
    padding: 1rem;
    background: var(--verylightgrey);
    border: 1px var(--lightpurple) solid;
    border-radius: 5px;
    box-shadow: 0px 5px 10px rgba(76, 54, 138, 0.35);
  }

  .stars-container {
    padding-left: 1rem;
  }

  .star {
    font-size: 1.5rem;
    color: var(--lightpurple);
    padding-right: 0.25rem;
  }

  .name {
    flex: 1;
    text-align: left;
    color: var(--purple);
    font-weight: bold
    font-size: 1.35em;
    padding: 0.75rem 0;
  }

  .review { 
    font-size: 1em;
  }

  @media screen and (min-width: 768px) {
    margin: 0;
  }
`;

export default WineCard;
