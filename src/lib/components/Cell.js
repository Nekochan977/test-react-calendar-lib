import React from "react";

const Cell = ({children, className, onClick}) => {
    return (
        <div className={className} onClick={onClick}>{children}</div>
    )
}

export default Cell