export function getClerkErrorMessage(error: unknown, fallback: string): string {
  if (!error) return fallback;
  const err = error as { errors?: { longMessage?: string; message?: string }[]; message?: string };
  return err.errors?.[0]?.longMessage ?? err.errors?.[0]?.message ?? err.message ?? fallback;
}