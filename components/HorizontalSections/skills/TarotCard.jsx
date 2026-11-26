import React, { useState, useRef, forwardRef } from 'react';
import {
  CardContainer,
  CardInner,
  CardFace,
  CardBack,
  CardTitle,
  SubTitle,
  Description,
} from './styles';

const TarotCard = forwardRef(
  (
    { iconSrc, title, isSelected, zIndex, onClick, description, subtitle },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const innerRef = useRef(null);

    // Tilt toward the pointer, same feel as the CV card (desktop only).
    const handleMouseMove = event => {
      if (window.innerWidth <= 768 || !innerRef.current) return;
      const r = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - r.left) / r.width - 0.5;
      const y = (event.clientY - r.top) / r.height - 0.5;
      innerRef.current.style.setProperty('--ry', `${x * 36}deg`);
      innerRef.current.style.setProperty('--rx', `${-y * 28}deg`);
    };

    const resetTilt = () => {
      if (!innerRef.current) return;
      innerRef.current.style.setProperty('--ry', '0deg');
      innerRef.current.style.setProperty('--rx', '0deg');
    };

    const handleInteraction = event => {
      if (event && typeof event.preventDefault === 'function') {
        event.preventDefault();
      }
      if (onClick) {
        onClick(event);
      }
    };

    const handleMouseEnter = () => {
      if (!isSelected && window.innerWidth > 768) {
        setIsHovered(true);
      }
    };

    const handleMouseLeave = () => {
      resetTilt();
      if (!isSelected && window.innerWidth > 768) {
        setIsHovered(false);
      }
    };

    return (
      <CardContainer
        ref={ref}
        style={{
          zIndex,
          touchAction: 'manipulation',
          userSelect: 'none',
        }}
        onClick={handleInteraction}
        onTouchStart={e => {
          handleInteraction(e);
        }}
        onTouchEnd={handleInteraction}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <CardInner
          className="card-inner"
          ref={innerRef}
          style={{
            transform:
              isSelected || isHovered
                ? 'rotateX(var(--rx, 0deg)) rotateY(calc(180deg + var(--ry, 0deg)))'
                : 'rotateY(0deg)',
          }}
        >
          <CardFace
            style={{
              backgroundImage: iconSrc ? `url(${iconSrc})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <CardBack />
        </CardInner>
      </CardContainer>
    );
  }
);

export default TarotCard;
