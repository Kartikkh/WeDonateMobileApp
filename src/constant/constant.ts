export class Constants {

  public static userSignUp(): string {
    return "https://localhost:3000/userAuth/signup";
  };

  public static userLogin() : string {
    return "https://localhost:3000/userAuth/login";
  }

  public static ngoSignup() : string {
    return "https://localhost:3000/ngoAuth/signup";
  }

  public static ngoLogin() : string {
    return "https://localhost:3000/ngoAuth/login";
  }

  public static ngoResendEmail(): string {
    return "https://localhost:3000/ngoAuth/resend_email";
  }

  public static userResendEmail(): string {
    return "https://localhost:3000/userAuth/resend_email";
  }


  public static postEvents():string{
    return "https://localhost:3000/ngoEvent/post"
}

}
