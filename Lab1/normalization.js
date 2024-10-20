export const mergeMapsOfRecords = (obj1, obj2, comparator, oldData) => {
  if (!obj1 && !!obj2) {
    return obj2;
  }

  if (!obj2 && !!obj1) {
    return obj1;
  }

  const l = obj1 || {};
  const r = obj2 || {};
  const newMap = { ...l };

  let key = undefined;
  const comparatorKeys = Object.keys(comparator || {});

  for (key of Object.keys(r)) {
    if (!l[key]) {
      newMap[key] = r[key];
    } else {
      const lObj = l[key];
      const rObj = r[key];

      const lUpdatedAt = lObj?.updatedAt;
      const rUpdatedAt = rObj?.updatedAt;
      const isPastObj = lUpdatedAt && rUpdatedAt && lUpdatedAt > rUpdatedAt;

      newMap[key] =
        oldData || isPastObj ? { ...rObj, ...lObj } : { ...lObj, ...rObj };

      if (comparator) {
        for (const field of comparatorKeys) {
          if (
            r[key][field] &&
            comparator[field](l[key][field], r[key][field])
          ) {
            newMap[key][field] = l[key][field];
          }
        }
      }
    }
  }

  return newMap;
};

export const isEquals = (l, r) => {
  if (l === r) {
    return true;
  }

  if ((l === null && r !== null) || (l !== null && r === null)) {
    return false;
  }

  const typeL = typeof l;

  if (typeL === "number" || typeL === "string" || typeL === "boolean") {
    return false;
  }

  if (Array.isArray(l)) {
    if (l.length !== r.length) {
      return false;
    }
    if (!l.length) {
      return true;
    }
    for (let i = 0; i < l.length; i++) {
      if (!isEquals(l[i], r[i])) {
        return false;
      }
    }
    return true;
  }

  if (typeL === "object") {
    const lKeys = Object.keys(l);
    const rKeys = Object.keys(r);

    if (lKeys.length !== rKeys.length) {
      return false;
    }

    if (!lKeys.length) {
      return true;
    }

    for (const key of lKeys) {
      if (!isEquals(l[key], r[key])) {
        return false;
      }
    }

    for (const key of rKeys) {
      if (!isEquals(l[key], r[key])) {
        return false;
      }
    }
    return true;
  }
};
