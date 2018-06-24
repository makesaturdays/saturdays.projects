export const date = (value, lang='en', time=true) =>
  new Date(value)
    .toLocaleDateString(
      lang === 'fr' ? 'fr-CA' : 'en-us',
      Object.assign(
        {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        },
        time
          ? {
              hour: '2-digit',
              minute: '2-digit'
            }
          : {}
      )
    )
    .replace(/,/g, '')