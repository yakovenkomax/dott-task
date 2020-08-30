import DogUpload from 'components/DogUpload/DogUpload';
import Gallery from 'components/Gallery/Gallery';
import Text from 'components/Text/Text';
import React, { ReactNode, useState } from 'react';

import s from './App.module.css';

const App = (): ReactNode => {
  const [breedName, setBreedName] = useState('');

  const onChange = (breed: string): void => {
    setBreedName(breed);
  };

  return (
    <div className={s.root}>
      <DogUpload onChange={onChange} />
      {breedName !== '' && (
        <Text className={s.breedName} size="heading">
          {breedName}
        </Text>
      )}
      <Gallery breedName={breedName} />
    </div>
  );
};

export default App;
