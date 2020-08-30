import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { BreedListType, getMatchingBreedInfo } from 'components/Gallery/util';
import Loader from 'components/Loader/Loader';
import Panel from 'components/Panel/Panel';
import Text from 'components/Text/Text';
import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';

import s from './Gallery.module.css';
import DividerLeftImage from './images/divider-left.svg';
import DividerRightImage from './images/divider-right.svg';

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
      setImageList([]);

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
    <div className={s.root}>
      {!imageListIsLoaded && <Loader />}
      {breedListError !== '' && (
        <ErrorMessage message="Couldn't load the list of breeds" type="error" />
      )}
      {imageListError !== '' ||
        (imageList.length === 0 && imageListIsLoaded && (
          <ErrorMessage
            message="Couldn't find images of this breed of dogs"
            type="notFound"
          />
        ))}
      {imageList.length > 0 && (
        <>
          <div className={s.header}>
            <DividerLeftImage />
            <Text className={s.title} size="subheading">
              More of this breed
            </Text>
            <DividerRightImage />
          </div>
          <ul className={s.list}>
            {imageList.map(
              (image: string): ReactNode => (
                <li className={s.listItem} key={image}>
                  <Panel className={s.panel}>
                    <LazyLoad once offset={100}>
                      <img className={s.image} src={image} />
                    </LazyLoad>
                  </Panel>
                </li>
              ),
            )}
          </ul>
          <Text className={s.end} size="heading">
            ❧
          </Text>
        </>
      )}
    </div>
  );
};

export default Gallery;
