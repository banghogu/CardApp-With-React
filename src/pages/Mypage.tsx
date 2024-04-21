import { useCallback } from "react";
import { signOut } from "firebase/auth";

import Flex from "@shared/Flex";
import Text from "@shared/Text";
import Button from "@shared/Button";
import Spacing from "@shared/Spacing";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { RootState } from "@/store";
import { auth } from "@/remote/firebase";
import MyImage from "@/components/my/MyImage";
import { clearUser } from "@/store/user.slice";

function MyPage() {
  const { user } = useAppSelector((state: RootState) => state.userSlice);
  const dispatch = useAppDispatch();

  const handleLogout = useCallback(() => {
    signOut(auth);
    dispatch(clearUser());
  }, []);

  return (
    <Flex direction="column" align="center">
      <Spacing size={40} />
      <MyImage size={80} mode="upload" />

      <Spacing size={20} />
      <Text bold={true}>{user?.displayName}</Text>

      <Spacing size={20} />

      <Button onClick={handleLogout}>로그아웃</Button>
    </Flex>
  );
}

export default MyPage;
