import Image, { type StaticImageData } from 'next/image';

type LandingSectionProps = {
  imageSrc: StaticImageData;
  pointLabel: string;
  title: React.ReactNode;
  description: React.ReactNode;
  isReverse?: boolean;
  hasGradientBg?: boolean;
};

export default function LandingSection({
  imageSrc,
  pointLabel,
  title,
  description,
  isReverse = false,
  hasGradientBg = false,
}: LandingSectionProps) {
  return (
    <section
      className={`flex flex-col w-full px-[30px] pt-5 pb-20 md:py-25 items-center lg:justify-center lg:gap-[80px] lg:flex-row ${isReverse ? 'lg:flex-row-reverse' : ''}`}
    >
      <Image
        src={imageSrc}
        alt="Landing section image"
        className={`w-[315px] mb-[30px] md:mb-10 md:w-[535px] lg:w-[709px] lg:h-[625px] ${hasGradientBg ? 'mask-bottom-20' : ''}`}
      />

      <div className="flex gap-3 md:gap-3.5 w-[320px] flex-col md:w-[535px] lg:w-[554px] shrink-0">
        <p className="font-bold text-brand-400 md:text-[20px] lg:text-[24px]">{pointLabel}</p>
        <h2 className="text-gray-100 text-[24px] md:text-[32px] font-bold lg:text-[50px]">
          {title}
        </h2>
        <p className="text-gray-400 font-medium lg:text-[18px]">{description}</p>
      </div>
    </section>
  );
}
