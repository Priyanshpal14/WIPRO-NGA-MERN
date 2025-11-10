export const fakeApiCall = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve("Loaded data from fake API!"), 1500)
  );
