import classnames from 'classnames';
import React, { ReactElement } from 'react';

import BallImage from './images/ball.svg';
import s from './Loader.module.css';

interface Props {
  className?: string;
}

const Loader = (props: Props): ReactElement | null => {
  const { className } = props;
  const rootClassNames = classnames(s.root, className);

  return (
    <div className={rootClassNames}>
      <BallImage />
    </div>
  );
};

export default Loader;
