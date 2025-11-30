import { IconMap, IconName } from '@/components/ui/Icons/IconMap';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
}

export const Icon = ({ name, ...props }: IconProps) => {
  const TargetIcon = IconMap[name];

  if (!TargetIcon) {
    console.warn(`Icon "${name}" not found in IconMap.`);
    return null;
  }

  return <TargetIcon {...props} />;
};

export type { IconName } from '@/components/ui/Icons/IconMap';
