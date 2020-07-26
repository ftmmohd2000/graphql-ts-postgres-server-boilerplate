import { AuthChecker, ResolverData } from "type-graphql";
import { MyContext } from "../types/Context";

export const customAuth: AuthChecker<MyContext, number> = async (
  { context: { user } }: ResolverData<MyContext>,
  roles
) => {
  if (!user) return false;

  return user.role >= roles[0];
};
