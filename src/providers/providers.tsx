import React from 'react';
import ProviderStore from './providerStore';
import ProviderTheme from './providerTheme';

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ProviderStore>
      <ProviderTheme>{children}</ProviderTheme>
    </ProviderStore>
  );
};

export default Providers;
