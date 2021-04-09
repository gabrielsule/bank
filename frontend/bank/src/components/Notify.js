import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

export const Notify = (data) => {
    toast(data, {
        icon: (
            <FontAwesomeIcon
                icon={faExclamationTriangle}
                color={'tomato'}
                size={"2x"}
            />
        ),
        style: {
            borderRadius: "10px",
            border: `1px solid tomato`,
            padding: "16px",
        },
    });

};

