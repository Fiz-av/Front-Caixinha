// src/components/ToggleSwitch/styles.js
import styled from 'styled-components';

export const SwitchContainer = styled.div`
  width: 50px;
  height: 28px;
  background-color: ${({ isToggled, theme }) => (isToggled ? theme.primary : theme.border)};
  border-radius: 15px;
  padding: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

export const SwitchSlider = styled.div`
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  transform: translateX(${({ isToggled }) => (isToggled ? '22px' : '0px')});
  transition: transform 0.3s ease;
`;