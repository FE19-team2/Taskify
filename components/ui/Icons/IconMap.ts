import ArrowDown from './ArrowDown';
import CrownIcon from '../../../public/icons/CrownIcon';
import DeleteIcon from './DeleteIcon';
import EditIcon from './EditIcon';
import HashIcon from '../../../public/icons/HashIcon';
import SettingIcon from './SettingIcon';

export type IconName =
  | 'ArrowDown'
  | 'CrownIcon'
  | 'DeleteIcon'
  | 'EditIcon'
  | 'HashIcon'
  | 'SettingIcon';

export const IconMap: Record<IconName, React.FC<React.SVGProps<SVGSVGElement>>> = {
  ArrowDown,
  CrownIcon,
  DeleteIcon,
  EditIcon,
  HashIcon,
  SettingIcon,
};
