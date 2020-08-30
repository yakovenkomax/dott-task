# Description

Your task is to develop a single page application using Typescript where users can upload a picture of a dog and see a gallery of pictures of dogs of the same breed. More specifically, the application should allow users to upload a picture and see it in a preview. The app should classify a dog present in the image based on their breed and display the result. Further, the application should showcase pictures of dogs of the same breed in a gallery below. The gallery should take all the available screen space and consist of lazy loaded images. The images that don’t fit the current screen should be accessible with an “infinite scroll”-approach.

For image classification we suggest you use the pre-trained tensorflow.js-model available at:
https://github.com/tensorflow/tfjs-models/tree/master/mobilenet

For finding pictures of dogs based on their breed we suggest you refer to the following API:
https://dog.ceo/dog-api/

To start the project run:

```bash
npm run start
```
