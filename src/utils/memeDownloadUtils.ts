
import html2canvas from "html2canvas";

export interface DownloadOptions {
  format?: 'png' | 'jpeg';
  quality?: number;
  filename?: string;
}

export const captureMemeContainer = async (options: DownloadOptions = {}) => {
  const { format = 'png', quality = 1.0, filename = `meme-${Date.now()}` } = options;

  // Find the meme container
  const memeContainer = document.querySelector('[data-meme-container]') as HTMLElement;
  if (!memeContainer) {
    throw new Error('Meme container not found');
  }

  console.log("Meme container found:", memeContainer);

  // Get the actual meme image for dimensions
  const memeImage = memeContainer.querySelector('img') as HTMLImageElement;
  if (!memeImage) {
    throw new Error('No meme image found');
  }

  // Use the actual image dimensions for perfect capture - fix the typo
  const width = memeImage.naturalWidth || memeImage.offsetWidth;
  const height = memeImage.naturalHeight || memeImage.offsetHeight;

  console.log("Meme dimensions:", { width, height });

  const canvas = await html2canvas(memeContainer, {
    backgroundColor: null,
    scale: 1,
    useCORS: true,
    allowTaint: false,
    foreignObjectRendering: false,
    logging: true,
    width,
    height,
    scrollX: 0,
    scrollY: 0,
    windowWidth: width,
    windowHeight: height,
    // Remove the onclone callback to avoid cloning issues
    ignoreElements: (element) => {
      // Only ignore UI elements that shouldn't be in the final image
      return (
        element.classList.contains("ring-2") ||
        element.classList.contains("ring-blue-400") ||
        element.hasAttribute("data-selection-ring") ||
        element.classList.contains("pointer-events-none") ||
        element.hasAttribute("data-placeholder") ||
        element.classList.contains("resize-handle") ||
        element.classList.contains("control-handle")
      );
    }
  });

  if (!canvas) {
    throw new Error("Failed to create canvas");
  }

  console.log("Canvas created successfully", canvas.width, canvas.height);

  // Create download link
  const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png';
  const dataUrl = canvas.toDataURL(mimeType, quality);
  
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = `${filename}.${format}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  console.log("Download successful");
  return { success: true, canvas, dataUrl };
};
