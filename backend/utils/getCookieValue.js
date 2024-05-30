const getCookieValue = (req) => {
  const data = req.cookie.split("=; ")[1].split("=")[1];
  return data;
};

export default getCookieValue;
