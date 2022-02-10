import html2canvas from 'html2canvas';
import { useState } from 'react';

export const useScreenshot = ({
  type,
  quality,
}: {
  type?: string;
  quality?: unknown;
} = {}): [string | null, (node: HTMLDivElement | null) => Promise<string | null>] => {
  const [image, setImage] = useState<string | null>(null);
  /**
   * convert html node to image
   * @param {HTMLElement} node
   */
  const takeScreenShot = (node: HTMLDivElement | null) => {
    if (!node) {
      throw new Error('You should provide correct html node.');
    }
    return html2canvas(node, { proxy: 'http://localhost:3000/media-proxy' })
      .then((canvas) => {
        const croppedCanvas = document.createElement('canvas');
        const croppedCanvasContext = croppedCanvas.getContext('2d');
        // init data
        const cropPositionTop = 0;
        const cropPositionLeft = 0;
        const cropWidth = canvas.width;
        const cropHeight = canvas.height;

        croppedCanvas.width = cropWidth;
        croppedCanvas.height = cropHeight;

        croppedCanvasContext?.drawImage(canvas, cropPositionLeft, cropPositionTop);

        const base64Image = croppedCanvas.toDataURL(type, quality);

        setImage(base64Image);
        return base64Image;
      })
      .catch(() => null);
  };

  return [image, takeScreenShot];
};
