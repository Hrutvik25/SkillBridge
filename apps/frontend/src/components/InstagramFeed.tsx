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
        src="//lightwidget.com/widgets/57aa15151cb354e787e5c29c84770f1d.html"
        className="lightwidget-widget"
        scrolling="no"
        allowTransparency={true}
        style={{ width: '100%', border: 0, overflow: 'hidden', height: '520px' }}
        title="Instagram Feed"
      />
    </div>
  );
}
