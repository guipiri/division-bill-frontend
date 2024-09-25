export function handleDate(createdAt: string | undefined) {
  if (!createdAt) return;
  return new Date(createdAt)
    .toLocaleDateString('pt-BR', {
      month: 'short',
      day: 'numeric',
    })
    .replace('de', '');
}
