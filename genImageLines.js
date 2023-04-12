const img1 = new Image();
const img2 = new Image();

let imagesLoaded = 0;

img1.onload = handleImagesLoad;
img2.onload = handleImagesLoad;

img1.src = 'no_text_DTLW-Goteborg1280v2-1.png';
img2.src = 'no_text_DTLW-Barcelona800-1.png';

function handleImagesLoad() {
  imagesLoaded++;
  if (imagesLoaded < 2) {
    return;
  }
  const canvas = document.createElement('canvas');
  canvas.width = img1.width;
  canvas.height = img1.height;
  const ctx = canvas.getContext('2d');
  document.body.appendChild(canvas);

  const numLines = 1280;
  const lineHeight = canvas.height / numLines;

  // Create a copy of the original image data for both images
  const originalImageData1 = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const originalImageData2 = ctx.getImageData(0, 0, canvas.width, canvas.height);
  originalImageData1.data.set(ctx.getImageData(0, 0, canvas.width, canvas.height).data);
  originalImageData2.data.set(ctx.getImageData(0, 0, canvas.width, canvas.height).data);

  let time = 0;
  function animate() {
    time += 0.1;
    for (let i = 0; i < numLines; i++) {
      const y = i * lineHeight;
      const alpha1 = (Math.sin(time + y * 0.01) + 1) / 2; // generate alpha value from sin wave
      const alpha2 = 0.5 - alpha1; // calculate second image alpha as offset of first image alpha
      const imageData1 = ctx.createImageData(canvas.width, lineHeight);
      const imageData2 = ctx.createImageData(canvas.width, lineHeight);
      // Use the original image data as the source for each line
      imageData1.data.set(originalImageData1.data.subarray(y * canvas.width * 4, (y + lineHeight) * canvas.width * 4));
      imageData2.data.set(originalImageData2.data.subarray(y * canvas.width * 4, (y + lineHeight) * canvas.width * 4));
      // Set alpha value for each pixel in the line
      for (let j = 3; j < imageData1.data.length; j += 4) {
        imageData1.data[j] *= alpha1;
        imageData2.data[j] *= alpha2;
      }
      // Draw first image below second image
      ctx.putImageData(imageData1, 0, y);
      ctx.putImageData(imageData2, 0, y);
    }
    requestAnimationFrame(animate);
  }
  animate();
};
