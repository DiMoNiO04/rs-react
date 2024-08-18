import React from 'react';
import zxcvbn from 'zxcvbn';
import { getPasswordColor } from '../../utils';

enum EPasswordLevel {
  WEAK = 'Weak',
  FAIR = 'Fair',
  GOOD = 'Good',
  STRONG = 'Strong',
  VERY_STRONG = 'Very Strong',
}

const PasswordStrength: React.FC<{ password: string }> = ({ password }) => {
  const testResult = zxcvbn(password);
  const score = testResult.score;

  const createPasswordLevel = (): EPasswordLevel | string => {
    switch (score) {
      case 0:
        return EPasswordLevel.WEAK;
      case 1:
        return EPasswordLevel.FAIR;
      case 2:
        return EPasswordLevel.GOOD;
      case 3:
        return EPasswordLevel.STRONG;
      case 4:
        return EPasswordLevel.VERY_STRONG;
      default:
        return '';
    }
  };

  return (
    <div style={{ position: 'absolute', right: 0, color: getPasswordColor(testResult.score) }}>
      {createPasswordLevel()}
    </div>
  );
};

export default PasswordStrength;
