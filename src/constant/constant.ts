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
    return "https://localhost:3000/ngoEvent/post";
  }

  public static postImage() :string{
    return "https://localhost:3000/image";
  }

  public static getEvents() : string {
    return "https://localhost:3000/ngoEvent/post";
  }

  public static getEventDetails() : string {
    return "https://localhost:3000/ngoEvent/";
  }

  public  static getNgoProfile() : string{
    return "https://localhost:3000/ngoProfile/";
  }

  public  static getNearestEvents() : string{
    return "https://localhost:3000/ngoEvent/nearestLocation/";
  }

  public  static followedNgoList() : string{
    return "https://localhost:3000/userInfo/followersList";
  }


}
