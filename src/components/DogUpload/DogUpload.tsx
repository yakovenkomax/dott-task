import { classifyImage } from 'components/DogUpload/util';
import ImageUpload from 'components/ImageUpload/ImageUpload';
import Loader from 'components/Loader/Loader';
import Panel from 'components/Panel/Panel';
import Text from 'components/Text/Text';
import React, { ReactElement, useState } from 'react';

import s from './DogUpload.module.css';
import DogImage1 from './images/dog-1.svg';
import DogImage2 from './images/dog-2.svg';
import DogImage3 from './images/dog-3.svg';
import DogImage4 from './images/dog-4.svg';
import DogImage5 from './images/dog-5.svg';
import DogImage6 from './images/dog-6.svg';

const dogImagesList = [
  DogImage1,
  DogImage2,
  DogImage3,
  DogImage4,
  DogImage5,
  DogImage6,
];

interface Props {
  onChange: (breedName: string) => void;
}

const DogUpload = (props: Props): ReactElement | null => {
  const [fileSrc, setFileSrc] = useState('');
  const [classificationInProgress, setClassificationInProgress] = useState(
    false,
  );
  const { onChange } = props;
  const randomImageIndex = Math.floor(Math.random() * dogImagesList.length);
  const DogImage = dogImagesList[randomImageIndex];

  const handleChange = async (src: string): Promise<void> => {
    onChange('');
    setFileSrc(src);

    setClassificationInProgress(true);
    const breedName = await classifyImage(src);
    setClassificationInProgress(false);
    onChange(breedName);
  };

  return (
    <div className={s.root}>
      <ImageUpload onChange={handleChange}>
        <Panel className={s.panel}>
          {fileSrc === '' ? (
            <div className={s.border}>
              <div className={s.dogImage}>
                <DogImage />
              </div>
              <Text className={s.text}>
                <span className={s.fakeLink}>Choose an image</span> of{'\u00A0'}
                a{'\u00A0'}dog or drag{'\u00A0'}it here
              </Text>
            </div>
          ) : (
            <img className={s.previewImage} src={fileSrc} />
          )}
        </Panel>
      </ImageUpload>
      {classificationInProgress && <Loader />}
    </div>
  );
};

export default DogUpload;
