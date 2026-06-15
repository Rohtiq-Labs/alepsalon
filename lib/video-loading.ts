export type VideoPreload = "none" | "metadata" | "auto";

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
};

const SLOW_CONNECTIONS = new Set(["slow-2g", "2g", "3g"]);

export const getVideoPreload = (priority: "high" | "low"): VideoPreload => {
  if (typeof window === "undefined") {
    return priority === "high" ? "metadata" : "none";
  }

  const connection = (navigator as Navigator & { connection?: NetworkInformation })
    .connection;

  if (connection?.saveData) {
    return "none";
  }

  if (
    connection?.effectiveType &&
    SLOW_CONNECTIONS.has(connection.effectiveType)
  ) {
    return priority === "high" ? "metadata" : "none";
  }

  return priority === "high" ? "auto" : "none";
};
