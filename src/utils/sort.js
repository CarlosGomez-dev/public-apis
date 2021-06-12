export const sort = (array, key, direction = 'asc') => {
  if (!key) return array;
  return array.slice().sort((objectA, objectB) => {
    const elementA = objectA[key].toString().toLowerCase();
    const elementB = objectB[key].toString().toLowerCase();
    let compare = 0;
    if (elementA > elementB) compare = 1;
    if (elementA < elementB) compare = -1;
    return direction === 'asc' ? compare : compare * -1;
  });
};
