import React from 'react';
import { useThemeContext } from '../../context/theme';
import useCursorStyle from '../../hooks/useCursorStyle';
import useStyledTheme from '../../hooks/useStyledTheme';

const Logo = props => {
  const { buttonProps = {}, ...rootProps } = props;

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
      dispatch({ type: 'TOGGLE_THEME' });

      // reset the cursor color so that it uses the theme text color as default
      addCursorColor(null);
    },
    [dispatch, addCursorColor]
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
      style={{ fontSize: 42, fontWeight: 'bold' }}
    >
      Karim
    </p>
  );
};

export default Logo;
