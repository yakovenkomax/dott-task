export interface BreedListType {
  [key: string]: string[];
}

interface MatchingBreedInfoType {
  breed?: string;
  subBreed?: string;
}

export const getMatchingBreedInfo = (
  breedName: string | undefined,
  breedList: BreedListType | null,
): MatchingBreedInfoType => {
  const matchingBreedInfo: MatchingBreedInfoType = {};

  if (breedName === undefined || breedList === null) {
    return matchingBreedInfo;
  }

  const [mainBreedName] = breedName.split(',');
  const breedKeys = mainBreedName.split(' ');
  const matchingBreed = Object.keys(breedList).find((key: string): boolean =>
    breedKeys.includes(key),
  );

  if (matchingBreed !== undefined) {
    const matchingSubBreed = breedList[
      matchingBreed
    ].find((key: string): boolean => breedKeys.includes(key));

    matchingBreedInfo.breed = matchingBreed;

    if (matchingSubBreed !== undefined) {
      matchingBreedInfo.subBreed = matchingSubBreed;
    }
  }

  return matchingBreedInfo;
};
