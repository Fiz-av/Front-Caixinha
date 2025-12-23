// src/components/ToggleSwitch/styles.js
import styled from 'styled-components';

export const SwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
`;

export const SwitchSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 24px;

  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
`;

export const Input = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;

  /* Alterado o fallback de azul para roxo (#8257E5) */
  &:checked + ${SwitchSlider} {
    background-color: ${({ theme }) => theme?.colors?.primary || theme?.primary || '#8257E5'};
  }

  &:focus + ${SwitchSlider} {
    box-shadow: 0 0 1px ${({ theme }) => theme?.colors?.primary || theme?.primary || '#8257E5'};
  }

  &:checked + ${SwitchSlider}:before {
    transform: translateX(24px);
  }
`;