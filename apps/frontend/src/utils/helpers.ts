// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sanitizeSearchParams = (query: Record<string, any>) => {
  for (const param in query) {
    console.log(param, query[param]);
    if (
      query[param] === undefined ||
      query[param] === null ||
      query[param] === ''
    ) {
      delete query[param];
    }
  }
  return query;
};
