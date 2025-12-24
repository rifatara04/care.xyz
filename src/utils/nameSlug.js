import slugify from "slugify";

export const nameSlug = (name = "") => {
  return slugify(name, {
    replacement: "_",
    remove: /[*+~.()'"!:@]/g,
    lower: true,
  });
};
