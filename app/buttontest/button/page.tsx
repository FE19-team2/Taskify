import Button from '@/components/ui/Button';
import SideButton from '@/components/ui/SideButton';

export default function ButtonTest() {
  return (
    <>
      <div className="bg-profile-yellow flex flex-col gap-4 p-8">
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
        <div>
          <SideButton variant="ghost" size="side">
            사이드 버튼
          </SideButton>
        </div>
      </div>
    </>
  );
}
