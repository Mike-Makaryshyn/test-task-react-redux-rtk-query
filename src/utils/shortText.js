import { CSSTransition } from "react-transition-group";

const maxLength = 26;

export const renderText = (text) => {
  if (text.length && text.length > maxLength) {
    return `${text.slice(0, maxLength)}...`;
  }

  return `${text}`;
};

export const renderToolkit = (isElHover, text) => {
    return (
      <CSSTransition
        in={isElHover && text.length && text.length > maxLength}
        timeout={100}
        classNames="fade"
        unmountOnExit
      >
        <span className="toolkit">{text}</span>
      </CSSTransition>
    );
};
