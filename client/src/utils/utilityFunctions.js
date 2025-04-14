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
  