import Image from 'next/image';

type CardModalContentProps = {
  description: string;
  imageUrl: string | null;
};

export function CardModalContent({ description, imageUrl }: CardModalContentProps) {
  return (
    <div className="w-full">
      <p className="whitespace-pre-wrap wrap-break-word mb-5">{description}</p>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Card Image"
          width={360}
          height={220}
          sizes="
    (max-width: 768px) 315px,
    360px
  "
          className="max-w-full h-auto rounded-[14px]"
        />
      )}
    </div>
  );
}
