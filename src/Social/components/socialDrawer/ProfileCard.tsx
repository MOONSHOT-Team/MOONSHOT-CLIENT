interface IProfileCardProps {
  category: string;
  userName: string;
  userImg: string;
  like: number;
  userIntro: string;
}

const ProfileCard = ({ category, userName, userImg, like, userIntro }: IProfileCardProps) => {
  return (
    <li>
      <div>{category}</div>
      <div>
        <img src={userImg} alt={`${userName}프로필사진`} />
        <p>{userName}</p>
        <div>
          <span>하트</span>
          <span>{like}</span>
        </div>
      </div>
      <div>{userIntro}</div>
    </li>
  );
};

export default ProfileCard;
