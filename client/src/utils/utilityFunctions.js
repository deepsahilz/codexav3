export function timeAgo(dateString) {
    const now = new Date();
    const pastDate = new Date(dateString);
    const diffInSeconds = Math.floor((now - pastDate) / 1000);
  
    const minutes = 60;
    const hours = minutes * 60;
    const days = hours * 24;
    const months = days * 30; // Approximate month duration
    const years = days * 365; // Approximate year duration
  
    let timeString;
  
    if (diffInSeconds < minutes) {
      timeString = `${diffInSeconds} sec${diffInSeconds !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < hours) {
      const diffInMinutes = Math.floor(diffInSeconds / minutes);
      timeString = `${diffInMinutes} min${diffInMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < days) {
      const diffInHours = Math.floor(diffInSeconds / hours);
      timeString = `${diffInHours} hr${diffInHours !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < months) {
      const diffInDays = Math.floor(diffInSeconds / days);
      timeString = `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < years) {
      const diffInMonths = Math.floor(diffInSeconds / months);
      timeString = `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`;
    } else {
      const diffInYears = Math.floor(diffInSeconds / years);
      timeString = `${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`;
    }
  
    return timeString;
  }

export  function messageTime(isoString) {
    const date = new Date(isoString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12;
    return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  }

  export const formatDate = (date) => {
    const today = new Date();
    const messageDate = new Date(date);
  
    // Check if the message is from today
    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today';
    }
  
    // Check if the message is from yesterday
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
  
    // If not today or yesterday, return the full date (e.g., 29 April)
    return messageDate.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };
  
  
  