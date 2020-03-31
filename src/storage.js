const save = (key, val) => {
  try {
    localStorage.setItem(key, val);
  } catch (err) {
    console.log(err);
  }
};

const load = key => localStorage.getItem(key);

export { save, load };
