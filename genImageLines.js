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
      const offset = Math.sin(time + y * 0.01) * 20;
      // Use the original image data as the source for each line
      const imageData = ctx.createImageData(canvas.width, lineHeight);
      imageData.data.set(originalImageData.data.subarray(y * canvas.width * 4, (y + lineHeight) * canvas.width * 4));
      ctx.putImageData(imageData, 0, y + offset);
    }
    requestAnimationFrame(animate);
  }
  animate();
};
img.src = 'no_text_DTLW-Goteborg1280v2-1.png';
