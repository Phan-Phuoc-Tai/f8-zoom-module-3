export function formatTime(createAt: string | Date): string | undefined {
  const now = new Date();
  const date = new Date(createAt);

  const ms = now.getTime() - date.getTime();
  const second = Math.floor(ms / 1000);

  if (second < 60) {
    return "Vừa xong";
  }

  const minus = Math.floor(second / 60);
  if (minus < 60) {
    return `${minus} phút trước`;
  }

  const hour = Math.floor(minus / 60);

  if (hour < 24) {
    return `${hour} giờ trước`;
  }

  const day = Math.floor(hour / 24);
  if (day < 30) {
    return `${day} ngày trước`;
  }

  const month = Math.floor(hour / 30);
  if (month < 12) {
    return `${month} tháng trước`;
  }
}
