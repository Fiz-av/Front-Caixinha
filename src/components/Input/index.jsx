// src/components/Input/index.jsx
import { InputContainer, StyledInput, Label } from './styles';

export function Input({ label, ...rest }) {
  return (
    <InputContainer>
      {label && <Label>{label}</Label>}
      <StyledInput {...rest} />
    </InputContainer>
  );
}