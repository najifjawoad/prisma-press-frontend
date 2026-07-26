"use server";

type loginState ={
    success: true,
    status: number,
    message : string,
    data : {
        accessToken : string,
        refreshToken : string,
    }

}

export const logInAction = async  (previousState  : loginState, formData: FormData) => {
  console.log(formData);
  console.log("prev state" , previousState);

  const email = formData.get("email");
  const password = formData.get("password");

  const payload = {
    email ,
    password

  }

  const res = await fetch(`${process.env.BACKEND_API_URL}api/auth/login`,{
    method : "POST",
    headers : {
        "content-type" : "application/json"
    },
    body : JSON.stringify(payload)
  })


  const result = await res.json();
  console.log(result);
  return result ;
};
