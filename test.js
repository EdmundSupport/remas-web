function mergeObjects(target, ...sources) {
    if (!sources.length) return target;
  
    const source = sources.shift();
  
    if (isObject(target) && isObject(source)) {
      for (const key in source) {
        if (isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          mergeObjects(target[key], source[key]);
        } else if (isArray(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: [] });
          target[key] = target[key].concat(source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }
  
    return mergeObjects(target, ...sources);
  }
  
  function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
  }
  
  function isArray(item) {
    return Array.isArray(item);
  }
  
  // Ejemplo de uso
  const obj1 = {
    a: 1,
    b: {
      c: [1, 2]
    }
  };
  
  const obj2 = {
    b: {
      c: [3, 4],
      d: 5
    },
    e: 6
  };
  
  const mergedObj = mergeObjects({}, 'a', 'b');
  
  console.log(mergedObj);
  