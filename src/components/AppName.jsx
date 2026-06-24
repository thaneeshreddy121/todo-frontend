import styles from "./AppName.module.css";

function AppName() {
  return (
    <>
      <h1 className={styles.todoHeading}>
        ✨ Smart Todo Manager
      </h1>

      <p
        style={{
          color: "white",
          fontSize: "18px",
          marginBottom: "30px",
        }}
      >
        Organize your life beautifully
      </p>
    </>
  );
}

export default AppName;