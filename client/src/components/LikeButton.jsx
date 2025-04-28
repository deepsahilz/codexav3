import { useState, useEffect } from "react";

const LikeButton = ({ likeCount,handleLike,handleUnlike,isLiked, outlineColor, fillColor }) => {

  const [isButtonLiked, setIsButtonLiked] = useState(isLiked);
// send isLiked value,LikeCount value,
  const toggleLike = async () => {
    if (likeLoading) return;
    setLikeLoading(true);
    try {
        if (isLiked) {
            await handleUnlike();
            setLikeCount(likeCount - 1);
        } else {
            await handleLike();
            setLikeCount(likeCount + 1);
        }
        setIsLiked(!isLiked);
    } catch (err) {
        console.error(err);
    } finally {
        setLikeLoading(false);
    }
};

  useEffect(() => {
    setIsButtonLiked(isLiked);
  }, [isLiked]);

  return (
    <div className="flex items-end gap-[5px]">
      <button
        onClick={() => {
          setIsButtonLiked(!isButtonLiked);
          onClick(); 
        }}>
        {isButtonLiked ? (
          <svg
            className="w-[18px] h-[18px]"
            width="800px"
            height="800px"
            viewBox="0 -0.5 21 21"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g
                id="Dribbble-Light-Preview"
                transform="translate(-219.000000, -760.000000)"
                fill={fillColor || "#EC2439"}
              >
                <g id="icons" transform="translate(56.000000, 160.000000)">
                  <path
                    d="M163,610.021159 L163,618.021159 C163,619.126159 163.93975,620.000159 165.1,620.000159 L167.199999,620.000159 L167.199999,608.000159 L165.1,608.000159 C163.93975,608.000159 163,608.916159 163,610.021159 M183.925446,611.355159 L182.100546,617.890159 C181.800246,619.131159 180.639996,620.000159 179.302297,620.000159 L169.299999,620.000159 L169.299999,608.021159 L171.104948,601.826159 C171.318098,600.509159 172.754498,599.625159 174.209798,600.157159 C175.080247,600.476159 175.599997,601.339159 175.599997,602.228159 L175.599997,607.021159 C175.599997,607.573159 176.070397,608.000159 176.649997,608.000159 L181.127196,608.000159 C182.974146,608.000159 184.340196,609.642159 183.925446,611.355159"
                    id="like-[#1386]"
                  ></path>
                </g>
              </g>
            </g>
          </svg>
        ) : (
          <svg
            className="w-[18px] h-[18px]"
            width="800px"
            height="800px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.444 1.35396C11.6474 0.955692 10.6814 1.33507 10.3687 2.16892L7.807 9.00001L4 9.00001C2.34315 9.00001 1 10.3432 1 12V20C1 21.6569 2.34315 23 4 23H18.3737C19.7948 23 21.0208 22.003 21.3107 20.6119L22.9773 12.6119C23.3654 10.7489 21.9433 9.00001 20.0404 9.00001H14.8874L15.6259 6.7846C16.2554 4.89615 15.4005 2.8322 13.62 1.94198L12.444 1.35396ZM9.67966 9.70225L12.0463 3.39119L12.7256 3.73083C13.6158 4.17595 14.0433 5.20792 13.7285 6.15215L12.9901 8.36755C12.5584 9.66261 13.5223 11 14.8874 11H20.0404C20.6747 11 21.1487 11.583 21.0194 12.204L20.8535 13H17C16.4477 13 16 13.4477 16 14C16 14.5523 16.4477 15 17 15H20.4369L20.0202 17H17C16.4477 17 16 17.4477 16 18C16 18.5523 16.4477 19 17 19H19.6035L19.3527 20.204C19.2561 20.6677 18.8474 21 18.3737 21H8V10.9907C8.75416 10.9179 9.40973 10.4221 9.67966 9.70225ZM6 11H4C3.44772 11 3 11.4477 3 12V20C3 20.5523 3.44772 21 4 21H6V11Z"
              fill={outlineColor || "#FFF"}
            />
          </svg>
        )}
      </button>

      <div className="text-[12px] -mb-[2px]">{likeCount}</div>
    </div>
  );
};

export default LikeButton;
