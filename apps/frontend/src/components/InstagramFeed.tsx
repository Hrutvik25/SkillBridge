import { useEffect } from "react";

export default function InstagramFeed() {
  useEffect(() => {
    // Load LightWidget script safely
    const script = document.createElement("script");
    script.src = "https://cdn.lightwidget.com/widgets/lightwidget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="w-full overflow-hidden rounded-xl shadow-md bg-background">
      <iframe
        src="http://lightwidget.com/widgets/435a869c89395d40bc30093a6a72daa8.html"

        scrolling="no"
        allowTransparency={true}
        className="lightwidget-widget w-full border-0"
        style={{ minHeight: "520px" }}
        title="Instagram Feed"
      />
    </div>
  );
}
