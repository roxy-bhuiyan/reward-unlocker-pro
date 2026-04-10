import { useEffect, useRef, useState } from "react";
import { Loader2, X } from "lucide-react";

interface ContentLockerProps {
  lockerScript: string;
  onClose: () => void;
}

const ContentLocker = ({ lockerScript, onClose }: ContentLockerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading || !lockerScript || !containerRef.current) return;

    // Parse the script content and execute properly
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = lockerScript;

    const scripts = tempDiv.querySelectorAll("script");
    scripts.forEach((originalScript) => {
      const newScript = document.createElement("script");
      // Copy all attributes
      Array.from(originalScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });
      // If inline script, set the content
      if (!originalScript.src && originalScript.textContent) {
        newScript.textContent = originalScript.textContent;
      }
      // Append to document head so it executes globally
      document.head.appendChild(newScript);
    });

    // Also append any non-script content to the container
    const nonScriptContent = lockerScript.replace(/<script[\s\S]*?<\/script>/gi, "").trim();
    if (nonScriptContent && containerRef.current) {
      containerRef.current.innerHTML = nonScriptContent;
    }
  }, [loading, lockerScript]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-card rounded-2xl shadow-2xl max-w-lg w-full mx-4 p-6 relative border border-border min-h-[200px]">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground z-10">
          <X className="w-5 h-5" />
        </button>
        {loading ? (
          <div className="flex flex-col items-center py-12 gap-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-muted-foreground font-medium">Preparing your reward...</p>
          </div>
        ) : lockerScript ? (
          <div ref={containerRef} className="min-h-[100px]" />
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Content locker not configured yet.</p>
            <p className="text-sm text-muted-foreground mt-2">Set it up in the admin panel.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentLocker;
