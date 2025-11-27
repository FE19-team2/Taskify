import React from 'react';
import { IconMap, IconName } from '@/components/ui/Icons/IconMap';

export type { IconName };

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
}

export const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const TargetIcon = IconMap[name];

  if (!TargetIcon) {
    console.warn(`Icon "${name}" not found in IconMap.`);
    return null;
  }

  return <TargetIcon {...props} />;
};
