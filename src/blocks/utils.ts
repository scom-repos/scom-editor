export const convertedSlashItem = (item: any) => {
  const { name } = item;
  return {
    ...item,
    id: name.replace(/\s/g, '_').toLowerCase()
  };
}
