export const blogImage = [
  "https://www.innoscripta.com/images/articles/growth-opportunities-act-en.png",
  "https://www.innoscripta.com/images/articles/expansion-france-en.png",
  "https://www.innoscripta.com/images/articles/tax-grant-application-rejection-en.png",
  "https://www.innoscripta.com/images/articles/tax-grant-audit-risk-en.png",
];

export const getRandomImage = () => {
  const num = Math.floor(Math.random() * 4);
  return blogImage[num];
};
