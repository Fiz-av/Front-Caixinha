// src/components/ToggleSwitch/index.jsx
import { SwitchContainer, SwitchSlider } from './styles';

export function ToggleSwitch({ isToggled, onToggle }) {
  return (
    <SwitchContainer onClick={onToggle} isToggled={isToggled}>
      <SwitchSlider isToggled={isToggled} />
    </SwitchContainer>
  );
}