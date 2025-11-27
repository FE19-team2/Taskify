import ArrowDown from './ArrowDown';
import CrownIcon from './CrownIcon';
import DeleteIcon from './DeleteIcon';
import EditIcon from './EditIcon';
import HashIcon from './HashIcon';
import SettingIcon from './SettingIcon';
import CirclePlus from './CirclePlus';

export type IconName =
  | 'ArrowDown'
  | 'CrownIcon'
  | 'DeleteIcon'
  | 'EditIcon'
  | 'HashIcon'
  | 'SettingIcon'
  | 'CirclePlus';

export const IconMap: Record<IconName, React.FC<React.SVGProps<SVGSVGElement>>> = {
  ArrowDown,
  CrownIcon,
  DeleteIcon,
  EditIcon,
  HashIcon,
  SettingIcon,
  CirclePlus,
};
