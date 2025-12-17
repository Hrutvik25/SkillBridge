import { useEffect } from "react";

export default function InstagramFeed() {
  useEffect(() => {
    // Load Elfsight script only once
    if (!document.getElementById("elfsight-script")) {
      const script = document.createElement("script");
      script.id = "elfsight-script";
      script.src = "https://elfsightcdn.com/platform.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="w-full rounded-xl shadow-md bg-background p-4">
      <div
        className="elfsight-app-9ee5f24b-7bcd-482e-a3f5-61a92f788488"
        data-elfsight-app-lazy
      />
    </div>
  );
}
