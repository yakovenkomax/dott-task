import classnames from 'classnames';
import React, { ReactElement } from 'react';

import s from './ErrrorMessage.module.css';
import BowlImage from './images/bowl.svg';
import BugImage from './images/bug.svg';

interface Props {
  className?: string;
  message: string;
  type: 'notFound' | 'error';
}

const ErrorMessage = (props: Props): ReactElement | null => {
  const { className, message, type } = props;
  const rootClassNames = classnames(s.root, className);

  return (
    <div className={rootClassNames}>
      <div className={s.icon}>
        {type === 'notFound' ? <BowlImage /> : <BugImage />}
      </div>
      <p className={s.text}>{message}</p>
    </div>
  );
};

export default ErrorMessage;
