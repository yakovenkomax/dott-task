import React, { ReactElement } from 'react';

interface Props {
  fileUrl: string;
}

const ImagePreview = (props: Props): ReactElement | null => {
  const { fileUrl } = props;

  if (fileUrl === '') {
    return null;
  }

  return <img src={fileUrl} />;
};

export default ImagePreview;
