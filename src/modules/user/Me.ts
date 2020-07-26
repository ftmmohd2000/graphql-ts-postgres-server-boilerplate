import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { MyContext } from "../../types/Context";
import { USER } from "../../constants";

@Resolver()
class MeResolver {
  @Authorized(USER)
  @Query(() => User, { nullable: true })
  async me(@Ctx() { user }: MyContext): Promise<User | undefined> {
    return user;
  }
}

export default MeResolver;
