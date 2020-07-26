import { Resolver, Query, Authorized } from "type-graphql";
import { User } from "../../entity/User";
import { ADMIN } from "../../constants";

@Resolver()
class GetUsersResolver {
  @Authorized(ADMIN)
  @Query(() => [User])
  async getUsers() {
    return User.find();
  }
}

export default GetUsersResolver;
