import React, { useState } from "react";

function ToggleText(props) {
    const [isVisible, setIsVisible] = useState(false);

    const toggleText = () => {
        setIsVisible((pre) => !pre);
    };
    const text = props.text || "Default text content";
    return (
        <div>
            <button onClick={toggleText}>
                {isVisible ? "Hide Text" : "Show Text"}
            </button>
            {isVisible && (
                <p>
                   {text}
                </p>
            )}
        </div>
    )
}

export default ToggleText;