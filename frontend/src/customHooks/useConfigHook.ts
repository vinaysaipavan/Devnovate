export const useConfig = () => {
    const token = localStorage.getItem("token");
    const configWithJWT =  {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      return {configWithJWT}
}