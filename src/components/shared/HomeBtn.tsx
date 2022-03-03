import Button from './Button';
import { Icon } from '@iconify/react';

export default function HomeBtn({ href = '/' }) {
  return (
    <a href={href}>
      <Button size="sm" classnames="btn-outline">
        <span className="mr-2">
          <Icon icon="akar-icons:arrow-back-thick" />
        </span>
        Back
      </Button>
    </a>
  );
}
