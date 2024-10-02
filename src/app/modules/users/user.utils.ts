import { User } from "./user.model";

// let lastUserId=0;
export const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastUser?.id;
};

export const generateUserId = async () => {
  let currentId = (await findLastUserId()) || String(0).padStart(5, "0");
  let temp:number=parseInt(currentId)
  temp=temp+1;
  return String(temp).padStart(5, "0");
};
