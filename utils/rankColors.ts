export const rankColors: { [key: string]: string } = {
  "Ekipa TTT": " text-blue-500",
  "Weteran SG": "text-red-400",
};

export const getRankColor = (rank: string) => {
  return rankColors[rank] ?? "text-gray-200";
};
