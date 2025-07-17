export const useConfig = () => {
    const token = localStorage.getItem("token");
    const configWithJWT =  {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }

      return {configWithJWT}
}