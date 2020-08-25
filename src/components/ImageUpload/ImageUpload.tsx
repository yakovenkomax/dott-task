import React, { ReactElement, SyntheticEvent } from 'react';

interface Props {
  onChange: (fileUrl: string) => void;
}

const ImageUpload = (props: Props): ReactElement | null => {
  const { onChange } = props;

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
    <input
      type="file"
      onChange={handleChange}
      accept={'image/jpeg, image/gif, image/png'}
    />
  );
};

export default ImageUpload;
