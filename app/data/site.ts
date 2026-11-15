/** Kontakt i autor projektu. Nazwę serwisu zmieniasz tylko tutaj. */
export const SITE = {
  name: 'ease.lang',
  email: 'pasha.rv1234@gmail.com',
  authorUrl: 'https://pavlobabik.com',
  authorLabel: 'pavlobabik.com'
}

/** Link mailto: z tematem (i opcjonalną treścią). */
export function mailto(subject: string, body?: string): string {
  const q = [`subject=${encodeURIComponent(subject)}`]
  if (body) q.push(`body=${encodeURIComponent(body)}`)
  return `mailto:${SITE.email}?${q.join('&')}`
}
