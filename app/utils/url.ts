import qs from 'qs';

export const getElementInParam = (element: string) => {
  const queryParsed = qs.parse(window.location.search, { ignoreQueryPrefix: true }) || {};
  return queryParsed[element];
};
