import { ReactNode } from 'react';
import cx from 'classnames';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  children?: ReactNode;
  isAnswered?: boolean;
  isHighLighted?: boolean;
}

export function Question({
  content,
  author,
  isAnswered,
  isHighLighted,
  children,
}: QuestionProps) {
  return (
    <div 
      className={cx(
        'question',
        { answered: isAnswered},
        { highlighted: isHighLighted}
      )}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  );
}