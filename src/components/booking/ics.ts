export function generateICS(opts: {
  summary: string
  date: string
  time: string
  durationMin: number
  location: string
  description: string
}): void {
  const { summary, date, time, durationMin, location, description } = opts

  const [year, month, day] = date.split('-').map(Number)
  const [hour, minute] = time.split(':').map(Number)

  const start = new Date(year, month - 1, day, hour, minute)
  const end = new Date(start.getTime() + durationMin * 60_000)

  const fmt = (d: Date) =>
    d.getFullYear().toString() +
    String(d.getMonth() + 1).padStart(2, '0') +
    String(d.getDate()).padStart(2, '0') +
    'T' +
    String(d.getHours()).padStart(2, '0') +
    String(d.getMinutes()).padStart(2, '0') +
    '00'

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Belle Epoque//Reservation//FR',
    'BEGIN:VEVENT',
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${summary}`,
    `LOCATION:${location}`,
    `DESCRIPTION:${description}`,
    'STATUS:CONFIRMED',
    `UID:${Date.now()}@belle-epoque-demo`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'rendez-vous.ics'
  a.click()
  URL.revokeObjectURL(url)
}
