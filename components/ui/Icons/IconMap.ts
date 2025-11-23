import CrownIcon from './CrownIcon';
import HashIcon from './Hashicon';

const IconMap = {
  CrownIcon,
  HashIcon,
};

export type IconName = keyof typeof IconMap;
export default IconMap;
