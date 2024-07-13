import Comment from "@/components/modules/comment/Comment";
import styles from "./comments.module.css";
import CommentForm from "./CommentForm";

const Comments = ({ comments, productName , productId , userId }) => {
  return (
    <div>
      <p>نظرات ({comments.filter((comment) => comment.isAccept).length}) :</p>
      <hr />

      <main className={styles.comments}>
        <div className={styles.user_comments}>
          <p className={styles.title}>{productName}</p>
          <div>
            {comments.length >=0 &&
              comments
                ?.filter((comment) => comment.isAccept)
                .map((comment) => <Comment key={comment._id} {...comment} />)}

            {comments.filter((comment) => comment.isAccept).length <= 0 && (
              <p className="empty_err">
                کامنتی برای {productName} تاکنون ایجاد نشده است .
              </p>
            )}
          </div>
        </div>
        <div className={styles.form_bg}>
          <CommentForm productId={productId} userId={userId} />
        </div>
      </main>
    </div>
  );
};

export default Comments;
