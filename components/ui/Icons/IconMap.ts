import ArrowDown from './ArrowDown';
import CirclePlus from './CirclePlus';
import CrownIcon from './CrownIcon';
import DeleteIcon from './DeleteIcon';
import EditIcon from './EditIcon';
import HashIcon from './HashIcon';
import PlusIcon from './Plus';
import SearchIcon from './SearchIcon';
import SettingIcon from './SettingIcon';
export type IconName =
  | 'ArrowDown'
  | 'CirclePlus'
  | 'CrownIcon'
  | 'DeleteIcon'
  | 'EditIcon'
  | 'HashIcon'
  | 'PlusIcon'
  | 'SearchIcon'
  | 'SettingIcon';

export const IconMap: Record<IconName, React.FC<React.SVGProps<SVGSVGElement>>> = {
  ArrowDown,
  CirclePlus,
  CrownIcon,
  DeleteIcon,
  EditIcon,
  HashIcon,
  PlusIcon,
  SettingIcon,
  SearchIcon,
};
