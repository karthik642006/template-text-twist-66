
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DownloadComponent = () => {
  const { toast } = useToast();

  const handleDownloadClick = async () => {
    console.log("Download component clicked");

    try {
      // Find the meme container
      const memeContainer = document.querySelector('[data-meme-container]') as HTMLElement;

      if (!memeContainer) {
        toast({
          title: "Download failed",
          description: "Could not find meme to download",
          variant: "destructive"
        });
        return;
      }

      console.log("Meme container found:", memeContainer);

      // Dynamically import html2canvas
      const { default: html2canvas } = await import("html2canvas");

      // Get the actual meme image for dimensions
      const memeImage = memeContainer.querySelector('img') as HTMLImageElement;
      if (!memeImage) {
        toast({
          title: "Download failed",
          description: "No meme image found",
          variant: "destructive"
        });
        return;
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
            
            // Find and fix ALL text elements - including header, footer, and regular text
            const headerTextElements = clonedContainer.querySelectorAll('[data-header-text]');
            const footerTextElements = clonedContainer.querySelectorAll('[data-footer-text]');
            const regularTextElements = clonedContainer.querySelectorAll('[data-text-element]');
            
            console.log(`Found ${headerTextElements.length} header text elements`);
            console.log(`Found ${footerTextElements.length} footer text elements`);
            console.log(`Found ${regularTextElements.length} regular text elements`);
            
            // Process header text elements
            headerTextElements.forEach((textEl, index) => {
              const element = textEl as HTMLElement;
              const dataAttribute = element.getAttribute('data-header-text');
              const originalElement = memeContainer.querySelector(`[data-header-text="${dataAttribute}"]`) as HTMLElement;
              
              if (originalElement) {
                console.log(`Processing header text ${index}:`, element.textContent);
                const computedStyle = window.getComputedStyle(originalElement);
                
                // Copy all styles from original
                element.style.position = 'absolute';
                element.style.left = originalElement.style.left || computedStyle.left;
                element.style.top = originalElement.style.top || computedStyle.top;
                element.style.transform = originalElement.style.transform || computedStyle.transform;
                element.style.fontSize = originalElement.style.fontSize || computedStyle.fontSize;
                element.style.fontFamily = originalElement.style.fontFamily || computedStyle.fontFamily;
                element.style.fontWeight = originalElement.style.fontWeight || computedStyle.fontWeight;
                element.style.color = originalElement.style.color || computedStyle.color;
                element.style.textAlign = originalElement.style.textAlign || computedStyle.textAlign;
                element.style.textShadow = originalElement.style.textShadow || computedStyle.textShadow;
                element.style.lineHeight = originalElement.style.lineHeight || computedStyle.lineHeight;
                element.style.whiteSpace = originalElement.style.whiteSpace || computedStyle.whiteSpace;
                element.style.width = originalElement.style.width || computedStyle.width;
                element.style.height = originalElement.style.height || computedStyle.height;
                element.style.padding = originalElement.style.padding || computedStyle.padding;
                element.style.margin = '0';
                element.style.backgroundColor = originalElement.style.backgroundColor || computedStyle.backgroundColor;
                element.style.borderRadius = originalElement.style.borderRadius || computedStyle.borderRadius;
                element.style.opacity = originalElement.style.opacity || computedStyle.opacity;
                element.style.zIndex = '100';
                element.style.visibility = 'visible';
                element.style.display = 'block';
              }
            });

            // Process footer text elements
            footerTextElements.forEach((textEl, index) => {
              const element = textEl as HTMLElement;
              const dataAttribute = element.getAttribute('data-footer-text');
              const originalElement = memeContainer.querySelector(`[data-footer-text="${dataAttribute}"]`) as HTMLElement;
              
              if (originalElement) {
                console.log(`Processing footer text ${index}:`, element.textContent);
                const computedStyle = window.getComputedStyle(originalElement);
                
                // Copy all styles from original
                element.style.position = 'absolute';
                element.style.left = originalElement.style.left || computedStyle.left;
                element.style.top = originalElement.style.top || computedStyle.top;
                element.style.transform = originalElement.style.transform || computedStyle.transform;
                element.style.fontSize = originalElement.style.fontSize || computedStyle.fontSize;
                element.style.fontFamily = originalElement.style.fontFamily || computedStyle.fontFamily;
                element.style.fontWeight = originalElement.style.fontWeight || computedStyle.fontWeight;
                element.style.color = originalElement.style.color || computedStyle.color;
                element.style.textAlign = originalElement.style.textAlign || computedStyle.textAlign;
                element.style.textShadow = originalElement.style.textShadow || computedStyle.textShadow;
                element.style.lineHeight = originalElement.style.lineHeight || computedStyle.lineHeight;
                element.style.whiteSpace = originalElement.style.whiteSpace || computedStyle.whiteSpace;
                element.style.width = originalElement.style.width || computedStyle.width;
                element.style.height = originalElement.style.height || computedStyle.height;
                element.style.padding = originalElement.style.padding || computedStyle.padding;
                element.style.margin = '0';
                element.style.backgroundColor = originalElement.style.backgroundColor || computedStyle.backgroundColor;
                element.style.borderRadius = originalElement.style.borderRadius || computedStyle.borderRadius;
                element.style.opacity = originalElement.style.opacity || computedStyle.opacity;
                element.style.zIndex = '100';
                element.style.visibility = 'visible';
                element.style.display = 'block';
              }
            });

            // Process regular text elements
            regularTextElements.forEach((textEl, index) => {
              const element = textEl as HTMLElement;
              const dataAttribute = element.getAttribute('data-text-element');
              const originalElement = memeContainer.querySelector(`[data-text-element="${dataAttribute}"]`) as HTMLElement;
              
              if (originalElement) {
                console.log(`Processing regular text ${index}:`, element.textContent);
                const computedStyle = window.getComputedStyle(originalElement);
                
                // Copy all styles from original
                element.style.position = 'absolute';
                element.style.left = originalElement.style.left || computedStyle.left;
                element.style.top = originalElement.style.top || computedStyle.top;
                element.style.transform = originalElement.style.transform || computedStyle.transform;
                element.style.fontSize = originalElement.style.fontSize || computedStyle.fontSize;
                element.style.fontFamily = originalElement.style.fontFamily || computedStyle.fontFamily;
                element.style.fontWeight = originalElement.style.fontWeight || computedStyle.fontWeight;
                element.style.color = originalElement.style.color || computedStyle.color;
                element.style.textAlign = originalElement.style.textAlign || computedStyle.textAlign;
                element.style.textShadow = originalElement.style.textShadow || computedStyle.textShadow;
                element.style.lineHeight = originalElement.style.lineHeight || computedStyle.lineHeight;
                element.style.whiteSpace = originalElement.style.whiteSpace || computedStyle.whiteSpace;
                element.style.width = originalElement.style.width || computedStyle.width;
                element.style.height = originalElement.style.height || computedStyle.height;
                element.style.padding = originalElement.style.padding || computedStyle.padding;
                element.style.margin = '0';
                element.style.backgroundColor = originalElement.style.backgroundColor || computedStyle.backgroundColor;
                element.style.borderRadius = originalElement.style.borderRadius || computedStyle.borderRadius;
                element.style.opacity = originalElement.style.opacity || computedStyle.opacity;
                element.style.zIndex = '100';
                element.style.visibility = 'visible';
                element.style.display = 'block';
              }
            });
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

      // Download as PNG
      const dataUrl = canvas.toDataURL("image/png", 1.0);
      
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `meme-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log("Download successful");
      toast({
        title: "Download successful!",
        description: "Your meme has been downloaded as PNG."
      });

    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Download failed",
        description: "Unable to download meme. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-none hover:from-orange-600 hover:to-red-600 text-xs px-2 h-8"
      onClick={handleDownloadClick}
    >
      <Download className="w-3 h-3 mr-1" />
      <span className="hidden sm:inline">DL</span>
      <span className="sm:hidden">DL</span>
    </Button>
  );
};

export default DownloadComponent;
