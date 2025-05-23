import React from "react";

interface SectionDividerProps {
  type?: "wave" | "tilt" | "curve";
  fillClassName?: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({
  type = "tilt",
  fillClassName = "fill-white dark:fill-gray-900", // Peut être ajusté avec les variables CSS de Tailwind si nécessaire
}) => {
  if (type === "wave") {
    return (
      <div className="w-full h-24 relative overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-full"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className={fillClassName}
          ></path>
        </svg>
      </div>
    );
  }

  if (type === "curve") {
    return (
      <div className="w-full h-24 relative overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-full"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            className={fillClassName}
          ></path>
        </svg>
      </div>
    );
  }

  // Default: tilt
  return (
    <div className="w-full h-24 relative overflow-hidden">
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="absolute bottom-0 w-full h-full"
      >
        <path
          d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
          className={fillClassName}
        ></path>
      </svg>
    </div>
  );
};

export default SectionDivider; 