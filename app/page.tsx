import Header from './_components/Header';
import Footer from './_components/Footer';
import Hero from './_components/Hero';
import LandingSection from './_components/LandingSection';
import Feature01 from '@/public/images/feature-01.svg';
import Feature02 from '@/public/images/feature-02.svg';

export default function Page() {
  const SectionsData = [
    {
      imageSrc: Feature01,
      pointLabel: 'Point 1',
      title: (
        <>
          내가 등록한 사진으로
          <br />
          기억에 남는 할 일 리스트
        </>
      ),
      description: (
        <>
          카드 내 추가한 이미지를 상단 썸네일로 노출하여
          <br />
          작업에 대한 내용을 더 직관적으로 떠올릴 수 있어요
        </>
      ),
    },
    {
      imageSrc: Feature02,
      pointLabel: 'Point 2',
      title: (
        <>
          자세한 정보는 명확하게,
          <br />팀 논의는 빠르게 확인하세요
        </>
      ),
      description: (
        <>
          작업에 필요한 세부 내용을 손쉽게 정리하고,
          <br />
          댓글을 통해 팀원들과 빠르게 소통해보세요
        </>
      ),
      isReverse: true,
      hasGradientBg: true,
    },
  ];

  return (
    <div className="bg-[#0f1112]">
      <div
        className="
  absolute inset-0 
  bg-linear-to-r 
  from-transparent 
  via-[#00ff66]/4
  to-transparent
  pointer-events-none
"
      />
      <Header />
      <Hero />
      {SectionsData.map((section, index) => (
        <LandingSection
          key={index}
          imageSrc={section.imageSrc}
          pointLabel={section.pointLabel}
          title={section.title}
          description={section.description}
          isReverse={section.isReverse}
          hasGradientBg={section.hasGradientBg}
        />
      ))}
      <Footer />
    </div>
  );
}
