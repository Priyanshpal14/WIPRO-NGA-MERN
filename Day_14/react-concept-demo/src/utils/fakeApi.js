export const fakeApi = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve("Loaded data"), 1500);
  });
