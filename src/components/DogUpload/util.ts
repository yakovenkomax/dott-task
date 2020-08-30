import * as mobilenet from '@tensorflow-models/mobilenet';

export const classifyImage = async (src: string): Promise<string> => {
  const img = new Image();
  img.src = src;

  const model = await mobilenet.load();
  const predictions = await model.classify(img);
  const detectedBreed = predictions[0].className.split(',')[0].toLowerCase();

  return detectedBreed;
};
