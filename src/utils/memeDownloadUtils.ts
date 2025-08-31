
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

  // Use the actual image dimensions for perfect capture
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
    onclone: (clonedDoc) => {
      console.log("Cloning document for download");
      
      // Find the cloned meme container
      const clonedContainer = clonedDoc.querySelector('[data-meme-container]') as HTMLElement;
      if (clonedContainer) {
        // Clean up container styling
        clonedContainer.style.background = 'transparent';
        clonedContainer.style.margin = '0';
        clonedContainer.style.padding = '0';
        clonedContainer.style.position = 'relative';
        clonedContainer.style.display = 'block';
        clonedContainer.style.width = `${width}px`;
        clonedContainer.style.height = `${height}px`;
        clonedContainer.style.overflow = 'visible';

        // Fix the meme image positioning
        const clonedImg = clonedContainer.querySelector('img') as HTMLElement;
        if (clonedImg) {
          clonedImg.style.display = 'block';
          clonedImg.style.margin = '0';
          clonedImg.style.padding = '0';
          clonedImg.style.width = `${width}px`;
          clonedImg.style.height = `${height}px`;
          clonedImg.style.position = 'absolute';
          clonedImg.style.top = '0';
          clonedImg.style.left = '0';
        }
        
        // Process all text elements to ensure proper formatting
        processTextElements(clonedContainer, memeContainer);
      }
    },
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

const processTextElements = (clonedContainer: HTMLElement, originalContainer: HTMLElement) => {
  // Find and fix ALL text elements - including header, footer, and regular text
  const textElementTypes = [
    { selector: '[data-header-text]', name: 'header' },
    { selector: '[data-footer-text]', name: 'footer' },
    { selector: '[data-regular-text]', name: 'regular' }
  ];

  textElementTypes.forEach(({ selector, name }) => {
    const clonedElements = clonedContainer.querySelectorAll(selector);
    const originalElements = originalContainer.querySelectorAll(selector);
    
    console.log(`Found ${clonedElements.length} ${name} text elements`);
    
    clonedElements.forEach((clonedElement, index) => {
      const element = clonedElement as HTMLElement;
      const originalElement = originalElements[index] as HTMLElement;
      
      if (originalElement) {
        console.log(`Processing ${name} text ${index}:`, element.textContent);
        copyElementStyles(element, originalElement);
      }
    });
  });
};

const copyElementStyles = (clonedElement: HTMLElement, originalElement: HTMLElement) => {
  const computedStyle = window.getComputedStyle(originalElement);
  
  // Copy all essential styles from original
  clonedElement.style.position = 'absolute';
  clonedElement.style.left = originalElement.style.left || computedStyle.left;
  clonedElement.style.top = originalElement.style.top || computedStyle.top;
  clonedElement.style.transform = originalElement.style.transform || computedStyle.transform;
  clonedElement.style.fontSize = originalElement.style.fontSize || computedStyle.fontSize;
  clonedElement.style.fontFamily = originalElement.style.fontFamily || computedStyle.fontFamily;
  clonedElement.style.fontWeight = originalElement.style.fontWeight || computedStyle.fontWeight;
  clonedElement.style.color = originalElement.style.color || computedStyle.color;
  clonedElement.style.textAlign = originalElement.style.textAlign || computedStyle.textAlign;
  clonedElement.style.textShadow = originalElement.style.textShadow || computedStyle.textShadow;
  clonedElement.style.lineHeight = originalElement.style.lineHeight || computedStyle.lineHeight;
  clonedElement.style.whiteSpace = originalElement.style.whiteSpace || computedStyle.whiteSpace;
  clonedElement.style.width = originalElement.style.width || computedStyle.width;
  clonedElement.style.height = originalElement.style.height || computedStyle.height;
  clonedElement.style.padding = originalElement.style.padding || computedStyle.padding;
  clonedElement.style.margin = '0';
  clonedElement.style.backgroundColor = originalElement.style.backgroundColor || computedStyle.backgroundColor;
  clonedElement.style.borderRadius = originalElement.style.borderRadius || computedStyle.borderRadius;
  clonedElement.style.opacity = originalElement.style.opacity || computedStyle.opacity;
  clonedElement.style.zIndex = '100';
  clonedElement.style.visibility = 'visible';
  clonedElement.style.display = 'block';
};
