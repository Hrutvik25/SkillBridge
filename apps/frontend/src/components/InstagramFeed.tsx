import { useEffect } from "react";

export default function InstagramFeed() {
  useEffect(() => {
    // Prevent loading script multiple times
    if (!document.querySelector('script[src="https://cdn.lightwidget.com/widgets/lightwidget.js"]')) {
      const script = document.createElement("script");
      script.src = "https://cdn.lightwidget.com/widgets/lightwidget.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="w-full overflow-hidden rounded-xl shadow-md bg-background">
      <iframe
        src="http://lightwidget.com/widgets/6fc67deb8d0b5c9e997d87b0446d5c90.html"
        scrolling="no"
        allowTransparency={true}
        className="lightwidget-widget w-full border-0 overflow-hidden"
        style={{ minHeight: "520px", width: '100%', border: 0, overflow: 'hidden' }}
        title="Instagram Feed"
      />
    </div>
  );
}
