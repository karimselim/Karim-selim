import React from 'react';
import useCursorStyle from '../../hooks/useCursorStyle';
import { Instagram, Facebook, Vimeo, Linkedin, Github } from '../Icons';
import StickyCursor from '../StickyCursor';
import { Container, Link } from './styles';

const medias = [
  // { component: Instagram, url: 'https://www.instagram.com/furrowstudio/' },
  { component: Facebook, url: 'https://www.facebook.com/furrowstudio/' },
  // { component: Vimeo, url: 'https://vimeo.com/furrow' },
  { component: Github, url: 'https://github.com/karimselim' },
  {
    component: Linkedin,
    url: 'https://www.linkedin.com/in/kareem-sleem-367718220/',
  },
];

const SocialMedia = props => {
  const { addCursorBorder, removeCursorBorder } = useCursorStyle();

  return (
    <Container {...props}>
      {medias.map(({ component: Component, url }) => (
        <StickyCursor key={url}>
          <Link
            target="_blank"
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
