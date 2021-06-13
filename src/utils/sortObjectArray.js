export const sortObjectArray = (array, key, direction) => {
  if (!key) return array;
  return array.slice().sort((objectA, objectB) => {
    const elementA = objectA[key]?.toString().toLowerCase();
    const elementB = objectB[key]?.toString().toLowerCase();
    let comparisonResult = 0;
    if (!elementA || !elementB) return comparisonResult;
    if (elementA > elementB) comparisonResult = 1;
    if (elementA < elementB) comparisonResult = -1;
    return direction === 'asc' ? comparisonResult : -comparisonResult;
  });
};
