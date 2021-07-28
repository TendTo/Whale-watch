import React, { ReactElement, SyntheticEvent, useLayoutEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './Toast.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export interface ToastOptions {
  time?: number;
  className?: string;
  clickable?: boolean;
  contentClassName?: string;
  onClick?: (e: SyntheticEvent<HTMLDivElement>) => void | Promise<void>;
}

export interface ConfigArgs extends Pick<ToastOptions, 'time' | 'className'> {
  position?: 'left' | 'center' | 'right';
}

export interface ToastProps extends Pick<ToastOptions, 'className' | 'clickable' | 'onClick' | 'contentClassName'> {
  message: string;
}

let toastComponentList: any[] = [];
const init = () => {
  const toastContainer = document.getElementById('toast_container');
  if (!toastContainer) {
    console.error("No toast_container element")
  }
  if (!toastComponentList || !Array.isArray(toastComponentList)) {
    toastComponentList = [];
  }
};

const defaultOptions: Required<ConfigArgs> = {
  time: 3000,
  className: '',
  position: 'center',
};

export const toastConfig = (options: ConfigArgs) => {
  if (options.time) defaultOptions.time = options.time;
  if (options.className) defaultOptions.className = options.className;
  if (options.position) defaultOptions.position = options.position;
};

const renderDOM = () => {
  const container = document.getElementById('toast_container');
  const position = defaultOptions.position || 'center';

  ReactDOM.render(
    <div className={`toast-list ${position}`}>
      <TransitionGroup classnames="list">
        {toastComponentList.map(t => (
          <CSSTransition key={t.id} timeout={300} classNames="toast">
            {t.component}
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>,
    container,
  );
};

const Toast = ({
  message,
  className,
  contentClassName,
  clickable,
  onClick,
}: ToastProps): ReactElement => {
  const messageDOM: any = useRef();

  useLayoutEffect(() => {
    if (messageDOM.current && messageDOM.current.clientHeight) {
      const height = messageDOM.current.clientHeight;
      messageDOM.current.style.height = '0px';
      setTimeout(() => {
        if (messageDOM && messageDOM.current)
          messageDOM.current.style.height = `${height}px`;
      }, 0);
    }
  });

  const contentClassNames = [
    'toast-content',
    clickable ? 'clickable' : '',
    contentClassName
  ].filter(Boolean).join(' ');

  const clickableProps = {
    onClick,
    tabIndex: 0,
    role: 'button',
  };

  return (
    <div ref={messageDOM} className={`toast-message ${className}`}>
      <div
        className={contentClassNames}
        {...clickable && clickableProps}
      >
        {message}
      </div>
    </div>
  );
};

function toast(message: string, time?: number): void;
function toast(message: string, options?: ToastOptions): void;
function toast(message: string, timeOrOptions?: number | ToastOptions): void {
  const {
    time = defaultOptions.time,
    clickable = false,
    className = defaultOptions.className,
    contentClassName = "",
    onClick = undefined,
  } = typeof timeOrOptions === 'number' ? { time: timeOrOptions } : (timeOrOptions || {});

  init();
  renderDOM();

  const id = Date.now();
  toastComponentList.push({
    id,
    component: (
      <Toast
        message={message}
        className={className}
        clickable={clickable}
        onClick={onClick}
        contentClassName={contentClassName}
      />
    ),
  });

  renderDOM();
  setTimeout(() => {
    const index = toastComponentList.findIndex(t => t.id === id);
    toastComponentList.splice(index, 1);
    renderDOM();
  }, time);
}

export function requestErrorToast(e: Error) {
  console.error(e);
  let contentClassName = "text-danger";
  let errorMessage = "An error has occurred.";
  switch (e.message.slice(0, 3)) {
    case "304":
      errorMessage = "Nothing has changed."
      contentClassName = "text-warning"
      break;
    case "403":
      errorMessage = "Forbidden operation."
      break;
    case "404":
      errorMessage = "Resource not found."
      break;
    case "409":
      errorMessage = "A conflict has emerged."
      break;
  }
  toast(`${errorMessage}\nCheck the logs to know more`, { contentClassName: contentClassName });
}

export default toast;