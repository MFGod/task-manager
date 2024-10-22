export const getCurrentDate = (): string => {
  const date = new Date();
  return date.toISOString().split('T')[0];
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date string provided');
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

export const calculateDaysLeft = (complitedAt: string) => {
  const today = new Date();
  const deadline = new Date(complitedAt);

  if (isNaN(deadline.getTime())) {
    throw new Error('Указана неверная дата завершения!');
  }

  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const startOfDeadline = new Date(
    deadline.getFullYear(),
    deadline.getMonth(),
    deadline.getDate()
  );

  const difference = startOfDeadline.getTime() - startOfToday.getTime();

  const daysLeft = Math.ceil(difference / (1000 * 3600 * 24));

  return daysLeft;
};
