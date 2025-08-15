import React, { useState } from "react";


function CheckAge() {
    const [age, setAge] = useState("");
    const handleAge = (e) => {

        const value = e.target.value.trim();
        setAge(value);

    }

    const isValidAge = age !== "" && !isNaN(age);
    const numbericAge = Number(age);
    return (
        <div>
            <input
                type="text"
                value={age}
                onChange={handleAge}
                placeholder="Nhap tuoi"
                style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
            {isValidAge && (
                <p>{numbericAge >= 18 ? (<span style={{ color: "green" }}>Da du tuoi</span>) :
                    (<span style={{ color: "red" }}>Chua du tuoi</span>)}
                </p>
            )}
        </div>
    );

}



export default CheckAge;    