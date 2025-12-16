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
        src="https://lightwidget.com/widgets/b117cf7c58b456c5bcd206a95b9d1823.html
"
        scrolling="no"
        allowTransparency={true}
        className="lightwidget-widget w-full border-0 overflow-hidden"
        style={{ minHeight: "520px" }}
        title="Instagram Feed"
      />
    </div>
  );
}
