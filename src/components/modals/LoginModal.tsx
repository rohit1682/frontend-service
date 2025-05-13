import React from 'react';
import Modal from './Modal';
import Button from '../button/Button';
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    onClose();
    navigate('/auth/login');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Log in to book workout"
      actions={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleLogin}>
            Log In
          </Button>
        </>
      }
    >
      <p>You must be logged in to book a workout! Please log in to access available slots and book your session.</p>
    </Modal>
  );
};

export default LoginModal;