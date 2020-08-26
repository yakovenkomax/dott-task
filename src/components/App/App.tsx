import * as mobilenet from '@tensorflow-models/mobilenet';
import ImagePreview from 'components/ImagePreview/ImagePreview';
import ImageUpload from 'components/ImageUpload/ImageUpload';
import React, { ReactElement, useState } from 'react';

const App = (): ReactElement | null => {
  const [fileUrl, setFileUrl] = useState('');
  const [breed, setBreed] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const classifyImage = async (src: string): Promise<void> => {
    const img = new Image();
    img.src = src;

    const model = await mobilenet.load();
    const predictions = await model.classify(img);
    const detectedBreed = predictions[0].className.toLowerCase();

    setBreed(detectedBreed);
  }

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
      {breed !== '' && <div>Detected breed: { breed }</div>}
      {errorMessage !== '' && <div>An error occurred: { errorMessage }</div>}
    </>
  );
};

export default App;
