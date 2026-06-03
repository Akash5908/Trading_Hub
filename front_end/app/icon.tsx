import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Icon generation matching the brand's logo
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#8b5cf6", // Brand primary purple color
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "8px",
          color: "white",
          fontSize: "20px",
          fontWeight: "bold",
          fontFamily: "sans-serif",
        }}
      >
        ↗
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}
