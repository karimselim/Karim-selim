import React, { useState, forwardRef } from 'react';
import {
  CardContainer,
  CardInner,
  CardFace,
  CardBack,
  CardIcon,
  CardTitle,
} from './styles';

const TarotCard = forwardRef(
  ({ iconSrc, title, isSelected, zIndex, onClick }, ref) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleInteraction = () => {
      setIsFlipped(!isFlipped);
      onClick();
    };

    const handleMouseEnter = () => {
      if (!isSelected && window.innerWidth > 768) {
        setIsHovered(true);
      }
    };

    const handleMouseLeave = () => {
      if (!isSelected && window.innerWidth > 768) {
        setIsHovered(false);
      }
    };

    return (
      <CardContainer
        ref={ref}
        style={{ zIndex }}
        onClick={handleInteraction}
        onTouchStart={handleInteraction}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CardInner
          className="card-inner"
          style={{
            transform:
              isFlipped || isHovered ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          <CardFace>
            <CardIcon src={iconSrc} alt={title} />
            <CardTitle>{title}</CardTitle>
          </CardFace>
          <CardBack />
        </CardInner>
      </CardContainer>
    );
  }
);

export default TarotCard;
