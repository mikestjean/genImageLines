const img1 = new Image();
img1.onload = () => {
  const canvas = document.createElement('canvas');
  canvas.width = img1.width;
  canvas.height = img1.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img1, 0, 0);
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

  // Add second image on top of the first one
  const img2 = new Image();
  img2.onload = () => {
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
    ctx.drawImage(img2, 0, 0);
    
    const originalImageData2 = ctx.getImageData(0, 0, canvas.width, canvas.height);

    let time2 = 0;
    function animate2() {
      time2 += 0.1;
      for (let i = 0; i < numLines; i++) {
        const y = i * lineHeight;
        const alpha2 = (Math.sin(time2 + y * 0.01) + 1) / 2; // generate alpha value from sin wave
        const imageData2 = ctx.createImageData(canvas.width, lineHeight);
        // Use the original image data as the source for each line
        imageData2.data.set(originalImageData2.data.subarray(y * canvas.width * 4, (y + lineHeight) * canvas.width * 4));
        // Set alpha value for each pixel in the line
        for (let j = 3; j < imageData2.data.length; j += 4) {
          imageData2.data[j - 1] *= alpha2;
        }
        ctx.globalAlpha = alpha2;
        ctx.putImageData(imageData2, 0, y);
      }
      requestAnimationFrame(animate2);
    }
    animate2();
  };
  img2.src = 'no_text_DTLW-Barcelona800-1.png';
};
img1.src = 'no_text_DTLW-Goteborg1280v2-1.png';
