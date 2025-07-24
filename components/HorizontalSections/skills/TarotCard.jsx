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
    const [isHovered, setIsHovered] = useState(false); // Restore hover state

    const handleInteraction = event => {
      console.log(
        'handleInteraction triggered with event:',
        event?.type,
        event
      ); // Debug event
      if (event && typeof event.preventDefault === 'function') {
        event.preventDefault(); // Prevent default touch behavior
        console.log('preventDefault called for event:', event.type);
      }
      if (onClick) {
        onClick(event); // Pass event to parent
      }
    };

    const handleMouseEnter = () => {
      if (!isSelected && window.innerWidth > 768) {
        console.log('Mouse enter on desktop');
        setIsHovered(true); // Set hover state on enter
      }
    };

    const handleMouseLeave = () => {
      if (!isSelected && window.innerWidth > 768) {
        console.log('Mouse leave on desktop');
        setIsHovered(false); // Reset hover state on leave
      }
    };

    return (
      <CardContainer
        ref={ref}
        style={{
          zIndex, // Include zIndex from props
          touchAction: 'manipulation', // Enhance touch responsiveness
          userSelect: 'none', // Prevent text selection on touch
        }}
        onClick={handleInteraction}
        onTouchStart={e => {
          console.log('touchStart triggered:', e);
          handleInteraction(e); // Trigger interaction on touch start
        }}
        onTouchEnd={handleInteraction} // Keep for consistency
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CardInner
          className="card-inner"
          style={{
            transform:
              isSelected || isHovered ? 'rotateY(180deg)' : 'rotateY(0deg)', // Use both isSelected and isHovered
          }}
        >
          <CardFace>
            <CardIcon src={iconSrc} alt={title} />
            <CardTitle>{title}</CardTitle>
            <SubTitle>{subtitle}</SubTitle>
            <Description>{description}</Description>
          </CardFace>
          <CardBack />
        </CardInner>
      </CardContainer>
    );
  }
);

export default TarotCard;
