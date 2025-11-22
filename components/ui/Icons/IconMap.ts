import CrownIcon from './CrownIcon';
import HashIcon from './Hasgicon';

const IconMap = {
  CrownIcon,
  HashIcon,
};

export type IconName = keyof typeof IconMap;
export default IconMap;
