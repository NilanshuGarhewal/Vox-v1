//cache.js

export const getCachedData = (key, maxAgeMinutes = 30) => {
  const cached = localStorage.getItem(key);
  if (!cached) return null;

  try {
    const parsed = JSON.parse(cached);
    const age = (Date.now() - parsed.timestamp) / (1000 * 60); // in minutes

    if (age < maxAgeMinutes) return parsed.data;
    else return null;
  } catch {
    return null;
  }
};

export const setCachedData = (key, data) => {
  const cached = {
    timestamp: Date.now(),
    data,
  };
  localStorage.setItem(key, JSON.stringify(cached));
};
