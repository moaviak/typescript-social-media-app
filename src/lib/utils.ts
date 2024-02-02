import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", options);

  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${formattedDate} at ${time}`;
}

export function formatRelativeDate(dateString: string = ""): string {
  // Convert the input string to a Date object
  const currentDate: Date = new Date();
  const inputDate: Date = new Date(dateString);

  // Calculate the time difference in milliseconds
  const timeDifference: number = currentDate.getTime() - inputDate.getTime();

  // Define time units in milliseconds
  const minute: number = 60 * 1000;
  const hour: number = 60 * minute;
  const day: number = 24 * hour;
  const month: number = 30 * day;
  const year: number = 365 * day;

  // Calculate the relative time
  if (timeDifference < minute) {
    return "Just now";
  } else if (timeDifference < hour) {
    const minutesAgo: number = Math.floor(timeDifference / minute);
    return `${minutesAgo} ${minutesAgo === 1 ? "minute" : "minutes"} ago`;
  } else if (timeDifference < day) {
    const hoursAgo: number = Math.floor(timeDifference / hour);
    return `${hoursAgo} ${hoursAgo === 1 ? "hour" : "hours"} ago`;
  } else if (timeDifference < month) {
    const daysAgo: number = Math.floor(timeDifference / day);
    return `${daysAgo} ${daysAgo === 1 ? "day" : "days"} ago`;
  } else if (timeDifference < year) {
    const monthsAgo: number = Math.floor(timeDifference / month);
    return `${monthsAgo} ${monthsAgo === 1 ? "month" : "months"} ago`;
  } else {
    const yearsAgo: number = Math.floor(timeDifference / year);
    return `${yearsAgo} ${yearsAgo === 1 ? "year" : "years"} ago`;
  }
}

export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};
