import React from 'react';
import { useRouter } from 'next/router';
import { useThemeContext } from '../../context/theme';
import useCursorStyle from '../../hooks/useCursorStyle';
import useStyledTheme from '../../hooks/useStyledTheme';

const Logo = props => {
  const { buttonProps = {}, ...rootProps } = props;

  const router = useRouter();
  const theme = useStyledTheme();
  const [, dispatch] = useThemeContext();
  const {
    addCursorBorder,
    removeCursorBorder,
    addCursorColor,
    resetCursorColor,
  } = useCursorStyle();

  const handleToggleTheme = React.useCallback(
    event => {
      event.preventDefault();
      // On inner pages (projects, case studies) the logo is the way home.
      if (router.pathname !== '/') {
        addCursorColor(null);
        router.push('/');
        return;
      }
      dispatch({ type: 'TOGGLE_THEME' });

      // reset the cursor color so that it uses the theme text color as default
      addCursorColor(null);
    },
    [dispatch, addCursorColor, router]
  );

  return (
    <p
      onMouseEnter={() => {
        addCursorBorder();
        addCursorColor(theme.text);
      }}
      onMouseLeave={() => {
        removeCursorBorder();
        resetCursorColor();
      }}
      onClick={handleToggleTheme}
      role="button"
      tabIndex={0}
      onKeyDown={event => {
        if (event.key === 'Enter' || event.key === ' ') handleToggleTheme(event);
      }}
      style={{ fontSize: 42, fontWeight: 'bold' }}
    >
      KARIM
    </p>
  );
};

export default Logo;
