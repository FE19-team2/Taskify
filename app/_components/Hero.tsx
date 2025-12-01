import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative flex justify-center lg:justify-start lg:px-60">
      <div className="relative shrink-0 z-10 flex flex-col px-[30px] py-[60px] md:p-0 md:pt-[60px] lg:min-w-[502px]">
        <div className="mb-5 text-center md:text-start md:mt-[57px] md:mb-[30px] lg:mb-[50px]">
          <h2 className="mb-0 text-[24px] md:text-[34px] lg:text-[60px] font-bold text-gray-100 md:w-[293px] lg:whitespace-nowrap">
            더 새로워진 일정 관리
          </h2>
          <h1 className="mt-0 text-brand-400 text-[30px] md:text-[50px] lg:text-[84px] font-normal font-[NivaSmallCaps-Bold]">
            TASKIFY
          </h1>
        </div>
        <div className="flex justify-center lg:justify-start md:flex-col lg:flex-row gap-3 md:gap-5">
          <Link
            href="/signup"
            className="flex justify-center shrink-0 items-center px-[41px] py-[15px] md:px-24 md:py-4 lg:px-[54px] lg:py-5 md:text-[18px] bg-gray-700 rounded-full text-gray-100 text-[16px]"
          >
            회원가입하기
          </Link>
          <Link
            href="/login"
            className="flex justify-center shrink-0 items-center px-[41px] py-[15px] md:px-24 md:text-[18px] md:py-4 lg:px-[54px] bg-brand-500 rounded-full text-gray-100 text-[16px]"
          >
            로그인하기
          </Link>
        </div>
      </div>
      <div className="z-10 hidden md:block h-[484px] lg:h-[682px] md:min-w-[383px] lg:min-w-[1212px] overflow-hidden rounded-3xl mt-[60px] translate-x-[100px]">
        <picture>
          <source srcSet="/images/landing-intro.svg" media="(min-width: 1024px)" />
          <source srcSet="/images/landing-intro-md.png" media="(min-width: 768px)" />
          <img
            src="/images/landing-intro-md.png"
            alt="Taskify preview"
            className="md:max-w-[383px] lg:max-w-[1212px] block rounded-3xl border border-gray-900"
          />
        </picture>
      </div>
    </section>
  );
}
