import { useEffect } from "react";

interface ContentLockerProps {
  lockerScript: string;
  onClose: () => void;
}

const ContentLocker = ({ lockerScript, onClose }: ContentLockerProps) => {
  useEffect(() => {
    if (!lockerScript) return;

    // Parse the script content and inject into document head
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = lockerScript;

    const addedElements: HTMLElement[] = [];

    const scripts = tempDiv.querySelectorAll("script");
    scripts.forEach((originalScript) => {
      const newScript = document.createElement("script");
      Array.from(originalScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });
      if (!originalScript.src && originalScript.textContent) {
        newScript.textContent = originalScript.textContent;
      }
      document.head.appendChild(newScript);
      addedElements.push(newScript);
    });

    // Close our React state after a moment since the external script handles UI
    const timer = setTimeout(() => onClose(), 500);

    return () => {
      clearTimeout(timer);
      // Cleanup injected scripts on unmount
      addedElements.forEach((el) => el.remove());
    };
  }, [lockerScript, onClose]);

  return null; // The external script handles all UI
};

export default ContentLocker;
