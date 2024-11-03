import toast from "react-hot-toast";
type ToasterProps = {
  message: string;

  // show duration in ms
  duration?: number;
};

export const showErrorToast = ({ message, duration = 5000 }: ToasterProps) => {
  toast.error(message, {
    style: {
      backgroundColor: "#fef2f2",
      padding: "1rem",
      border: "1px solid #fecaca",
      fontSize: "1rem",
      color: "#991b1b",
    },
    duration,
  });
};

export const showSuccessToast = ({
  message,
  duration = 2000,
}: ToasterProps) => {
  toast.success(message, {
    style: {
      padding: "1rem",
      border: "1px solid green",
      fontSize: "1rem",
      color: "#171717",
    },
    duration,
  });
};
