interface FieldErrorProps {
  message: string | null;
}

export function FieldError({ message }: FieldErrorProps) {
  if (!message) return null;

  return <p className="absolute top-full left-1 text-xs text-destructive">{message}</p>;
}