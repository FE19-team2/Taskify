import Image from 'next/image';
import Feature01 from '@/public/images/feature-01.svg';
import Feature02 from '@/public/images/feature-02.svg';
import Feature03Settings from '@/public/images/feature-03-settings.svg';
import Feature03Invite from '@/public/images/feature-03-invite.svg';
import Feature03Member from '@/public/images/feature-03-member.svg';

export default function Main() {
  return (
    <div>
      <section className="h-[800px] flex">
        <div className="w-[1365px] h-[613px] flex items-center justify-between ml-[278px] gap-[127px]">
          <Image src={Feature01} alt="특징 1 이미지" width={736} height={0} className="h-auto" />
          <div className="w-[502px] h-[251px] flex flex-col gap-y-[14px]">
            <p className="text-[24px] font-bold text-brand-400">Point 1</p>
            <h2 className="text-[50px] text-gray-100 font-bold leading-[70px]">
              내가 등록한 사진으로
              <br />
              기억에 남는 할 일 리스트
            </h2>
            <p className="text-[18px] text-gray-400 font-medium leading-7">
              카드 내 추가한 이미지를 상단 썸네일로 노출하여
              <br />
              작업에 대한 내용을 더 직관적으로 떠올릴 수 있어요
            </p>
          </div>
        </div>
      </section>
      <section className="flex items-center justify-between gap-8 h-[800px] mx-[240px]">
        <div className="w-[554px] h-[251px] flex flex-col gap-y-[14px]">
          <p className="text-[24px] font-bold text-brand-400">Point 2</p>
          <h2 className="text-[50px] text-gray-100 font-bold leading-[70px]">
            자세한 정보는 명확하게,
            <br />팀 논의는 빠르게 확인하세요
          </h2>
          <p className="text-[18px] text-gray-400 font-medium leading-7">
            작업에 필요한 세부 내용을 손쉽게 정리하고,
            <br />
            댓글을 통해 팀원들과 빠르게 소통해보세요
          </p>
        </div>
        <Image src={Feature02} alt="특징 2 이미지" width={709} height={0} className="h-auto" />
      </section>
      <section className="h-[800px] mx-[236px] flex items-center">
        <div className="w-[1434px] h-[610px] flex flex-col gap-y-[30px]">
          <div className="w-[554px] h-[251px] flex flex-col gap-y-[14px]">
            <p className="text-[24px] font-bold text-brand-400">Point 3</p>
            <h2 className="text-[50px] text-gray-100 font-bold leading-[70px]">
              나에게 맞게, 더 효율적으로
              <br />
              생산성을 높이는 다양한 설정
            </h2>
            <p className="text-[18px] text-gray-400 font-medium leading-7">
              작업 방식에 맞게 색상, 팀원, 구성원 등을 쉽게 관리할 수 있어요
              <br />
              환경을 조율하면 일은 더 가볍고 빠르게 흘러갑니다.
            </p>
          </div>
          <div className="flex justify-evenly">
            <div className="flex flex-col gap-y-[28px]">
              <div className="relative w-[462px] h-[251px] flex items-end justify-center overflow-hidden bg-black-400 rounded-[30px]">
                <Image
                  src={Feature03Settings}
                  alt="특징 3 이미지 - 대시보드 설정"
                  width={368}
                  height={0}
                  className="h-auto"
                />
              </div>
              <div className="w-[462px] h-[50px] flex items-end">
                <div className="mx-[30px]">
                  <h3 className="text-gray-300 text-lg font-bold">대시보드 설정</h3>
                  <p className="text-gray-400 text-base font-medium">
                    대시보드 사진과 이름을 변경할 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-[28px]">
              <div className="relative w-[462px] h-[251px] flex items-end justify-center overflow-hidden bg-black-400 rounded-[30px]">
                <Image
                  src={Feature03Invite}
                  alt="특징 3 이미지 - 초대"
                  width={400}
                  height={0}
                  className="h-auto"
                />
              </div>
              <div className="w-[462px] h-[50px] flex items-end">
                <div className="mx-[30px]">
                  <h3 className="text-gray-300 text-lg font-bold">초대</h3>
                  <p className="text-gray-400 text-base font-medium">
                    새로운 팀원을 초대할 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-[28px]">
              <div className="relative w-[462px] h-[251px] flex items-end justify-center overflow-hidden bg-black-400 rounded-[30px]">
                <Image
                  src={Feataure03Member}
                  alt="특징 3 이미지 - 구성원"
                  width={400}
                  height={0}
                  className="h-auto"
                />
              </div>
              <div className="w-[462px] h-[50px] flex items-end">
                <div className="mx-[30px]">
                  <h3 className="text-gray-300 text-lg font-bold">구성원</h3>
                  <p className="text-gray-400 text-base font-medium">
                    구성원을 초대하고 내보낼 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
