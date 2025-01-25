import StarRoundedIcon from "@mui/icons-material/StarRounded";
const StarRating = ({ rating }) => {
  return (
    <>
      <StarRoundedIcon
        className="text-yellow-500"
        sx={{ fontSize: "1.25em", mb: 0.4 }}
      />
      <span className="text-[1em] inline-block h-full pl-2 align-top">
        {rating}
      </span>
    </>
  );
};

export default StarRating;
