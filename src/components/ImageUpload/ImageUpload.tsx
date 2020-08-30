import React, { ReactElement, ReactNode, SyntheticEvent } from 'react';

import s from './ImageUpload.module.css';

interface Props {
  children: ReactNode;
  onChange: (fileUrl: string) => void;
}

const ImageUpload = (props: Props): ReactElement | null => {
  const { onChange, children } = props;

  const handleChange = (event: SyntheticEvent<HTMLInputElement>): void => {
    event.preventDefault();

    if (
      event.target instanceof HTMLInputElement &&
      event.target.files instanceof FileList
    ) {
      const [file] = event.target.files;
      const reader = new FileReader();

      reader.onloadend = (): void => {
        const { result } = reader;

        if (typeof result === 'string') {
          onChange(result);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <label className={s.label} htmlFor="file">
      <input
        className={s.input}
        type="file"
        id="file"
        onChange={handleChange}
        accept={'image/jpeg, image/gif, image/png'}
      />
      {children}
    </label>
  );
};

export default ImageUpload;
