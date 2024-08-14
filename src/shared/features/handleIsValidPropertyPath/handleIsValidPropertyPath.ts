interface IHandleIsValidPropertyPath {
  propertyPath?: string;
  jsonToValidate: string;
}

export const handleIsValidPropertyPath = ({ propertyPath, jsonToValidate }: IHandleIsValidPropertyPath) => {
  if (propertyPath === undefined) return true;

  const json = JSON.parse(jsonToValidate);
  const properties = propertyPath.split('.');
  let current = json;

  for (const prop of properties) {
    if (!(prop in current)) {
      return false;
    }
    current = current[prop];
  }
  return true;
};
