import Button from '@/components/ui/button/Button';
import SideButton from '@/components/ui/button/SideButton';

export default function ButtonTest() {
  return (
    <>
      <div className=" flex flex-col gap-4 p-8">
        <Button variant="primary" size="lg">
          Primary Large
        </Button>
        <div>
          <Button variant="secondary" size="md">
            md사이즈버튼
          </Button>
        </div>
        <div>
          <Button disabled variant="primary" size="sm">
            sm사이즈버튼
          </Button>
        </div>
        <div>
          <Button variant="profile" size="xs">
            Full Width Ghost
          </Button>
        </div>
        <>
          사이드버튼
          <div>
            <SideButton variant="ghost" size="side" label="lebel" hasCrown={true} hasHash={true}>
              사이드 버튼
            </SideButton>
          </div>
        </>

        <>
          <Button variant="primary" color="rose">
            컬러버튼
          </Button>
          <Button variant="primary" color="orange">
            컬러버튼
          </Button>
          <Button variant="primary" color="yellow">
            컬러버튼
          </Button>
          <Button variant="primary" color="green">
            컬러버튼
          </Button>
          <Button variant="primary" color="cobalt">
            컬러버튼
          </Button>
        </>
      </div>
    </>
  );
}
