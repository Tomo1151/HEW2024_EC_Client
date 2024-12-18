import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
const StarRating = ({ rating }) => {
  return (
    <div>
      <StarRateRoundedIcon className="text-yellow-500" />
      <span className="text-xl inline-block h-full pl-2 align-top">
        {rating}
      </span>
    </div>
  );
};

export default StarRating;
