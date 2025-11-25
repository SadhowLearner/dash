// place files you want to import through the `$lib` alias in this folder.
export function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export const isFullURL = (value: string) =>
  /^https?:\/\//i.test(value);

export const isDomain = (value: string) =>
  /^[a-z0-9.-]+\.[a-z]{2,}$/i.test(value); // example.com, youtube.co.id
