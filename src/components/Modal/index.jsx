// src/components/Modal/index.jsx
import { Overlay, Container, Header, CloseButton } from './styles';
import { FaTimes } from 'react-icons/fa';

export function Modal({ title, children, visible, onClose }) {
  if (!visible) {
    return null;
  }

  return (
    <Overlay>
      <Container>
        <Header>
          <h2>{title}</h2>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
        </Header>
        {children}
      </Container>
    </Overlay>
  );
}