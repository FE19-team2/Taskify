import React from 'react';
import Image from 'next/image';
import IntroImage from '@/public/images/landing-intro.svg';
import Feature01 from '@/public/images/feature-01.svg';
import Feature02 from '@/public/images/feature-02.svg';
import Feature03Settings from '@/public/images/feature-03-settings.svg';
import Feature03Invite from '@/public/images/feature-03-invite.svg';
import Feataure03Member from '@/public/images/feature-03-member.svg';

export default function Intro() {
  return (
    <div>
      <section className="flex items-center justify-between h-[1000px] mx-[240px] gap-[100px]">
        <div className="flex gap-4 flex-col">
          <h1 className="text-[60px] font-bold text-[#F8F7FA] tracking-[-0.6px] whitespace-nowrap">
            더 새로워진
            <br />
            일정 관리
          </h1>
          <h1 className="text-[84px] text-brand-400">Taskify</h1>
        </div>
        <Image src={IntroImage} alt="소개 이미지" width={1078} />
      </section>
      <section className="flex items-center justify-between gap-[127px] h-[800px] ml-[278px]">
        <Image src={Feature01} alt="특징 1 이미지" width={736} />
        <div>
          <p className="text-[24px] text-brand-400">Point 1</p>
          <h2 className="text-[50px]">
            내가 등록한 사진으로
            <br />
            기억에 남는 할 일 리스트
          </h2>
          <p className="text-[18px]">
            카드 내 추가한 이미지를 상단 썸네일로 노출하여
            <br />
            작업에 대한 내용을 더 직관적으로 떠올릴 수 있어요
          </p>
        </div>
      </section>
      <section className="flex items-center justify-between gap-8 h-[800px] mx-[240px]">
        <div>
          <p className="text-[24px] text-brand-400">Point 2</p>
          <h2 className="text-[50px]">
            자세한 정보는 명확하게,
            <br />팀 논의는 빠르게 확인하세요
          </h2>
          <p className="text-[18px]">
            작업에 필요한 세부 내용을 손쉽게 정리하고,
            <br />
            댓글을 통해 팀원들과 빠르게 소통해보세요
          </p>
        </div>
        <Image src={Feature02} alt="특징 2 이미지" width={709} />
      </section>
      <section className="h-[800px] mx-[236px]">
        <div>
          <p className="text-[24px] text-brand-400">Point 3</p>
          <h2 className="text-[50px]">
            나에게 맞게, 더 효율적으로
            <br />
            생산성을 높이는 다양한 설정
          </h2>
          <p className="text-[18px]">
            작업 방식에 맞게 색상, 팀원, 구성원 등을 쉽게 관리할 수 있어요
            <br />
            환경을 조율하면 일은 더 가볍고 빠르게 흘러갑니다.
          </p>
        </div>
        <div className="flex justify-evenly my-[30px]">
          <div>
            <Image
              src={Feature03Settings}
              alt="특징 3 이미지 - 설정"
              width={462}
              className="mb-[30px]"
            />
            <h3>대시보드 설정</h3>
            <p>대시보드 사진과 이름을 변경할 수 있습니다.</p>
          </div>
          <div>
            <Image
              src={Feature03Invite}
              alt="특징 3 이미지 - 초대"
              width={462}
              className="mb-[30px]"
            />
            <h3>초대</h3>
            <p>새로운 팀원을 초대할 수 있습니다.</p>
          </div>
          <div>
            <Image
              src={Feataure03Member}
              alt="특징 3 이미지 - 구성원"
              width={462}
              className="mb-[30px]"
            />
            <h3>구성원</h3>
            <p>구성원을 초대하고 내보낼 수 있습니다.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
