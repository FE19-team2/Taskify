import Hero from './Hero';
import LandingSection from './LandingSection';
import LandingLastSection from './LandingLastSection';
import Feature01 from '@/public/images/feature-01.svg';
import Feature02 from '@/public/images/feature-02.svg';
import Feature03Invite from '@/public/images/feature-03-invite.svg';
import Feature03Settings from '@/public/images/feature-03-settings.svg';
import Feature03Member from '@/public/images/feature-03-member.svg';

export default function Main() {
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

  const LastSectionData = {
    imageSrc: [Feature03Invite, Feature03Settings, Feature03Member],
    pointLabel: 'Point 3',
    title: (
      <>
        나에게 맞게, 더 효율적으로
        <br />
        생산성을 높이는 다양한 설정
      </>
    ),
    description: (
      <>
        작업 방식에 맞게 색상, 팀원, 구성원 등을 쉽게 관리할 수 있어요
        <br />
        환경을 조율하면 일은 더 가볍고 빠르게 흘러갑니다.
      </>
    ),
  };
  return (
    <main>
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
      <LandingLastSection
        imageSrc={LastSectionData.imageSrc}
        pointLabel={LastSectionData.pointLabel}
        title={LastSectionData.title}
        description={LastSectionData.description}
      />
    </main>
  );
}
