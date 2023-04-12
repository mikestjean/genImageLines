const img = new Image();
img.onload = () => {
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  document.body.appendChild(canvas);

  const numLines = 1280;
  const lineHeight = canvas.height / numLines;

  // Create a copy of the original image data
  const originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
  let time = 0;
  function animate() {
    time += 0.1;
    for (let i = 0; i < numLines; i++) {
      const y = i * lineHeight;
      const alpha = (Math.sin(time + y * 0.01) + 1) / 2; // generate alpha value from sin wave
      const imageData = ctx.createImageData(canvas.width, lineHeight);
      // Use the original image data as the source for each line
      imageData.data.set(originalImageData.data.subarray(y * canvas.width * 4, (y + lineHeight) * canvas.width * 4));
      // Set alpha value for each pixel in the line
      for (let j = 3; j < imageData.data.length; j += 4) {
        imageData.data[j] *= alpha;
      }
      ctx.putImageData(imageData, 0, y);
    }
    requestAnimationFrame(animate);
  }
  animate();
};
img.src = 'no_text_DTLW-Goteborg1280v2-1.png';
