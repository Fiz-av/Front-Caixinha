// src/components/ToggleSwitch/index.jsx
import React from 'react';
import { SwitchContainer, Input, SwitchSlider } from './styles';

export function ToggleSwitch({ isToggled, onToggle }) {
  return (
    <SwitchContainer>
      <Input 
        type="checkbox" 
        checked={isToggled} // Garante que o estado visual corresponda à prop
        onChange={onToggle} // Chama a função ao clicar
      />
      <SwitchSlider />
    </SwitchContainer>
  );
}