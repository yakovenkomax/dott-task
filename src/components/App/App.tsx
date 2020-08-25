import ImagePreview from 'components/ImagePreview/ImagePreview';
import ImageUpload from 'components/ImageUpload/ImageUpload';
import React, { ReactElement, useState } from 'react';

const App = (): ReactElement | null => {
  const [fileUrl, setFileUrl] = useState('');

  const onChange = (url: string): void => {
    setFileUrl(url);
  };

  return (
    <>
      <ImageUpload onChange={onChange} />
      <ImagePreview fileUrl={fileUrl} />
    </>
  );
};

export default App;
