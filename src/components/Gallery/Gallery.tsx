import { BreedListType, getMatchingBreedInfo } from 'components/Gallery/util';
import React, { ReactElement, useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';

interface Props {
  breedName: string;
}

interface BreedListResultType {
  message: BreedListType;
}

interface ImageListResultType {
  message: string[];
}

const Gallery = (props: Props): ReactElement | null => {
  const [imageList, setImageList] = useState<string[]>([]);
  const [imageListError, setImageListError] = useState('');
  const [imageListIsLoaded, setImageListIsLoaded] = useState(true);
  const [breedList, setBreedList] = useState<BreedListType | null>(null);
  const [breedListError, setBreedListError] = useState('');
  const { breedName } = props;

  useEffect((): void => {
    fetch('https://dog.ceo/api/breeds/list/all')
      .then(async (res: Response): Promise<BreedListResultType> => res.json())
      .then(
        (result: BreedListResultType): void => {
          setBreedList(result.message);
        },
        (error: Error): void => {
          setBreedListError(error.message);
        },
      );
  }, []);

  useEffect((): void => {
    const matchingBreedInfo = getMatchingBreedInfo(breedName, breedList);

    if (matchingBreedInfo.breed === undefined) {
      return;
    }

    const { breed, subBreed } = matchingBreedInfo;
    const subBreedPart = subBreed === undefined ? '' : `/${subBreed}`;

    setImageListIsLoaded(false);
    fetch(`https://dog.ceo/api/breed/${breed}${subBreedPart}/images`)
      .then(async (res: Response): Promise<ImageListResultType> => res.json())
      .then(
        (result: ImageListResultType): void => {
          setImageListIsLoaded(true);
          setImageList(result.message);
        },
        (error: Error): void => {
          setImageListIsLoaded(true);
          setImageListError(error.message);
        },
      );
  }, [breedName, breedList]);

  if (breedName === '') {
    return null;
  }

  return (
    <>
      {breedListError !== '' && (
        <div>An breedListError occurred: {breedListError}</div>
      )}
      {imageListError !== '' && (
        <div>An imageListError occurred: {breedListError}</div>
      )}
      {!imageListIsLoaded && <div>Images are loading...</div>}
      {imageList.length > 0 && (
        <div>
          {imageList.map(
            (image: string): ReactElement => (
              <LazyLoad key={image}>
                <img src={image} />
              </LazyLoad>
            ),
          )}
        </div>
      )}
    </>
  );
};

export default Gallery;
