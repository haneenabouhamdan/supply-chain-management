export function compareObjects(
  oldObj: any,
  newObj: any,
  parentKey = '',
): string[] {
  const messages: string[] = [];

  if (!oldObj || !newObj) return messages;

  for (const key in newObj) {
    if (
      newObj.hasOwnProperty(key) &&
      newObj[key] &&
      !key.endsWith('At') &&
      !key.endsWith('By')
    ) {
      const newKeyPath = parentKey ? `${parentKey}.${key}` : key;
      const oldValue = oldObj[key];
      const newValue = newObj[key];

      if (Array.isArray(oldValue) && Array.isArray(newValue)) {
        if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
          messages.push(`${newKeyPath} were adjusted`);
        }
      } else if (typeof oldValue === 'object' && typeof newValue === 'object') {
        if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
          messages.push(`${newKeyPath} was updated`);
        }
      } else if (oldValue !== newValue) {
        const propertyName = newKeyPath.replace(/([A-Z])/g, ' $1');
        messages.push(`${propertyName} changed to "${newValue}"`);
      }
    }
  }

  return messages;
}
