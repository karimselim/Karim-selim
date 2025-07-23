import React, { useState, forwardRef } from 'react';
import {
  CardContainer,
  CardInner,
  CardFace,
  CardBack,
  CardIcon,
  CardTitle,
  SubTitle,
  Description,
} from './styles';

const TarotCard = forwardRef(
  (
    { iconSrc, title, isSelected, zIndex, onClick, description, subtitle },
    ref
  ) => {
    // local flip/hover state can stay
    const [isFlipped, setIsFlipped] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleInteraction = () => {
      setIsFlipped(f => !f);
      onClick(); // this now comes from parent with correct index
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
        onTouchEnd={handleInteraction}
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
            {/* <CardIcon src={iconSrc} alt={title} /> */}
            <CardTitle>{title}</CardTitle>
            {/* <SubTitle>{subtitle}</SubTitle>
            <Description>{description}</Description> */}
          </CardFace>
          <CardBack />
        </CardInner>
      </CardContainer>
    );
  }
);

export default TarotCard;
