const getRandomColor = (name) => {
  const colors = ["#780C28", "#DD88CF", "#FADA7A", "#09122C", "#B771E5", "#AEEA94", "#16C47F", "#7E5CAD"];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

// Get baseURL from environment variables
const baseURL = import.meta.env.VITE_BASE_URL || "";


const Avatar = ({
  username,
  width = 30,
  height = 30,
  avatar_url,
  className = "",
  showBorder = false,
  rounded = true,
}) => {
  return (
    <div
      className={`flex items-center justify-center font-neue text-white text-opacity-60 font-bold ${rounded ? "rounded-full overflow-hidden" : ""} ${showBorder ? "border border-gray-300" : ""} ${className}`}
      style={{ width, height,minWidth:width, backgroundColor: !avatar_url ? getRandomColor(username) : "transparent" }}
    >
      {avatar_url ? (
        <img
          src={`${baseURL}${avatar_url}`}
          className={`w-full h-full object-cover ${rounded ? "rounded-full" : ""}`}
          alt="Profile"
        />
      ) : (
        username && username[0]?.toUpperCase()
      )}
    </div>
  );
};

export default Avatar;
