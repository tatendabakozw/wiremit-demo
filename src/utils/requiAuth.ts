// src/utils/requireAuthGSSP.ts
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getTokenFromGssp, verifyToken } from "@/lib/auth";
import { ROUTES } from "@/config/routes";

export function requireAuthGSSP(gssp: GetServerSideProps<any>): GetServerSideProps<any> {
  return async (ctx: GetServerSidePropsContext) => {
    const token = getTokenFromGssp(ctx);
    const auth = token ? verifyToken(token) : null;

    if (!auth) {
      // redirect to login; preserve where the user was going
      const next = encodeURIComponent(ctx.resolvedUrl || "/");
      return {
        redirect: {
          destination: `${ROUTES.AUTH.LOGIN}?next=${next}`,
          permanent: false,
        },
      };
    }

    // Attach auth to ctx if you like (via cast)
    (ctx as any).auth = auth;

    return gssp(ctx);
  };
}
