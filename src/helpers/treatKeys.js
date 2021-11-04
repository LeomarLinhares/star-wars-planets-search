const treatKeys = (planetsArray) => (
  Object.keys(planetsArray[0]).map((key) => {
    const withoutUnderline = key.replace('_', ' ');
    return withoutUnderline.charAt(0).toUpperCase() + withoutUnderline.slice(1);
  })
);

export default treatKeys;
