type PlaceholderMessageProps = {
  title: string;
  message?: string;
};

export function PlaceholderMessage({
  title,
  message = "Kraunama...",
}: PlaceholderMessageProps) {
  return (
    <div className="mx-auto flex max-w-2xl flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="font-display text-2xl font-semibold text-white">{title}</h1>
      <p className="mt-4 text-zinc-400">{message}</p>
    </div>
  );
}
