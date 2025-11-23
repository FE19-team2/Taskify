import CrownIcon from './CrownIcon';
import HashIcon from './HashIcon';

const IconMap = {
  CrownIcon,
  HashIcon,
};

export type IconName = keyof typeof IconMap;
export default IconMap;
