import Image, { type StaticImageData } from 'next/image';

type LandingLastSectionProps = {
  imageSrc: StaticImageData[];
  pointLabel: string;
  title: React.ReactNode;
  description: React.ReactNode;
};

export default function LandingLastSection({
  imageSrc,
  pointLabel,
  title,
  description,
}: LandingLastSectionProps) {
  const [Invite, Settings, Member] = imageSrc;
  return (
    <section
      className={`flex flex-col px-[30px] pt-5 pb-20 md:py-25 items-center lg:justify-between lg:px-60 lg:flex-row`}
    >
      <div>
        <div className="flex w-[320px] gap-3 mb-[50px] md:gap-3.5 flex-col md:w-[535px] lg:w-[554px]">
          <p className="font-bold text-brand-400 md:text-[20px] lg:text-[24px]">{pointLabel}</p>
          <h2 className="text-gray-100 text-[24px] md:text-[32px] font-bold lg:text-[50px]">
            {title}
          </h2>
          <p className="text-gray-400 font-medium lg:text-[18px]">{description}</p>
        </div>
        <div className="flex flex-col lg:flex-row lg:gap-[102px]">
          <div className="flex flex-col gap-3 mb-[50px]">
            <Image
              src={Settings}
              alt="Landing section image"
              className="w-[315px] mb-7 md:mb-10 md:w-[535px] lg:max-w-[400px] lg:h-60"
            />
            <div className="w-[315px]">
              <h3 className="text-gray-100 font-bold lg:text-[18px]">대시보드 설정</h3>
              <p className="text-gray-400 text-[14px] lg:text-[16px]">
                대시보드 사진과 이름을 변경할 수 있습니다.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 mb-[50px]">
            <Image
              src={Invite}
              alt="Landing section image"
              className="w-[315px] mb-7 md:mb-10 md:w-[535px] lg:max-w-[400px] lg:h-60"
            />
            <div className="w-[315px]">
              <h3 className="text-gray-100 font-bold lg:text-[18px]">초대</h3>
              <p className="text-gray-400 text-[14px] lg:text-[16px]">
                새로운 팀원을 초대할 수 있습니다.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 mb-[50px]">
            <Image
              src={Member}
              alt="Landing section image"
              className="w-[315px] mb-7 md:mb-10 md:w-[535px] lg:max-w-[400px] lg:h-60"
            />
            <div className="w-[315px]">
              <h3 className="text-gray-100 font-bold lg:text-[18px]">구성원</h3>
              <p className="text-gray-400 text-[14px]">구성원을 초대하고 내보낼 수 있습니다.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
