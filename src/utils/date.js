export const formatReleaseDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  return new Intl.DateTimeFormat("es-Do", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};
