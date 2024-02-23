import Image from "next/image";

interface EmptySearchProps {
  url: string;
  title: string;
  sub: string;
}

export const EmptySearch = ({ sub, title, url }: EmptySearchProps) => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src={url} alt="image" width={250} height={250} />
      <h2 className="text-2xl font-semibold mt-5">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{sub}</p>
    </div>
  );
};
