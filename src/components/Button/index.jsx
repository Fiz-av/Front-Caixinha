// src/components/Button/index.jsx
import { StyledButton } from './styles';

export function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}