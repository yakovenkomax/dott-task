import classnames from 'classnames';
import React, { ReactElement, ReactNode } from 'react';

import s from './Text.module.css';

interface Props {
  children?: ReactNode;
  size?: 'body' | 'subheading' | 'heading';
  className?: string;
}

const Text = (props: Props): ReactElement | null => {
  const { className, size = 'body', children } = props;
  const rootClassNames = classnames(s.root, className, { [s[size]]: size });

  return <div className={rootClassNames}>{children}</div>;
};

export default Text;
