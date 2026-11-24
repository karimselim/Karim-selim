import React from 'react';
import styled from 'styled-components';
import { useHorror, setHorror } from '../../utils/horror';
import { enableSound, disableSound } from '../../utils/horrorSound';

const Wrap = styled.div`
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 9000;
  display: flex;
  gap: 8px;
  font-family: calibre, sans-serif;
`;

const Btn = styled.button`
  cursor: pointer;
  background: rgba(10, 6, 6, 0.78);
  color: #d4af37;
  border: 1px solid rgba(212, 175, 55, 0.55);
  border-radius: 999px;
  padding: 8px 14px;
  font: inherit;
  font-size: 13px;
  letter-spacing: 0.04em;
  &:hover,
  &:focus-visible {
    background: rgba(40, 10, 10, 0.95);
    outline: 2px solid #d4af37;
  }
`;

const HorrorToggle = () => {
  const { enabled, sound } = useHorror();
  return (
    <Wrap data-horror-ui>
      <Btn
        type="button"
        aria-pressed={enabled}
        onClick={() => {
          if (enabled) disableSound();
          setHorror({ enabled: !enabled, sound: enabled ? false : sound });
        }}
      >
        {enabled ? 'Horror: on' : 'Horror: off'}
      </Btn>
      {enabled && (
        <Btn
          type="button"
          aria-pressed={sound}
          onClick={() => {
            if (sound) disableSound();
            else enableSound();
            setHorror({ sound: !sound });
          }}
        >
          {sound ? 'Sound: on' : 'Sound: off'}
        </Btn>
      )}
    </Wrap>
  );
};

export default HorrorToggle;
