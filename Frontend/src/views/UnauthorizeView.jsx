import tailwindStyles from "../utils/tailwindStyles";

export const UnauthorizeView = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <img
        style={{ width: "400px", backgroundSize: "cover" }}
        src="https://img.freepik.com/free-vector/401-error-unauthorized-concept-illustration_114360-1922.jpg"
        alt="unauthorized"
      />

      <h1 className={`${tailwindStyles.heading}`}>
        Un-Authorize Access To This Route
      </h1>
      <p className={`${tailwindStyles.paragraph}`}>
        Please Get Back To Previous Page And Go Accordingly ......{" "}
      </p>
    </div>
  );
};
