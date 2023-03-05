const maxLength = 26;

export const renderText = (text) => {
  if (text.length && text.length > maxLength) {
    return `${text.slice(0, maxLength)}...`;
  }

  return `${text}`;
};

export const renderToolkit = (isElHover, text) => {
  if (isElHover &&text.length && text.length > maxLength) {
    return <span className="toolkit">{text}</span>;
  }
};
