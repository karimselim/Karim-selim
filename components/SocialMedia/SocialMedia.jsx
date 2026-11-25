import React from 'react';
import useCursorStyle from '../../hooks/useCursorStyle';
import { Facebook, Linkedin, Github } from '../Icons';
import StickyCursor from '../StickyCursor';
import { Container, Link } from './styles';

const medias = [
  { component: Facebook, label: 'Facebook', url: 'https://www.facebook.com/karim.selim.27/' },
  { component: Github, label: 'GitHub', url: 'https://github.com/karimselim' },
  {
    component: Linkedin,
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/karim-selim-qa',
  },
];

const SocialMedia = props => {
  const { addCursorBorder, removeCursorBorder } = useCursorStyle();

  return (
    <Container {...props}>
      {medias.map(({ component: Component, url, label }) => (
        <StickyCursor key={url}>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} (opens in a new tab)`}
            href={url}
            onMouseEnter={addCursorBorder}
            onMouseLeave={removeCursorBorder}
          >
            <Component />
          </Link>
        </StickyCursor>
      ))}
    </Container>
  );
};

export default React.memo(SocialMedia);
