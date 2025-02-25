import http from "@/utils/http";
import { AdminLoginValues } from "../components/login-form/login-form";
import { AdminLoginResponse } from "@/interfaces/admin/login/admin-login-interfaces";

/**
 * UseAdminLogin: Provides authentication services for admin login.
 * @returns {Object} An object containing the admin login function.
 */
export default function UseAdminLogin() {
  /**
   * Admin login function.
   * @param {AdminLoginValues} values - Admin login credentials.
   * @returns {Promise<AdminLoginResponse>} A promise that resolves to the login response.
   * @throws Will throw an error if the HTTP request fails.
   */
  const adminLogin = async (values: AdminLoginValues): Promise<AdminLoginResponse> => {
    try {
      const props: JSON = <JSON>(<unknown>{ values});
      const { body } = await http().post("/api/auth/admin-login", props);
      return {
        status: body.status,
        message: body.message,
        token: body.token,
        errors:body.errors || [],
      };
    } catch (error) {
      console.error("Admin login failed:", error);
      throw error;
    }
  };

  return {
    adminLogin,
  };
}
