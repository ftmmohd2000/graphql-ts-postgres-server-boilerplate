import { Resolver, Mutation, Arg } from "type-graphql";
import { User } from "../../entity/User";
import { RegisterInputType } from "./register/RegisterInputType";
import { USER, ADMIN } from "../../constants";

@Resolver(User)
class RegisterResolver {
  @Mutation(() => Boolean, { nullable: true })
  async register(
    @Arg("data")
    { firstName, lastName, email, password, age, role }: RegisterInputType
  ): Promise<boolean | null> {
    let userRole: number;

    switch (role) {
      case "USER":
        userRole = USER;
        break;
      case "ADMIN":
        userRole = ADMIN;
        break;
      default:
        userRole = USER;
    }

    await User.create({
      firstName,
      lastName,
      email,
      password,
      age,
      role: userRole
    }).save();

    return true;
  }
}

export default RegisterResolver;
