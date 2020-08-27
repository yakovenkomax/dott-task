import * as mobilenet from '@tensorflow-models/mobilenet';
import Gallery from 'components/Gallery/Gallery';
import ImagePreview from 'components/ImagePreview/ImagePreview';
import ImageUpload from 'components/ImageUpload/ImageUpload';
import React, { ReactElement, useState } from 'react';

const App = (): ReactElement | null => {
  const [fileUrl, setFileUrl] = useState('');
  const [breedName, setBreedName] = useState('');
  const [classifyError, setErrorMessage] = useState('');

  const classifyImage = async (src: string): Promise<void> => {
    const img = new Image();
    img.src = src;

    const model = await mobilenet.load();
    const predictions = await model.classify(img);
    const detectedBreed = predictions[0].className.toLowerCase();

    setBreedName(detectedBreed);
  };

  const onChange = (src: string): void => {
    setFileUrl(src);
    classifyImage(src).catch((error: Error): void => {
      setErrorMessage(error.message);
    });
  };

  return (
    <>
      <ImageUpload onChange={onChange} />
      <ImagePreview fileUrl={fileUrl} />
      {breedName !== '' && <div>Detected breed: {breedName}</div>}
      {classifyError !== '' && (
        <div>An classifyError occurred: {classifyError}</div>
      )}
      <Gallery breedName={breedName} />
    </>
  );
};

export default App;
