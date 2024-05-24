"use server";

export const userRegister = async (data: any) => {
    console.log(data);

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/register`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            cache: "no-store",
        }

    );


    const userInfo = await res.json();
    console.log(userInfo);
    return userInfo;
};


