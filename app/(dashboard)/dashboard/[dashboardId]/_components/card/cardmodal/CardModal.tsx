'use client';

import { ModalRoot } from '@/components/ui/modal/ModalRoot';
import { CardDto } from '@/lib/api/validations/cards';
import { CardModalInfo } from './CardModalInfo';
import { CardModalTags } from './CardModalTags';
import { CardModalContent } from './CardModalContent';
import { CardModalComment } from './comment/CardModalComment';
import { CardModalAction } from './CardModalActions';
import { Divider } from '@/components/ui/Divider';

type CardModalProps = {
  data: CardDto;
  open: boolean;
  dashboardTitle: string;
  columnTitle: string;
  onOpenChange: (open: boolean) => void;
  onEdit?: (card: CardDto) => void;
  onDeleteSuccess?: () => void;
};

export function CardModal({
  data,
  open,
  dashboardTitle,
  columnTitle,
  onOpenChange,
  onEdit,
  onDeleteSuccess,
}: CardModalProps) {
  const handleEdit = () => {
    onEdit?.(data);
  };

  const handleDeleteSuccess = () => {
    onOpenChange(false);
    onDeleteSuccess?.();
  };

  return (
    <ModalRoot open={open} onOpenChange={onOpenChange} closeOnEsc closeOnOutside size="xl">
      <div className="flex flex-col lg:flex-row lg:h-[880px]">
        <div className="flex-1 flex flex-col px-6 py-5 gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-[20px] md:text-[24px] text-white font-semibold">{data.title}</h1>
            <CardModalAction
              cardId={data.id}
              onClose={() => onOpenChange(false)}
              onEdit={handleEdit}
              onDeleteSuccess={handleDeleteSuccess}
              className="lg:hidden"
            />
          </div>
          <CardModalTags tags={data.tags} />
          <Divider className="mb-5 mt-3" />
          <CardModalContent description={data.description} imageUrl={data.imageUrl} />
          <div className="mb-14 lg:hidden">
            <CardModalInfo
              dashboardTitle={dashboardTitle}
              columnTitle={columnTitle}
              assignee={data.assignee}
              dueDate={data.dueDate}
            />
          </div>
          <Divider className="hidden lg:block my-[30px]" />
          <CardModalComment cardId={data.id} />
        </div>

        <aside className="hidden lg:flex w-[260px] flex-col bg-[#2F2F33] border-l border-neutral-800 gap-3">
          <div className="flex justify-end px-6 pt-5">
            <CardModalAction
              cardId={data.id}
              onClose={() => onOpenChange(false)}
              onEdit={handleEdit}
              onDeleteSuccess={handleDeleteSuccess}
            />
          </div>
          <div className="px-6 pb-5">
            <CardModalInfo
              dashboardTitle={dashboardTitle}
              columnTitle={columnTitle}
              assignee={data.assignee}
              dueDate={data.dueDate}
            />
          </div>
        </aside>
      </div>
    </ModalRoot>
  );
}
