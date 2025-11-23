import CrownIcon from '@/components/ui/Icons/CrownIcon';
import HashIcon from '@/components/ui/Icons/Hashicon';

const IconMap = {
  CrownIcon,
  HashIcon,
};

export type IconName = keyof typeof IconMap;
export default IconMap;
