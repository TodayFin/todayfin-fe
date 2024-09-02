import ModifyContent from "@/components/community/ModifyContent";

const ModifyPage = ({ params }) => {
  const { postId } = params;

  return <ModifyContent postId={postId} />;
};

export default ModifyPage;
