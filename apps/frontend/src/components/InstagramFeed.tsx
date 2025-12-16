import { useEffect } from "react";

export default function InstagramFeed() {
  useEffect(() => {
    if (!document.getElementById("lightwidget-script")) {
      const script = document.createElement("script");
      script.id = "lightwidget-script";
      script.src = "https://cdn.lightwidget.com/widgets/lightwidget.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="w-full overflow-hidden rounded-xl shadow-md bg-background">
      <iframe
        src="https://lightwidget.com/widgets/6fc67deb8d0b5c9e997d87b0446d5c90.html"
        className="lightwidget-widget w-full border-0"
        scrolling="no"
        style={{ height: "520px" }}
        title="Instagram Feed"
      />
    </div>
  );
}
