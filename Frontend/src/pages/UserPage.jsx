import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";

const UserPage = () => {
  return <>
  <UserHeader />
  <UserPost likes={1243} replies={463} postImg="/post1.png" postTitle="Lets talk." author={"zucc"} postId={1} />
  <UserPost likes={53} replies={43} postImg="/post2.png" postTitle="Tutorial." author={"zucc"} postId={2}/>
  <UserPost likes={12321} replies={4463} postImg="/post3.png" postTitle="Elon Musk go brrr." author={"zucc"} postId={3}/>
  <UserPost likes={13} replies={13} postTitle="Lets talk." author={"zucc"} postId={4}/>
  </>
}

export default UserPage;