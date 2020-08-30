import classnames from 'classnames';
import React, { ReactElement, ReactNode } from 'react';

import s from './Panel.module.css';

interface Props {
  children?: ReactNode | null;
  className?: string;
}

const Panel = (props: Props): ReactElement | null => {
  const { className, children } = props;
  const rootClassNames = classnames(s.root, className);

  return <div className={rootClassNames}>{children}</div>;
};

export default Panel;
