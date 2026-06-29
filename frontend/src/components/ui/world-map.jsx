"use client";
import { WORLD_MAP_PATHS } from "../site/worldMapPaths";

// Projection function to map lat/lng to SVG viewBox coords
function project(lat, lng) {
  // Longitude linear mapping: X = 2.7605 * lng + 480.3578
  const x = 2.7605 * lng + 480.3578;
  
  // Latitude Mercator mapping: Y = -157.2263 * ln(tan(pi/4 + lat_rad/2)) + 459.9018
  const latRad = (lat * Math.PI) / 180.0;
  const merc = Math.log(Math.tan(Math.PI / 4.0 + latRad / 2.0));
  const y = -157.2263 * merc + 459.9018;
  
  return { x, y };
}

export default function WorldMap({ dots = [], lineColor = "#D4AF37", onHover, hoveredCode }) {

  // Parse lines between start and end
  const projectedPoints = dots.map((dot, idx) => {
    const start = project(dot.start.lat, dot.start.lng);
    const end = project(dot.end.lat, dot.end.lng);
    
    // Create control point for curve
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const mx = (start.x + end.x) / 2 - dy * 0.12;
    const my = (start.y + end.y) / 2 - Math.abs(dx) * 0.12;

    return {
      id: idx,
      start,
      end,
      path: `M${start.x},${start.y} Q${mx},${my} ${end.x},${end.y}`,
      code: dot.end.code,
      name: dot.end.name
    };
  });

  return (
    <div className="relative w-full aspect-[1.66/1] overflow-hidden">
      <svg
        viewBox="0 0 1000 600"
        className="w-full h-full select-none"
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>



        {/* Render detailed world map outlines */}
        <g>
          {WORLD_MAP_PATHS.map((path) => {
            const isMarket = dots.some((d) => d.end.code === path.id);
            const isOrigin = path.id === "IN";
            const isHovered = hoveredCode === path.id;

            let fill = "#222a2d";
            let stroke = "#181f21";

            if (isOrigin) {
              fill = "#3a3424";
              stroke = "#D4AF37";
            } else if (isMarket) {
              fill = isHovered ? "#2E5A27" : "#28352e";
              stroke = isHovered ? "#D4AF37" : "#2E5A27";
            }

            return (
              <path
                key={path.id}
                id={`country-${path.id}`}
                d={path.d}
                fill={fill}
                stroke={stroke}
                strokeWidth="0.5"
                style={{
                  transition: "fill 300ms, stroke 300ms",
                  cursor: isMarket ? "pointer" : "default",
                }}
                onMouseEnter={() => {
                  if (isMarket) {
                    onHover && onHover(path.id);
                  }
                }}
                onMouseLeave={() => {
                  if (isMarket) {
                    onHover && onHover(null);
                  }
                }}
              />
            );
          })}
        </g>

        {/* Render animated trade lines */}
        {projectedPoints.map((point) => {
          const isHovered = hoveredCode === point.code;
          return (
            <g key={`group-${point.id}`}>
              {/* Background path line */}
              <path
                d={point.path}
                fill="none"
                stroke={isHovered ? "#D4AF37" : "rgba(212,175,55,0.12)"}
                strokeWidth={isHovered ? 1.5 : 1.2}
                style={{ transition: "stroke 250ms, stroke-width 250ms" }}
              />
              {/* Start and End points */}
              <circle cx={point.start.x} cy={point.start.y} r="3" fill="#D4AF37" />
              <circle
                cx={point.end.x}
                cy={point.end.y}
                r={isHovered ? 7 : 4.5}
                fill={isHovered ? "#D4AF37" : "#FAFAFA"}
                stroke="#D4AF37"
                strokeWidth="1.5"
                style={{ transition: "all 240ms", cursor: "pointer" }}
                onMouseEnter={() => onHover && onHover(point.code)}
                onMouseLeave={() => onHover && onHover(null)}
              />
              
              {isHovered && (
                <text
                  x={point.end.x + 12}
                  y={point.end.y + 4}
                  fontSize="13"
                  fontFamily="Marcellus, serif"
                  fill="#FAFAFA"
                  filter="url(#glow)"
                >
                  {point.name}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
