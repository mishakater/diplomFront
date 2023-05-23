export const renderProp = (prop, props) => {
  if (!prop) {
    return null;
  }

  return typeof prop === "function" ? prop(props) : prop;
};

export const mergeMean = (xs) => {
  return xs.reduce((avg, x, i) => {
    return Object.keys(x).reduce((acc, key) => {
      if (typeof x[key] === "object") {
        return {
          ...acc,
          [key]: mergeMean(xs.map((i) => i[key])),
        };
      }

      return {
        ...acc,
        [key]: avg[key] + (x[key] - avg[key]) / (i + 1),
      };
    }, {});
  }, xs[0]);
};

export const mergeWeightedMean = (xs, weights) => {
  return xs.reduce((avg, x, i) => {
    return Object.keys(x).reduce((acc, key) => {
      if (typeof x[key] === "object") {
        return {
          ...acc,
          [key]: mergeWeightedMean(
            xs.map((i) => i[key]),
            weights
          ),
        };
      }

      if (key in weights) {
        return {
          ...acc,
          [key]: avg[key] + (x[key] * weights[key] - avg[key]) / (i + 1),
        };
      }

      return acc;
    }, {});
  }, xs[0]);
};
