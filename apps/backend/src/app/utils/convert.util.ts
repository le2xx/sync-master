export const convertKeysToCamelCase = <T extends Record<string, any>>(
  obj: T
): T =>
  Object.keys(obj).reduce((acc, key) => {
    const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) =>
      letter.toUpperCase()
    );

    return { ...acc, [camelCaseKey]: obj[key] };
  }, {} as T);
