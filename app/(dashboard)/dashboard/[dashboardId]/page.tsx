'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { ColumnList } from './_components/column/ColumnList';
import { Column } from './_components/column/Column';
import { ColumnCardList } from './_components/card/columncard/ColumnCardList';
import { CardModal } from './_components/card/cardmodal/CardModal';
import CardCreateModal from './_components/card/card-create-modal/CardCreateModal';
import { ColumnCard } from './_components/card/columncard/ColumnCard';
import { CardDto } from '@/lib/api/validations/cards';
import { getColumns, createColumn } from '@/lib/api/services/columns.service';
import { getDashboardMembers } from '@/lib/api/services/members.service';
import { getCards, updateCard } from '@/lib/api/services/cards.service';
import { ConfirmWithInputModal } from '@/components/ui/modal/ConfirmWithInputModal';
import { DialogModal } from '@/components/ui/modal/Dialog';
import { HttpError } from '@/lib/api/request-core';

interface ColumnWithCards {
  id: number;
  title: string;
  cards: CardDto[];
  cursorId: number | null;
  hasMore: boolean;
}

export default function Page() {
  const { dashboardId: param } = useParams();
  const dashboardId = Number(param);

  const [columns, setColumns] = useState<ColumnWithCards[]>([]);
  const [members, setMembers] = useState<
    { id: number; nickname: string; profileImageUrl: string | null }[]
  >([]);
  const [selectedCard, setSelectedCard] = useState<CardDto | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<CardDto | null>(null);
  const [selectedColumnId, setSelectedColumnId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const [isEditColumnModalOpen, setIsEditColumnModalOpen] = useState(false);
  const [editingColumn, setEditingColumn] = useState<{ id: number; title: string } | null>(null);
  const [columnTitle, setColumnTitle] = useState('');
  const [isCreatingColumn, setIsCreatingColumn] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [activeCard, setActiveCard] = useState<CardDto | null>(null);
  const [dashboardTags, setDashboardTags] = useState<string[]>([]);

  // 초기 데이터 로드
  useEffect(() => {
    loadDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboardId]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && !isCreateModalOpen && !isEditModalOpen && !selectedCard) {
        loadDashboardData();
      }
    };

    const handleFocus = () => {
      // 모달이 열려있지 않을 때만 새로고침
      if (!isCreateModalOpen && !isEditModalOpen && !selectedCard) {
        loadDashboardData();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboardId, isCreateModalOpen, isEditModalOpen, selectedCard]);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const [columnsData, membersData] = await Promise.all([
        getColumns({ dashboardId }),
        getDashboardMembers({ dashboardId, page: 1, size: 100 }),
      ]);

      const columnsWithCards = await Promise.all(
        (columnsData.data || []).map(async (col) => {
          const cardsData = await getCards({ columnId: col.id, size: 10, cursorId: undefined });
          return {
            id: col.id,
            title: col.title,
            cards: cardsData.cards,
            cursorId: cardsData.cursorId,
            hasMore: cardsData.cursorId !== null,
          };
        }),
      );

      setColumns(columnsWithCards);
      setMembers(
        membersData.members.map((member) => ({
          id: member.id,
          nickname: member.nickname,
          profileImageUrl: member.profileImageUrl,
        })),
      );

      // 모든 카드의 태그 수집
      const allTags = new Set<string>();
      columnsWithCards.forEach((col) => {
        col.cards.forEach((card) => {
          card.tags.forEach((tag) => allTags.add(tag));
        });
      });
      setDashboardTags(Array.from(allTags));
    } catch (error) {
      console.error('대시보드 데이터 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreCards = async (columnId: number) => {
    const column = columns.find((col) => col.id === columnId);
    if (!column || !column.hasMore) return;

    try {
      const cardsData = await getCards({
        columnId,
        size: 10,
        cursorId: column.cursorId ?? undefined,
      });

      setColumns((prev) =>
        prev.map((col) =>
          col.id === columnId
            ? {
                ...col,
                cards: [...col.cards, ...cardsData.cards],
                cursorId: cardsData.cursorId,
                hasMore: cardsData.cursorId !== null,
              }
            : col,
        ),
      );
    } catch (error) {
      console.error('카드 추가 로드 실패:', error);
    }
  };

  const handleEditColumn = async () => {
    if (!columnTitle.trim() || !editingColumn) {
      setDialogMessage('칼럼 이름을 입력해주세요.');
      setDialogOpen(true);
      return;
    }

    try {
      setIsCreatingColumn(true);
      const { updateColumn } = await import('@/lib/api/services/columns.service');
      await updateColumn(editingColumn.id, { title: columnTitle });

      setColumns((prev) =>
        prev.map((col) => (col.id === editingColumn.id ? { ...col, title: columnTitle } : col)),
      );

      setDialogMessage('칼럼이 수정되었습니다.');
      setDialogOpen(true);
      setColumnTitle('');
      setEditingColumn(null);
      setIsEditColumnModalOpen(false);
    } catch (err) {
      if (err instanceof HttpError) {
        setDialogMessage(err.message || '칼럼 수정에 실패했습니다. 다시 시도해주세요.');
      } else {
        setDialogMessage('칼럼 수정에 실패했습니다. 다시 시도해주세요.');
      }
      setDialogOpen(true);
    } finally {
      setIsCreatingColumn(false);
    }
  };

  const handleDeleteColumn = async (columnId: number) => {
    const column = columns.find((col) => col.id === columnId);
    if (!column) return;

    // 카드가 있는 경우 경고
    if (column.cards.length > 0) {
      setDialogMessage('카드가 있는 칼럼은 삭제할 수 없습니다. 먼저 모든 카드를 삭제해주세요.');
      setDialogOpen(true);
      return;
    }

    const confirmDelete = window.confirm(`"${column.title}" 칼럼을 삭제하시겠습니까?`);
    if (!confirmDelete) return;

    try {
      const { deleteColumn } = await import('@/lib/api/services/columns.service');
      await deleteColumn(columnId);

      setColumns((prev) => prev.filter((col) => col.id !== columnId));

      setDialogMessage('칼럼이 삭제되었습니다.');
      setDialogOpen(true);
    } catch (err) {
      if (err instanceof HttpError) {
        setDialogMessage(err.message || '칼럼 삭제에 실패했습니다. 다시 시도해주세요.');
      } else {
        setDialogMessage('칼럼 삭제에 실패했습니다. 다시 시도해주세요.');
      }
      setDialogOpen(true);
    }
  };

  const handleCreateColumn = async () => {
    if (!columnTitle.trim()) {
      setDialogMessage('칼럼 이름을 입력해주세요.');
      setDialogOpen(true);
      return;
    }

    try {
      setIsCreatingColumn(true);
      const newColumn = await createColumn({ title: columnTitle, dashboardId });

      setColumns((prev) => [
        ...prev,
        {
          id: newColumn.id,
          title: newColumn.title,
          cards: [],
          cursorId: null,
          hasMore: false,
        },
      ]);

      setDialogMessage('새로운 칼럼이 생성되었습니다.');
      setDialogOpen(true);
      setColumnTitle('');
      setIsColumnModalOpen(false);
    } catch (err) {
      if (err instanceof HttpError) {
        console.error('컬럼 생성 실패:', err.message);
        setDialogMessage(err.message || '칼럼 생성에 실패했습니다. 다시 시도해주세요.');
      } else {
        console.error('컬럼 생성 오류:', err);
        setDialogMessage('칼럼 생성에 실패했습니다. 다시 시도해주세요.');
      }
      setDialogOpen(true);
    } finally {
      setIsCreatingColumn(false);
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const cardId = Number(active.id);

    // 모든 컬럼에서 드래그 중인 카드 찾기
    for (const column of columns) {
      const card = column.cards.find((card) => card.id === cardId);
      if (card) {
        setActiveCard(card);
        break;
      }
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveCard(null);

    if (!over) return;

    const cardId = Number(active.id);
    const overId = String(over.id);

    // over ID 파싱: "dropzone-{columnId}-{position}", "column-{columnId}" 또는 "card-{cardId}"
    let targetColumnId: number;
    let targetPosition: number | null = null;

    if (overId.startsWith('dropzone-')) {
      // 드롭존에 드롭한 경우
      const parts = overId.replace('dropzone-', '').split('-');
      targetColumnId = Number(parts[0]);
      targetPosition = Number(parts[1]);
    } else if (overId.startsWith('column-')) {
      // 컬럼 전체에 드롭한 경우 (맨 위)
      targetColumnId = Number(overId.replace('column-', ''));
      targetPosition = 0;
    } else if (overId.startsWith('card-')) {
      // 카드 위에 직접 드롭한 경우 (호환성 유지)
      const targetCardId = Number(overId.replace('card-', ''));
      const targetColumn = columns.find((col) =>
        col.cards.some((card) => card.id === targetCardId),
      );
      if (!targetColumn) return;
      targetColumnId = targetColumn.id;
      targetPosition = targetColumn.cards.findIndex((card) => card.id === targetCardId);
    } else {
      return;
    }

    // 드래그한 카드 찾기
    let sourceColumnId: number | null = null;
    let draggedCard: CardDto | null = null;

    for (const column of columns) {
      const card = column.cards.find((card) => card.id === cardId);
      if (card) {
        sourceColumnId = column.id;
        draggedCard = card;
        break;
      }
    }

    if (!draggedCard || sourceColumnId === null) return;

    // 같은 컬럼 내에서 같은 위치로 이동하는 경우 무시
    if (sourceColumnId === targetColumnId && targetPosition !== null) {
      const currentPosition = columns
        .find((col) => col.id === sourceColumnId)
        ?.cards.findIndex((card) => card.id === cardId);
      if (currentPosition === targetPosition || currentPosition === targetPosition - 1) {
        return;
      }
    }

    try {
      // UI 즉시 업데이트 (낙관적 업데이트)
      setColumns((prev) => {
        const newColumns = prev.map((col) => ({
          ...col,
          cards: [...col.cards],
        }));

        // 소스 컬럼에서 카드 제거
        const sourceCol = newColumns.find((col) => col.id === sourceColumnId);
        if (sourceCol) {
          sourceCol.cards = sourceCol.cards.filter((card) => card.id !== cardId);
        }

        // 타겟 컬럼에 카드 추가
        const targetCol = newColumns.find((col) => col.id === targetColumnId);
        if (targetCol && targetPosition !== null) {
          // 같은 컬럼 내 이동 시 인덱스 조정
          let insertPosition = targetPosition;
          if (sourceColumnId === targetColumnId && draggedCard) {
            const originalIndex = prev
              .find((col) => col.id === sourceColumnId)
              ?.cards.findIndex((card) => card.id === cardId);
            if (originalIndex !== undefined && originalIndex < targetPosition) {
              insertPosition = targetPosition - 1;
            }
          }
          targetCol.cards.splice(insertPosition, 0, { ...draggedCard!, columnId: targetColumnId });
        }

        return newColumns;
      });

      // 서버에 업데이트 (컬럼 이동만)
      await updateCard(cardId, {
        columnId: targetColumnId,
        assigneeUserId: draggedCard.assignee?.id,
        title: draggedCard.title,
        description: draggedCard.description,
        dueDate: draggedCard.dueDate || undefined,
        tags: draggedCard.tags || [],
        imageUrl: draggedCard.imageUrl || undefined,
      });
    } catch (error) {
      console.error('카드 이동 실패:', error);
      // 실패 시 데이터 다시 로드
      await loadDashboardData();
      setDialogMessage('카드 이동에 실패했습니다. 다시 시도해주세요.');
      setDialogOpen(true);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-[#D6D5D9]">로딩 중...</div>
      </div>
    );
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="w-full h-full flex flex-col">
        <ColumnList
          dashboardTitle="포트폴리오"
          columnCount={columns.length}
          onCreateColumn={() => setIsColumnModalOpen(true)}
          onManageDashboard={() => {
            console.log('onManageDashboard 호출됨, dashboardId:', dashboardId);
            const url = `/dashboard/${dashboardId}/edit`;
            console.log('이동할 URL:', url);
            window.location.href = url;
          }}
          onInviteMembers={() => console.log('멤버 초대')}
        >
          {columns.map((column) => (
            <Column
              key={column.id}
              columnId={column.id}
              title={column.title}
              cardCount={column.cards.length}
              onAddCard={() => {
                setSelectedColumnId(column.id);
                setIsCreateModalOpen(true);
              }}
              onEditColumn={() => {
                setEditingColumn({ id: column.id, title: column.title });
                setColumnTitle(column.title);
                setIsEditColumnModalOpen(true);
              }}
              onDeleteColumn={() => handleDeleteColumn(column.id)}
            >
              <ColumnCardList
                columnId={column.id}
                cards={column.cards}
                hasMore={column.hasMore}
                loadMore={() => loadMoreCards(column.id)}
                onCardClick={(card) => setSelectedCard(card)}
              />
            </Column>
          ))}
        </ColumnList>

        {selectedCard && (
          <CardModal
            data={selectedCard}
            open={!!selectedCard}
            dashboardTitle="포트폴리오"
            columnTitle={columns.find((col) => col.id === selectedCard.columnId)?.title || ''}
            onOpenChange={(open) => !open && setSelectedCard(null)}
            onEdit={(card) => {
              setEditingCard(card);
              setIsEditModalOpen(true);
              setSelectedCard(null);
            }}
            onDeleteSuccess={async () => {
              setSelectedCard(null);
              await loadDashboardData();
            }}
          />
        )}

        {selectedColumnId && (
          <CardCreateModal
            open={isCreateModalOpen}
            onOpenChange={setIsCreateModalOpen}
            columnId={selectedColumnId}
            dashboardId={dashboardId}
            columns={columns.map((col) => ({ id: col.id, title: col.title }))}
            members={members}
            dashboardTags={dashboardTags}
            onCardCreated={async () => {
              // 해당 컬럼의 카드만 새로고침
              if (!selectedColumnId) {
                console.error('selectedColumnId가 없습니다');
                return;
              }

              try {
                const cardsData = await getCards({
                  columnId: selectedColumnId,
                  size: 10,
                  cursorId: undefined,
                });

                setColumns((prev) =>
                  prev.map((col) =>
                    col.id === selectedColumnId
                      ? {
                          ...col,
                          cards: cardsData.cards,
                          cursorId: cardsData.cursorId,
                          hasMore: cardsData.cursorId !== null,
                        }
                      : col,
                  ),
                );
                console.log('컬럼 업데이트 완료');
              } catch (error) {
                console.error('카드 목록 새로고침 실패:', error);
              }
            }}
          />
        )}

        {editingCard && (
          <CardCreateModal
            open={isEditModalOpen}
            onOpenChange={setIsEditModalOpen}
            columnId={editingCard.columnId}
            dashboardId={dashboardId}
            columns={columns.map((col) => ({ id: col.id, title: col.title }))}
            members={members}
            dashboardTags={dashboardTags}
            editMode={true}
            cardData={editingCard}
            onCardCreated={async () => {
              // 전체 데이터 새로고침
              await loadDashboardData();
              setEditingCard(null);
            }}
          />
        )}

        <ConfirmWithInputModal
          open={isColumnModalOpen}
          onOpenChange={setIsColumnModalOpen}
          title="새 칼럼 생성"
          placeholder="칼럼 이름을 입력해주세요"
          confirmText="생성"
          cancelText="취소"
          onChange={setColumnTitle}
          onConfirm={handleCreateColumn}
          isLoading={isCreatingColumn}
        />

        <ConfirmWithInputModal
          open={isEditColumnModalOpen}
          onOpenChange={(open) => {
            setIsEditColumnModalOpen(open);
            if (!open) {
              setEditingColumn(null);
              setColumnTitle('');
            }
          }}
          title="칼럼 수정"
          placeholder="칼럼 이름을 입력해주세요"
          confirmText="수정"
          cancelText="취소"
          value={columnTitle}
          onChange={setColumnTitle}
          onConfirm={handleEditColumn}
          isLoading={isCreatingColumn}
        />

        <DialogModal open={dialogOpen} onOpenChange={setDialogOpen} description={dialogMessage} />
      </div>

      <DragOverlay>
        {activeCard ? (
          <div className="opacity-50">
            <ColumnCard card={activeCard} onClick={() => {}} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
