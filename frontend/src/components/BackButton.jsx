const BackButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        background: "none",
        border: "none",
        fontSize: "16px",
        cursor: "pointer",
        color: "#341f04",
        marginBottom: "15px",
        display: "flex",
        alignItems: "center",
        gap: "5px",
        fontFamily: "Georgia, serif",
      }}
    >
      ← Back to Menu
    </button>
  );
};

export default BackButton;