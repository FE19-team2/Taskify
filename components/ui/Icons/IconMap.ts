import ArrowDown from './ArrowDown';
import CirclePlus from './CirclePlus';
import CrownIcon from './CrownIcon';
import DeleteIcon from './DeleteIcon';
import EditIcon from './EditIcon';
import HashIcon from './HashIcon';
import PlusIcon from './Plus';
import SearchIcon from './SearchIcon';
import SettingIcon from './SettingIcon';
import ArrowLeft from './ArrowLeft';
import ArrowRight from './ArrowRight';
import Toggle from './Toggle';
import UserPlus from './UserPlus';
import HomeIcon from './HomeIcon';
import LogOut from './LogOut';

export type IconName =
  | 'ArrowDown'
  | 'CirclePlus'
  | 'CrownIcon'
  | 'DeleteIcon'
  | 'EditIcon'
  | 'HashIcon'
  | 'PlusIcon'
  | 'SearchIcon'
  | 'SettingIcon'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'Toggle'
  | 'UserPlus'
  | 'HomeIcon'
  | 'LogOut';

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
  ArrowLeft,
  ArrowRight,
  Toggle,
  UserPlus,
  HomeIcon,
  LogOut,
};
