export const isAppleOS = () =>
  typeof navigator !== "undefined" &&
  (/Mac/.test(navigator.platform) ||
    (/AppleWebKit/.test(navigator.userAgent) &&
      /Mobile\/\w+/.test(navigator.userAgent)));

export function formatKeyboardShortcut(shortcut: string) {
  if (isAppleOS()) {
    return shortcut.replace("Mod", "&#8984;");
  } else {
    return shortcut.replace("Mod", "Ctrl");
  }
}

export const parseStringToObject = (value: string) => {
  try {
    const utf8String = decodeURIComponent(value);
    const decodedString = window.atob(utf8String);
    const newData = JSON.parse(decodedString);
    return { ...newData };
  } catch {}
  return null;
}
