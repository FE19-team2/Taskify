'use client';

import TagInput from './_components/card/card-create-modal/TagInput';
const TAG_MOK = ['디자인', '프론트엔드', '백엔드', '기획', '리서치', '버그', '리팩토링'];

export default function Page() {
  return (
    <div className="w-100 h-100 flex items-center mx-auto">
      {/* <CardModalHeader title="Sample Title" cardId={1} onEdit={() => {}} onClose={() => {}} /> */}
      <TagInput dashboardTags={TAG_MOK} />
    </div>
  );
}
