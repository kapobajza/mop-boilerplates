import React from 'react';

import { Colors } from '../ComponentLibrary/styles';
import RoundedButton from '../components/Button/RoundedButton';
import { Container } from '../components/Container';

import { useFlashMessage } from '../components/FlashMessage';

const FlashMessageDemo = () => {
  const { showSuccess, showError, showInfo } = useFlashMessage();

  return (
    <Container>
      <RoundedButton
        title="Show success message"
        onPress={() => showSuccess('Action done successfully!')}
        containerStyle={{ backgroundColor: Colors.eucalyptusGreen }}
      />
      <RoundedButton
        title="Show error message"
        onPress={() => showError(new Error('An error occurred'))}
        containerStyle={{ backgroundColor: Colors.jasperRed }}
      />
      <RoundedButton
        title="Show info message"
        onPress={() => showInfo('Some useful information')}
        containerStyle={{ backgroundColor: Colors.linkedINBlue }}
      />
    </Container>
  );
};

export default FlashMessageDemo;
