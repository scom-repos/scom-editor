export const getFileContent = async (url: string) => {
  let result = '';
  if (url) {
    const response = await fetch(url);
    try {
      if (response.ok) {
        result = await response.text();
      }
    } catch (err) { }
  }
  return result;
}
